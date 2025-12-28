/**
 * Pose Smoothing - Remove jitter and unnatural angles
 */

export function smoothPoint(p, neighbors, weight = 0.6) {
    if (!p || !neighbors || neighbors.length === 0) return p;

    let sx = p.x;
    let sy = p.y;

    neighbors.forEach(n => {
        if (n && n.x !== undefined && n.y !== undefined) {
            sx += n.x * weight;
            sy += n.y * weight;
        }
    });

    return {
        x: sx / (neighbors.length * weight + 1),
        y: sy / (neighbors.length * weight + 1)
    };
}

export function smoothPose(landmarks) {
    const smoothed = { ...landmarks };

    // Smooth shoulders using elbows as influence
    if (landmarks.leftShoulder && landmarks.leftElbow) {
        smoothed.leftShoulder = smoothPoint(
            landmarks.leftShoulder,
            [landmarks.leftElbow],
            0.3
        );
    }

    if (landmarks.rightShoulder && landmarks.rightElbow) {
        smoothed.rightShoulder = smoothPoint(
            landmarks.rightShoulder,
            [landmarks.rightElbow],
            0.3
        );
    }

    // Smooth elbows using shoulders and wrists
    if (landmarks.leftElbow) {
        const neighbors = [];
        if (landmarks.leftShoulder) neighbors.push(landmarks.leftShoulder);
        if (landmarks.leftWrist) neighbors.push(landmarks.leftWrist);
        smoothed.leftElbow = smoothPoint(landmarks.leftElbow, neighbors, 0.4);
    }

    if (landmarks.rightElbow) {
        const neighbors = [];
        if (landmarks.rightShoulder) neighbors.push(landmarks.rightShoulder);
        if (landmarks.rightWrist) neighbors.push(landmarks.rightWrist);
        smoothed.rightElbow = smoothPoint(landmarks.rightElbow, neighbors, 0.4);
    }

    return smoothed;
}
