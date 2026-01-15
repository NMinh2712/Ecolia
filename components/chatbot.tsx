"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, X, AlertCircle, CheckCircle2 } from "lucide-react";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý AI của Ecolia. Tôi có thể giúp bạn tìm thông tin về sản phẩm, quy trình hoặc câu hỏi khác. Hãy hỏi gì đi!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
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
      }
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
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "search-and-generate",
          query: input,
          limit: 3,
        }),
      });

      const data = await response.json();

      if (data.success && data.answer) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.answer,
          sender: "bot",
          timestamp: new Date(),
          sources: data.sources?.map((source: any) => ({
            text: source.payload?.text || "",
            category: source.payload?.category || "general",
            score: source.score,
          })),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Xin lỗi, tôi không thể xử lý câu hỏi này. Vui lòng thử lại.",
          sender: "bot",
          timestamp: new Date(),
          error: data.error || "Unknown error",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet và thử lại.",
        sender: "bot",
        timestamp: new Date(),
        error: error instanceof Error ? error.message : "Connection error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-healing-brown text-white rounded-full p-4 shadow-lg hover:bg-energy-gold hover:text-healing-brown transition z-40"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl flex flex-col z-50 bg-accent-cream">
          {/* Header */}
          <div className="bg-gradient-to-r from-healing-brown to-energy-gold text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Trợ lý Ecolia</h3>
              <p className="text-xs text-accent-cream">Trực tuyến</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: "1",
                      text: "Xin chào! Tôi là trợ lý AI của Ecolia. Tôi có thể giúp bạn tìm thông tin về sản phẩm, quy trình hoặc câu hỏi khác. Hãy hỏi gì đi!",
                      sender: "bot",
                      timestamp: new Date(),
                    },
                  ]);
                  localStorage.removeItem("chatbot_history");
                }}
                className="hover:bg-stone-gray p-1 rounded transition text-sm"
                title="Clear chat history"
              >
                🔄
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-stone-gray p-1 rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 overflow-hidden">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-healing-brown text-white rounded-br-none"
                          : message.error
                            ? "bg-red-100 text-red-900 rounded-bl-none border border-red-300"
                            : "bg-accent-pink text-healing-brown rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString("vi-VN")}
                      </span>
                    </div>
                  </div>

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="flex justify-start pl-2">
                      <details className="text-xs text-healing-brown cursor-pointer">
                        <summary className="hover:text-energy-gold font-semibold">
                          📚 Nguồn ({message.sources.length})
                        </summary>
                        <div className="mt-2 space-y-2 ml-4 p-2 bg-accent-cream rounded text-healing-brown max-w-xs">
                          {message.sources.map((source, idx) => (
                            <div key={idx} className="border-l-2 border-energy-gold pl-2">
                              <p className="text-xs font-medium text-healing-brown">
                                {source.category || "General"}
                              </p>
                              <p className="text-xs line-clamp-2 mt-1">
                                {source.text.substring(0, 100)}...
                              </p>
                              {source.score && (
                                <p className="text-xs text-stone-gray mt-1">
                                  Độ phù hợp: {(source.score * 100).toFixed(0)}%
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  )}

                  {/* Error display */}
                  {message.error && (
                    <div className="flex justify-start pl-2">
                      <Alert className="max-w-xs border-red-300 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-xs text-red-700">
                          {message.error}
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-accent-pink text-healing-brown px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-healing-brown rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-healing-brown rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-healing-brown rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-xs ml-2">Đang xử lý...</span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-accent-pink p-4 bg-accent-cream rounded-b-lg flex gap-2">
            <Input
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
              className="flex-1 bg-white text-healing-brown placeholder:text-stone-gray"
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-healing-brown hover:bg-energy-gold text-white hover:text-healing-brown"
              size="icon"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
