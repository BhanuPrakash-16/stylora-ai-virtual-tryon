/**
 * ADVANCED VTON PIPELINE (Client-Side)
 * 
 * Pipeline Implementation:
 * 1. Dense Human Pose: Approximated via MediaPipe Pose Landmarks.
 * 2. Garment Region Decomposition: Splitting shirt into Torso and Sleeves (Grid Mesh).
 * 3. UV-space Fabric Mapping: Simulated via Barycentric Texture Mapping (Canvas Affine Transforms).
 * 4. Non-rigid Warping: Deforming the mesh grid to match user body contours.
 * 5. Lighting & Wrinkle Preservation: Luminance multiply blend mode.
 */

// Helper: Load Script dynamically
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const script = document.createElement('script');
        script.src = src; script.crossorigin = "anonymous";
        script.onload = resolve; script.onerror = reject;
        document.head.appendChild(script);
    });
};

// Helper: Load Image
const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
});

// --- MATH HELPERS FOR WARPING ---

function getTriangleTransform(x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2) {
    // Computes affine transform needed to map source triangle (u,v) to dest (x,y)
    const det = (u0 - u2) * (v1 - v2) - (u1 - u2) * (v0 - v2);
    if (det === 0) return null;

    const m11 = ((x0 - x2) * (v1 - v2) - (x1 - x2) * (v0 - v2)) / det;
    const m12_fix = ((u0 - u2) * (x1 - x2) - (u1 - u2) * (x0 - x2)) / det; // Correct m12
    const m21 = ((y0 - y2) * (v1 - v2) - (y1 - y2) * (v0 - v2)) / det;
    const m22 = ((u0 - u2) * (y1 - y2) - (u1 - u2) * (y0 - y2)) / det;
    const dx = x0 - m11 * u0 - m12_fix * v0;
    const dy = y0 - m21 * u0 - m22 * v0;

    return { m11, m12: m12_fix, m21, m22, dx, dy };
}

// Draw a warped triangle
function drawWarpedTriangle(ctx, img, sSafeArea, dSafeArea) {
    // s = source {x,y}, d = dest {x,y}
    const [s0, s1, s2] = sSafeArea;
    const [d0, d1, d2] = dSafeArea;

    // Calc transform
    // We solve: [x,y,1] = [u,v,1] * Matrix
    // Actually standard canvas setTransform is: x' = x*m11 + y*m21 + dx

    // Simple Solve:
    // Solve for T that maps s0->d0, s1->d1, s2->d2
    const denom = (s0.x - s2.x) * (s1.y - s2.y) - (s1.x - s2.x) * (s0.y - s2.y);
    if (Math.abs(denom) < 0.001) return;

    const m11 = ((d0.x - d2.x) * (s1.y - s2.y) - (d1.x - d2.x) * (s0.y - s2.y)) / denom;
    const m12 = ((d1.x - d2.x) * (s0.x - s2.x) - (d0.x - d2.x) * (s1.x - s2.x)) / denom;
    const m21 = ((d0.y - d2.y) * (s1.y - s2.y) - (d1.y - d2.y) * (s0.y - s2.y)) / denom;
    const m22 = ((d1.y - d2.y) * (s0.x - s2.x) - (d0.y - d2.y) * (s1.x - s2.x)) / denom;
    const dx = d0.x - m11 * s0.x - m12 * s0.y;
    const dy = d0.y - m21 * s0.x - m22 * s0.y;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(d0.x, d0.y);
    ctx.lineTo(d1.x, d1.y);
    ctx.lineTo(d2.x, d2.y);
    ctx.closePath();
    ctx.clip(); // Clip to the DESTINATION triangle shape

    ctx.transform(m11, m21, m12, m22, dx, dy);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
}



// --- MAIN PIPELINE ---

