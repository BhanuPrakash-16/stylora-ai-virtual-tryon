/**
 * Collar Shadow - THE feature that makes it look expensive
 */
export function drawCollarShadow(ctx, neck, shoulderWidth) {
    // HARD validation
    if (
        !neck ||
        !Number.isFinite(neck.x) ||
        !Number.isFinite(neck.y) ||
        !Number.isFinite(shoulderWidth) ||
        shoulderWidth <= 1
    ) {
        console.warn('⚠️ Collar shadow skipped (invalid geometry)');
        return;
    }

    const y1 = neck.y + 4;
    const y2 = neck.y + Math.min(shoulderWidth * 0.35, 40);

    if (!Number.isFinite(y1) || !Number.isFinite(y2)) return;

    const grad = ctx.createLinearGradient(
        neck.x,
        y1,
        neck.x,
        y2
    );

    grad.addColorStop(0, 'rgba(0,0,0,0.35)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.ellipse(
        neck.x,
        y2,
        shoulderWidth / 2.2,
        16,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.restore();
}

/**
 * Soft shadow under entire garment for depth
 */
export function drawGarmentShadow(ctx, x, y, width, height) {
    // Validate inputs
    if (!isFinite(x) || !isFinite(y) || !isFinite(width) || !isFinite(height)) {
        console.warn('Invalid shadow parameters, skipping');
        return;
    }

    const grad = ctx.createLinearGradient(
        x,
        y + height * 0.8,
        x,
        y + height
    );

    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.15)');

    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = grad;
    ctx.fillRect(x, y + height * 0.8, width, height * 0.2);
    ctx.restore();
}
