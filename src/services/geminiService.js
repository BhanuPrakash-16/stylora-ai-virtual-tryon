/**
 * Gemini AI Service - Garment Analysis
 * FIXED: correct model, safe API usage, stable behavior
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ NEVER hardcode keys
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn('⚠️ Gemini API key missing. Gemini features disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Analyze garment image with Gemini AI
 */
export async function analyzeGarment(imageInput) {
    // ✅ Graceful fallback if Gemini unavailable
    if (!genAI) {
        return fallbackGarmentAnalysis();
    }

    try {
        // ✅ CORRECT model path
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        });

        // Convert image to base64 if needed
        let imageData;
        if (imageInput instanceof File) {
            imageData = await fileToBase64(imageInput);
        } else {
            imageData = imageInput;
        }

        if (!imageData) {
            throw new Error('Invalid image input');
        }

        const base64Data = imageData.replace(
            /^data:image\/\w+;base64,/,
            ''
        );

        const prompt = `
Analyze this garment image and return ONLY valid JSON:

{
  "type": "",
  "color": "",
  "pattern": "",
  "style": "",
  "fit": "",
  "material": "",
  "occasion": [],
  "season": [],
  "sustainability_score": 1-10,
  "styling_tips": []
}
`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Data
                }
            }
        ]);

        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error('Gemini returned non-JSON output');
        }

        return {
            success: true,
            data: JSON.parse(jsonMatch[0])
        };

    } catch (error) {
        console.error('❌ Gemini AI Error:', error);
        return fallbackGarmentAnalysis(error.message);
    }
}

/**
 * Styling recommendations
 */
export async function getStylingRecommendations(analysis) {
    if (!genAI) {
        return { success: false, error: 'Gemini disabled' };
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        });

        const prompt = `
Based on this garment analysis:
${JSON.stringify(analysis, null, 2)}

Return ONLY valid JSON:
{
  "color_combinations": [],
  "outfit_ideas": [],
  "accessories": [],
  "dos_and_donts": { "dos": [], "donts": [] }
}
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) throw new Error('Invalid JSON');

        return {
            success: true,
            data: JSON.parse(jsonMatch[0])
        };

    } catch (error) {
        console.error('❌ Styling Error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Helpers
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function fallbackGarmentAnalysis(reason = 'Gemini unavailable') {
    return {
        success: false,
        error: reason,
        data: {
            type: 'garment',
            color: 'unknown',
            pattern: 'unknown',
            style: 'casual',
            fit: 'regular',
            material: 'unknown',
            occasion: ['casual wear'],
            season: ['all seasons'],
            sustainability_score: 5,
            styling_tips: [
                'Pair with neutral colors',
                'Style based on occasion',
                'Choose matching footwear'
            ]
        }
    };
}

export default analyzeGarment;
