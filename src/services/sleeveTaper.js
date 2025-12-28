/**
 * Advanced Sleeve Tapering - Sleeves narrow toward wrist
 */

export function drawTaperedSleeve(
    ctx,
    img,
    x,
    y,
    baseWidth,
    height,
    taperRatio = 0.65,
    bendFactor = 0
) {
    const segments = 24;

    ctx.save();

    for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const sliceH = height / segments;

        // Width decreases toward wrist
        const widthScale = 1 - t * (1 - taperRatio);

        // Bend follows natural arm curve
        const offsetX = Math.sin(t * Math.PI) * bendFactor * 18;

        // Draw segment
        ctx.drawImage(
            img,
            0,
            t * img.height,
            img.width,
            img.height / segments,
            x + offsetX,
            y + t * height,
            baseWidth * widthScale,
            sliceH
        );
    }

    ctx.restore();
}

/**
 * Calculate sleeve bend factor based on arm angle
 */
export function calculateSleeveBend(shoulder, elbow, wrist) {
    if (!shoulder || !elbow || !wrist) return 0;

    // Calculate angle at elbow
    const angle1 = Math.atan2(elbow.y - shoulder.y, elbow.x - shoulder.x);
    const angle2 = Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x);
    const bendAngle = Math.abs(angle2 - angle1);

    // Normalize to 0-1 range
    return Math.min(bendAngle / Math.PI, 1);
}
