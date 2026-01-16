"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, X, MessageCircle, ChevronDown } from "lucide-react";
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
    const savedMessages = localStorage.getItem("chatbot_history");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(
          parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
      } catch {
        initMessage();
      }
    } else {
      initMessage();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatbot_history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const initMessage = () => {
    setMessages([
      {
        id: "init",
        text: "Xin chào! Tôi là MẢNH, trợ lý AI của bạn. Tôi sẵn sàng giúp bạn khám phá các sản phẩm và trả lời những câu hỏi của bạn 🌿",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

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
      const res = await fetch("/api/qdrant-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "search-and-generate",
          query: userMessage.text,
          limit: 3,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.answer || "Xin lỗi, tôi chưa có câu trả lời phù hợp.",
          sender: "bot",
          timestamp: new Date(),
          sources: data.sources?.map((s: any) => ({
            text: s.payload?.text || "",
            category: s.payload?.category,
            score: s.score,
          })),
          error: data.success ? undefined : data.error,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Không thể kết nối tới máy chủ.",
          sender: "bot",
          timestamp: new Date(),
          error: err.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-healing-brown text-white rounded-full p-4 shadow-xl hover:bg-energy-gold hover:text-healing-brown transition-all duration-300 z-40 flex items-center justify-center hover:scale-110 group"
          title="Trợ lý MẢNH"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-energy-gold rounded-full animate-pulse"></span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-full max-w-sm sm:max-w-md z-50">
          <Card className="shadow-2xl flex flex-col h-[600px] bg-gradient-to-b from-accent-cream to-background border border-accent-pink/30 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-healing-brown via-energy-gold to-healing-brown text-white p-5 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg">MẢNH</h3>
                    <p className="text-xs opacity-90">Trợ lý thông minh</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    localStorage.removeItem("chatbot_history");
                    initMessage();
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                  title="Làm mới"
                >
                  🔄
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-5 bg-gradient-to-b from-accent-cream/50 to-background/50">
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="space-y-2">
                    <div
                      className={`flex ${
                        m.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          m.sender === "user"
                            ? "bg-healing-brown text-white rounded-br-none shadow-md"
                            : m.error
                            ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-none"
                            : "bg-accent-pink/60 text-healing-brown rounded-bl-none shadow-sm"
                        }`}
                      >
                        {m.text}
                        <div className="text-xs opacity-70 mt-1">
                          {m.timestamp.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>

                    {m.sources && m.sources.length > 0 && (
                      <details className="ml-2 text-xs text-healing-brown/70">
                        <summary className="cursor-pointer font-medium hover:text-healing-brown transition">
                          📚 Nguồn tham khảo ({m.sources.length})
                        </summary>
                        <div className="ml-4 mt-2 space-y-1 bg-white/40 p-2 rounded-lg mt-2">
                          {m.sources.map((s, i) => (
                            <p key={i} className="text-xs">
                              • {s.category} ({Math.round((s.score || 0) * 100)}%)
                            </p>
                          ))}
                        </div>
                      </details>
                    )}

                    {m.error && (
                      <Alert variant="destructive" className="mt-2 text-xs">
                        <AlertDescription>{m.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-accent-pink/60 px-4 py-3 rounded-2xl rounded-bl-none w-fit">
                      <Loader2 className="animate-spin w-4 h-4 text-healing-brown" />
                    </div>
                  </div>
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-accent-pink/20 bg-white/50 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về sản phẩm..."
                onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
                disabled={loading}
                className="border-healing-brown/20 focus:border-healing-brown focus:ring-healing-brown rounded-full"
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="bg-healing-brown hover:bg-energy-gold text-white rounded-full w-10 h-10 p-0 flex items-center justify-center transition-all"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
