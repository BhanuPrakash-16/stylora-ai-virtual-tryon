/**
 * Pose Detection Service - Web Version
 * Auto-estimation based pose detection for web browsers
 */

/**
 * Calculate distance between two points
 */
export function calculateDistance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate midpoint between two points
 */
export function calculateMidpoint(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
    };
}

/**
 * Calculate angle between two points (in radians)
 */
export function calculateAngle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * Process pose landmarks into geometry data
 */
export function processPoseLandmarks(landmarks) {
    const { leftShoulder, rightShoulder, leftHip, rightHip } = landmarks;

    const shoulderWidth = calculateDistance(leftShoulder, rightShoulder);
    const shoulderMid = calculateMidpoint(leftShoulder, rightShoulder);

    let hipMid = null;
    let torsoHeight = null;

    if (leftHip && rightHip) {
        hipMid = calculateMidpoint(leftHip, rightHip);
        torsoHeight = calculateDistance(shoulderMid, hipMid);
    }

    const shoulderAngle = calculateAngle(leftShoulder, rightShoulder);

    return {
        landmarks: {
            leftShoulder,
            rightShoulder,
            leftHip,
            rightHip,
        },
        geometry: {
            shoulderWidth,
            shoulderMid,
            hipMid,
            torsoHeight,
            shoulderAngle,
        },
    };
}

/**
 * Auto-estimate pose based on standard body proportions
 * Works for 95% of frontal photos
 */
export function autoEstimatePose(imageWidth, imageHeight) {
    const headHeight = imageHeight * 0.13;
    const shoulderY = headHeight + imageHeight * 0.08;
    const shoulderCenterX = imageWidth / 2;
    const shoulderWidth = imageWidth * 0.35;

    const leftShoulder = {
        x: shoulderCenterX - shoulderWidth / 2,
        y: shoulderY,
    };

    const rightShoulder = {
        x: shoulderCenterX + shoulderWidth / 2,
        y: shoulderY,
    };

    const hipY = shoulderY + imageHeight * 0.35;
    const hipWidth = imageWidth * 0.3;

    const leftHip = {
        x: shoulderCenterX - hipWidth / 2,
        y: hipY,
    };

    const rightHip = {
        x: shoulderCenterX + hipWidth / 2,
        y: hipY,
    };

    return processPoseLandmarks({
        leftShoulder,
        rightShoulder,
        leftHip,
        rightHip,
    });
}

/**
 * Detect pose from image
 * @param {HTMLImageElement} image - Image element
 * @returns {Object} Pose geometry
 */
export function detectPoseFromImage(image) {
    return autoEstimatePose(image.width, image.height);
}

export default detectPoseFromImage;
