/**
 * Service to interact with Hugging Face IDM-VTON Space
 * Features:
 * - Uses the state-of-the-art IDM-VTON model
 * - Serverless (runs on Hugging Face GPU)
 * - Free (Community Tier)
 * - Zero Dependencies (Uses native fetch)
 */

// Helper to convert Blob to Base64 Data URL
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

// Helper to separate sleep
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const generateTryOn = async (personBlob, garmentBlob) => {
    const MAX_RETRIES = 3;
    let attempt = 0;

    // 1. Convert Blobs to Base64 (Once)
    console.log("Preparing images for Cloud AI...");
    const personB64 = await blobToBase64(personBlob);
    const garmentB64 = await blobToBase64(garmentBlob);

    while (attempt < MAX_RETRIES) {
        try {
            attempt++;
            console.log(`Connecting to IDM-VTON (Attempt ${attempt}/${MAX_RETRIES})...`);

            const response = await fetch("https://yisol-idm-vton.hf.space/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: [
                        { "background": personB64, "layers": [], "composite": null },
                        garmentB64,
                        "High quality realistic try on",
                        true,
                        true,
                        30,
                        42
                    ]
                })
            });

            // If 503 (Busy) or 504 (Timeout), throw to trigger retry
            if (response.status === 503 || response.status === 504) {
                throw new Error(`Server Busy (Status ${response.status})`);
            }

            if (!response.ok) {
                throw new Error(`API Error (Status ${response.status})`);
            }

            const json = await response.json();

            if (json.data && json.data[0]) {
                console.log("Generation Success!");
                return json.data[0].url || json.data[0];
            } else {
                throw new Error("Invalid response format from AI server.");
            }

        } catch (error) {
            console.warn(`Attempt ${attempt} failed: ${error.message}`);

            if (attempt >= MAX_RETRIES) {
                console.error("All retries exhausted.");
                // Provide actionable feedback
                if (error.message.includes("Busy")) {
                    throw new Error("Free Cloud Servers are currently full. Please wait 1 minute or try again.");
                }
                throw error;
            }

            // Wait 2 seconds before retrying
            await sleep(2000);
        }
    }
};
