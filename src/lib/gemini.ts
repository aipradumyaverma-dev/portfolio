import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

// Get the Gemini model
const model = genAI.getGenerativeModel({
    model: 'gemini-pro',
    generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    },
});

// System context about Pradumya
const SYSTEM_CONTEXT = `You are an AI assistant for Pradumya Verma's portfolio website. 
Pradumya is a passionate full-stack developer with expertise in modern web technologies.

Key information about Pradumya:
- Full-stack developer with 3+ years of experience
- Specializes in React, Node.js, TypeScript, and modern web technologies
- Has completed 50+ projects and worked with 30+ happy clients
- Focuses on creating scalable, user-centric applications
- Core values: Quality First, User-Centric design, Continuous Learning, and Collaboration
- Skills include: Frontend (React, TypeScript, Next.js), Backend (Node.js, Express), Mobile (React Native), Cloud & DevOps, and various tools
- Located in Indore
- Email: pradumyaverma30@email.com
- Phone: +91 7470672478

When answering questions:
1. Be friendly, professional, and helpful
2. If asked about Pradumya's skills or experience, refer to the information above
3. If asked about projects, mention that visitors can see the portfolio section
4. If asked about contact, provide the email and phone number
5. Keep responses concise and engaging
6. If you don't know something specific, be honest and suggest contacting Pradumya directly

Always maintain a professional yet friendly tone that reflects Pradumya's personality as a passionate developer.`;

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Chat session
let chat: any = null;

export async function sendMessage(userMessage: string, conversationHistory: Message[] = []): Promise<string> {
    try {
        if (!apiKey) {
            throw new Error('API key not configured');
        }

        // Start a new chat session if it doesn't exist
        if (!chat) {
            chat = model.startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: SYSTEM_CONTEXT }],
                    },
                    {
                        role: 'model',
                        parts: [{ text: 'I understand. I will act as an AI assistant for Pradumya Verma\'s portfolio, providing helpful and accurate information about his skills, experience, and projects while maintaining a professional yet friendly tone.' }],
                    },
                ],
            });
        }

        // Send the user's message
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Error sending message to Gemini:', error);

        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                throw new Error('API configuration error. Please check your API key.');
            }
            throw new Error(`Failed to get response: ${error.message}`);
        }

        throw new Error('Failed to get response from AI. Please try again.');
    }
}

// Reset chat session
export function resetChat() {
    chat = null;
}
