import OpenAI from 'openai';

// Initialize OpenAI
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
    console.error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file');
}

const openai = new OpenAI({
    apiKey: apiKey || '',
    dangerouslyAllowBrowser: true // Note: For production, move API calls to backend
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

export async function sendMessage(userMessage: string, conversationHistory: Message[] = []): Promise<string> {
    try {
        if (!apiKey) {
            throw new Error('API key not configured');
        }

        // Build conversation history for OpenAI
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: SYSTEM_CONTEXT
            },
            ...conversationHistory.map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content
            })),
            {
                role: 'user',
                content: userMessage
            }
        ];

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.9,
            max_tokens: 500,
        });

        const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        return response;

    } catch (error) {
        console.error('Error sending message to OpenAI:', error);

        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                throw new Error('API configuration error. Please check your API key.');
            }
            if (error.message.includes('401')) {
                throw new Error('Invalid API key. Please check your OpenAI API key.');
            }
            if (error.message.includes('429')) {
                throw new Error('Rate limit exceeded. Please try again in a moment.');
            }
            throw new Error(`Failed to get response: ${error.message}`);
        }

        throw new Error('Failed to get response from AI. Please try again.');
    }
}

// Reset chat session (kept for compatibility)
export function resetChat() {
    // No-op with stateless approach
}
