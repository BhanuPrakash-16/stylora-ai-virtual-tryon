/**
 * Stress-Based Wrinkle Shading
 */

export function applyStressWrinkles(
    ctx,
    x,
    y,
    w,
    h,
    stress = 0.4,
    stiffness = 0.5
) {
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';

    // Adjust wrinkle intensity based on fabric stiffness
    const effectiveStress = stress * (1 - stiffness * 0.5);
    ctx.globalAlpha = effectiveStress * 0.25;

    // Number of wrinkles based on stress
    const wrinkleCount = Math.floor(18 * effectiveStress);

    for (let i = 0; i < wrinkleCount; i++) {
        const px = x + Math.random() * w;
        const py = y + Math.random() * h;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(
            px + (Math.random() * 10 - 5),
            py + (Math.random() * 6)
        );
        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.lineWidth = Math.random() * 1.2;
        ctx.stroke();
    }

    ctx.restore();
}

/**
 * Apply wrinkles at high-stress areas
 */
export function applyWrinklesAtJoints(ctx, landmarks, stiffness = 0.5) {
    // Elbow wrinkles
    if (landmarks.leftElbow) {
        applyStressWrinkles(
            ctx,
            landmarks.leftElbow.x - 20,
            landmarks.leftElbow.y - 15,
            40,
            30,
            0.6,
            stiffness
        );
    }

    if (landmarks.rightElbow) {
        applyStressWrinkles(
            ctx,
            landmarks.rightElbow.x - 20,
            landmarks.rightElbow.y - 15,
            40,
            30,
            0.6,
            stiffness
        );
    }

    // Shoulder-armpit stress
    if (landmarks.leftShoulder) {
        applyStressWrinkles(
            ctx,
            landmarks.leftShoulder.x - 15,
            landmarks.leftShoulder.y + 10,
            30,
            40,
            0.4,
            stiffness
        );
    }

    if (landmarks.rightShoulder) {
        applyStressWrinkles(
            ctx,
            landmarks.rightShoulder.x - 15,
            landmarks.rightShoulder.y + 10,
            30,
            40,
            0.4,
            stiffness
        );
    }
}
