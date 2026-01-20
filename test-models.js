import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyAHC-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';
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const models = await genAI.listModels();
        console.log('Available models:');
        models.forEach(model => {
            console.log(`- ${model.name} (supports: ${model.supportedGenerationMethods?.join(', ')})`);
        });
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
