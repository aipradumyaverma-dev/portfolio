import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessage, resetChat, type Message } from '@/lib/openai';

interface AIChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! I'm Pradumya Verma, nice to meet you! 👋 How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chatbot opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await sendMessage(userMessage.content, messages);

            const aiMessage: Message = {
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');

            const errorMessage: Message = {
                role: 'assistant',
                content: 'I apologize, but I encountered a technical error. Please try again, or feel free to contact me directly at pradumyaverma30@email.com or +91 7470672478.',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClose = () => {
        onClose();
        // Reset chat after closing animation
        setTimeout(() => {
            setMessages([
                {
                    role: 'assistant',
                    content: 'Hi! I\'m Pradumya\'s AI assistant. I can help you learn more about his skills, experience, and projects. What would you like to know?',
                    timestamp: new Date(),
                },
            ]);
            setInput('');
            setError(null);
            resetChat();
        }, 300);
    };

    console.log("Rendering AIChatbot v2 - Fixed Position");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Chatbot Container */}
                    <motion.div
                        initial={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: 20 }}
                        transition={{ duration: 0.2 }}
                        className="glass-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-primary/20"
                        style={{
                            position: 'fixed',
                            bottom: '24px',
                            right: '24px',
                            width: '400px',
                            maxWidth: '90vw',
                            height: '600px',
                            maxHeight: '80vh',
                            zIndex: 9999,
                            margin: 0,
                        }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-full">
                                    <Bot size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">AI Assistant</h3>
                                    <p className="text-white/80 text-xs">Powered by OpenAI</p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                            }`}
                                    >
                                        {/* Avatar */}
                                        <div
                                            className={`p-2 rounded-full flex-shrink-0 ${message.role === 'user'
                                                ? 'bg-primary'
                                                : 'bg-gradient-to-br from-primary/20 to-accent/20'
                                                }`}
                                        >
                                            {message.role === 'user' ? (
                                                <User size={16} className="text-primary-foreground" />
                                            ) : (
                                                <Bot size={16} className="text-primary" />
                                            )}
                                        </div>

                                        {/* Message Bubble */}
                                        <div
                                            className={`px-4 py-2 rounded-2xl ${message.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'glass-card border border-border/50'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {message.content}
                                            </p>
                                            <p
                                                className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                                    }`}
                                            >
                                                {message.timestamp.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                                            <Bot size={16} className="text-primary" />
                                        </div>
                                        <div className="glass-card border border-border/50 px-4 py-2 rounded-2xl">
                                            <div className="flex space-x-2">
                                                <Loader2 size={16} className="animate-spin text-primary" />
                                                <span className="text-sm text-muted-foreground">Thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                                >
                                    <p className="text-sm text-red-500">{error}</p>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border/30 bg-background/80">
                            <div className="flex items-center space-x-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 bg-muted border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 bg-gradient-to-r from-primary to-accent rounded-full hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Send size={20} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