export async function betterTryOn(personURL, shirtURL) {
    // 1. Load Resources
    const person = await loadImage(personURL);
    let shirt = await loadImage(shirtURL);

    // Load Pose Model
    if (!window.Pose) {
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js');
    }

    // 2. Detect Person Pose (The "Dense Map" Approximation)
    const landmarks = await new Promise((resolve) => {
        if (!window.Pose) { resolve(null); return; }
        const pose = new window.Pose({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}` });
        pose.setOptions({ modelComplexity: 1, smoothLandmarks: true });
        pose.onResults(r => resolve(r.poseLandmarks));
        pose.send({ image: person });
    });

    // 3. Setup Logic
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d');
    cv.width = person.width;
    cv.height = person.height;
    ctx.drawImage(person, 0, 0);

    if (!landmarks) {
        throw new Error("No human detected. Cannot perform non-rigid warping.");
    }

    // --- MESH DEFINITION ---

    // Key Body Points (Normalized 0-1)
    const L_SHO = landmarks[11];
    const R_SHO = landmarks[12];
    const L_HIP = landmarks[23];
    const R_HIP = landmarks[24];
    const NOSE = landmarks[0];

    // Convert to Pixel Coords
    const toPx = (lm) => ({ x: lm.x * cv.width, y: lm.y * cv.height });

    const pLS = toPx(L_SHO);
    const pRS = toPx(R_SHO);
    const pLH = toPx(L_HIP);
    const pRH = toPx(R_HIP);
    const pNose = toPx(NOSE);

    // "Garment Region Decomposition":
    // We define a 3x3 Mesh Grid for the Shirt

    // SOURCE MESH (The flat shirt)
    // Shirt Layout:
    // [0] [1] [2]   (Collar/Shoulders)
    // [3] [4] [5]   (Chest/Mid)
    // [6] [7] [8]   (Hem/Waist)
    const sw = shirt.width;
    const sh = shirt.height;

    const srcPoints = [
        { x: 0, y: 0 }, { x: sw / 2, y: 0 }, { x: sw, y: 0 },        // Top Row
        { x: 0, y: sh / 2 }, { x: sw / 2, y: sh / 2 }, { x: sw, y: sh / 2 },     // Mid Row
        { x: 0, y: sh }, { x: sw / 2, y: sh }, { x: sw, y: sh }        // Bot Row
    ];

    // DESTINATION MESH (The body)
    // "Non-rigid Warping": Map source points to dynamic body points

    const neckBase = { x: (pLS.x + pRS.x) / 2, y: (pLS.y + pRS.y) / 2 };
    // Collar offset slightly up
    const neckTop = { x: neckBase.x, y: neckBase.y - (pLH.y - pLS.y) * 0.15 };

    // Dest Points
    const dstPoints = [];

    // Top Row (Shoulders)
    // 0: Right Shoulder (Mirror: Image Left is Person Right if facing cam?)
    // Standard TryOn: Left of Shirt Image goes to Left Shoulder of Person (Visual Left)
    // Visual Left Shoulder = pLS
    // Wait, MediaPipe 11 is LEFT shoulder (person's left, so Visual RIGHT).

    // Let's assume standard frontal view:
    // Visual Left (Image x=0) -> R_SHO (12)
    // Visual Right (Image x=w) -> L_SHO (11)

    // Actually, usually:
    // Person's Right Shoulder (Landmark 12) is on the Left Side of the screen.
    // Person's Left Shoulder (Landmark 11) is on the Right Side of the screen.

    // Top Row
    // [0-LeftImg] -> R_SHO (12) (Extend out for sleeve)
    const shoulderWidth = Math.hypot(pLS.x - pRS.x, pLS.y - pRS.y);
    const shExtend = 0.2; // Sleeve overhang

    dstPoints[0] = { x: pRS.x - shoulderWidth * shExtend, y: pRS.y }; // Top Left
    dstPoints[1] = neckTop; // Top Mid (Neck)
    dstPoints[2] = { x: pLS.x + shoulderWidth * shExtend, y: pLS.y }; // Top Right

    // Mid Row (Chest)
    // Interpolate halfway between shoulder and hip
    const midL = { x: (pRS.x + pRH.x) / 2 - shoulderWidth * 0.1, y: (pRS.y + pRH.y) / 2 };
    const midR = { x: (pLS.x + pLH.x) / 2 + shoulderWidth * 0.1, y: (pLS.y + pLH.y) / 2 };
    const midC = { x: (neckBase.x + (pLH.x + pRH.x) / 2) / 2, y: midL.y }; // Center

    dstPoints[3] = midL;
    dstPoints[4] = midC;
    dstPoints[5] = midR;

    // Bot Row (Hips/Hem)
    const hipW = Math.hypot(pLH.x - pRH.x, pLH.y - pRH.y);
    dstPoints[6] = { x: pRH.x - hipW * 0.1, y: pRH.y }; // Bot Left
    dstPoints[7] = { x: (pLH.x + pRH.x) / 2, y: (pLH.y + pRH.y) / 2 + hipW * 0.2 }; // Bot Mid (Hem curve)
    dstPoints[8] = { x: pLH.x + hipW * 0.1, y: pLH.y }; // Bot Right


    // --- WARPING & RENDERING ---
    // Triangulate the 3x3 grid (4 squares, 2 triangles each = 8 triangles)
    // Indices:
    // 0 1 2
    // 3 4 5
    // 6 7 8

    const indices = [
        [0, 1, 3], [1, 4, 3], // Top-Left Quad
        [1, 2, 4], [2, 5, 4], // Top-Right Quad
        [3, 4, 6], [4, 7, 6], // Bot-Left Quad
        [4, 5, 7], [5, 8, 7]  // Bot-Right Quad
    ];

    // Create Warp Canvas (Transparency Layer)
    const warpCv = document.createElement('canvas');
    const wCtx = warpCv.getContext('2d');
    warpCv.width = cv.width;
    warpCv.height = cv.height;

    // Draw triangles
    for (let tri of indices) {
        const p0 = tri[0], p1 = tri[1], p2 = tri[2];
        drawWarpedTriangle(wCtx, shirt,
            [srcPoints[p0], srcPoints[p1], srcPoints[p2]],
            [dstPoints[p0], dstPoints[p1], dstPoints[p2]]
        );
    }

    // --- LIGHTING PRESERVATION ---
    // Extract Luminance from Body
    const lightCv = document.createElement('canvas');
    const lCtx = lightCv.getContext('2d');
    lightCv.width = cv.width;
    lightCv.height = cv.height;

    // Draw full person grayscale
    lCtx.drawImage(person, 0, 0);
    const lId = lCtx.getImageData(0, 0, cv.width, cv.height);
    const d = lId.data;
    for (let i = 0; i < d.length; i += 4) {
        // High-pass contrast for folds
        const g = d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11;
        const v = Math.min(255, Math.max(0, (g - 128) * 1.3 + 128 + 20));
        d[i] = v; d[i + 1] = v; d[i + 2] = v;
    }
    lCtx.putImageData(lId, 0, 0);

    // Composite
    const compCtx = cv.getContext('2d');

    // 1. Draw Warped Shirt
    compCtx.drawImage(warpCv, 0, 0);

    // 2. Multiply Lighting (Shadows/Wrinkles)
    const tempCv = document.createElement('canvas');
    tempCv.width = cv.width; tempCv.height = cv.height;
    const tCtx = tempCv.getContext('2d');

    tCtx.drawImage(warpCv, 0, 0); // Base shirt shape
    tCtx.globalCompositeOperation = 'source-in'; // Mask lighting to shirt
    tCtx.drawImage(lightCv, 0, 0);

    compCtx.globalCompositeOperation = 'multiply';
    compCtx.drawImage(tempCv, 0, 0);

    // 3. Restore Normal (Cleanup)
    compCtx.globalCompositeOperation = 'source-over';

    return cv.toDataURL('image/png');
}

export default betterTryOn;
