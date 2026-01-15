"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  sources?: Array<{
    text: string;
    category?: string;
    score?: number;
  }>;
  error?: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages from localStorage on mount
    const savedMessages = localStorage.getItem("chatbot_history");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error("Failed to load chat history:", error);
        // If loading fails, start with a fresh welcome message
        setMessages([
          {
            id: "init",
            text: "Welcome to Ecolia! How can I help you today? Feel free to ask about our sustainable products.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } else {
      // For new users, set the initial welcome message
      setMessages([
        {
          id: "init",
          text: "Welcome to Ecolia! How can I help you today? Feel free to ask about our sustainable products.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatbot_history", JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/qdrant-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "search-and-generate",
          query: input,
          limit: 3,
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer || "Sorry, I couldn't find an answer to that.",
        sender: "bot",
        timestamp: new Date(),
        sources: data.sources?.map((s: any) => ({
          text: s.payload?.text || "No text available",
          category: s.payload?.category || "general",
          score: s.score,
        })),
        error: data.success ? undefined : data.error || "Unknown error",
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Chat API error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Failed to connect to the assistant. Please check your network.",
        sender: "bot",
        timestamp: new Date(),
        error: error instanceof Error ? error.message : "Connection error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    const initialMessage = {
      id: "init-reset",
      text: "Welcome to Ecolia! How can I help you today? Feel free to ask about our sustainable products.",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    localStorage.setItem("chatbot_history", JSON.stringify([initialMessage]));
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 transition-transform duration-200 hover:scale-110 z-40"
          aria-label="Open chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-[380px] h-[calc(100vh-100px)] max-h-[600px] shadow-2xl flex flex-col z-50 bg-gray-50 rounded-lg">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Ecolia Assistant</h3>
              <p className="text-xs text-green-100 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={resetChat} className="hover:bg-green-700 p-1 rounded-full transition" title="Reset chat">
                🔄
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded-full transition" aria-label="Close chat">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-5 pr-2">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex items-end gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-md px-4 py-2.5 rounded-2xl ${message.sender === "user" ? "bg-emerald-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none border"}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <span className="text-xs opacity-60 mt-1.5 block text-right">{message.timestamp.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {message.sources && message.sources.length > 0 && (
                    <div className="flex justify-start pl-3 pt-1">
                      <details className="text-xs text-gray-500 cursor-pointer group">
                        <summary className="group-hover:text-gray-800 font-medium flex items-center gap-1">
                          📚 Sources ({message.sources.length})
                        </summary>
                        <div className="mt-2 space-y-2 ml-4 py-2 px-3 bg-gray-100 rounded-md text-gray-700 max-w-xs border">
                          {message.sources.map((source, idx) => (
                            <div key={idx} className="border-l-2 border-emerald-400 pl-2">
                              <p className="text-xs font-semibold text-emerald-800">{source.category || "Source"}</p>
                              <p className="text-xs line-clamp-3 mt-1">{source.text}</p>
                              {source.score && <p className="text-xs text-gray-500 mt-1 font-mono">Relevance: {(source.score * 100).toFixed(0)}%</p>}
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  )}

                  {message.error && (
                    <div className="flex justify-start pl-3 pt-1">
                      <Alert variant="destructive" className="max-w-md bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs text-red-800">{message.error}</AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2 border">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-3 bg-white rounded-b-lg">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
              <Input
                placeholder="Ask about our products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-gray-100 border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Button type="submit" disabled={loading || !input.trim()} className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300" size="icon" aria-label="Send message">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
}
