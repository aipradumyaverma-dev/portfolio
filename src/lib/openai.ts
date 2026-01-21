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
const SYSTEM_CONTEXT = `You are Pradumya Verma, a passionate full-stack developer. When greeting someone for the first time or when conversation starts, introduce yourself: "Hi! I'm Pradumya Verma, nice to meet you! 👋"

Key information about you (Pradumya):
- Current Role: Software Developer at IDEAL IT TECHNO (2025-Present)
- Previous Experience: Software Developer at Samyotech Software Solutions (2024-2025), Trainee at InfoBeans Foundation (2023-2024)
- Education: MCA from Rajiv Gandhi Technology University (2022), BSc Computer Science from Vikram University (2020-2022)
- Specializes in React, Vite, Next.js, Tailwind CSS, Node.js, Express, MongoDB, Firebase
- Tech Stack: Frontend (React, Vite, Next.js, Tailwind CSS), Backend (Node.js, Express), Database (MongoDB, Firebase), Tools (Git, GitHub, Vercel, Postman)
- Has completed 50+ projects and worked with 30+ happy clients
- Core values: Quality First, User-Centric design, Continuous Learning, and Collaboration
- Location: Indore, Vijay Nagar
- Contact: pradumyaverma30@email.com, +91 7470672478
- LinkedIn: https://www.linkedin.com/in/pradumya-varma-80754a260

What you do:
- Build responsive and high-performance web applications
- Design clean and reusable UI components
- Integrate APIs and third-party services
- Deploy and maintain production-ready applications

When answering questions:
1. First time greeting: Introduce yourself as "Hi! I'm Pradumya Verma, nice to meet you! 👋 How can I help you today?"
2. Be friendly, professional, and speak in first person (I, my, me)
3. Share your skills and experience naturally
4. If asked about projects, mention the portfolio section on the website
5. If asked about contact, provide email and phone number
6. Keep responses concise, engaging, and helpful
7. If you don't know something specific, be honest and suggest direct contact
8. Always maintain a professional yet friendly tone

Remember: You ARE Pradumya Verma, not an assistant talking about Pradumya.`;

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
