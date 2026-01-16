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
        text: "Xin chào! Tôi là MẢNH, trợ lý AI của bạn. Hãy hỏi bất cứ điều gì bạn muốn 😊",
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
          className="fixed bottom-6 right-6 bg-healing-brown text-white rounded-full p-4 shadow-lg hover:bg-energy-gold hover:text-healing-brown transition z-40"
        >
          💬
        </button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl flex flex-col z-50 bg-accent-cream">
          {/* Header */}
          <div className="bg-gradient-to-r from-healing-brown to-energy-gold text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-lg">MẢNH</h3>
              <p className="text-xs text-accent-cream">Trợ lý thông minh</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem("chatbot_history");
                  initMessage();
                }}
              >
                🔄
              </button>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id}>
                  <div
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                        m.sender === "user"
                          ? "bg-healing-brown text-white rounded-br-none"
                          : m.error
                          ? "bg-red-100 text-red-800 border"
                          : "bg-accent-pink text-healing-brown rounded-bl-none"
                      }`}
                    >
                      {m.text}
                      <div className="text-xs opacity-60 mt-1">
                        {m.timestamp.toLocaleTimeString("vi-VN")}
                      </div>
                    </div>
                  </div>

                  {m.sources && (
                    <details className="ml-2 mt-1 text-xs text-healing-brown">
                      <summary className="cursor-pointer">
                        📚 Nguồn ({m.sources.length})
                      </summary>
                      <div className="ml-4 mt-1 space-y-1">
                        {m.sources.map((s, i) => (
                          <p key={i}>
                            • {s.category} ({Math.round((s.score || 0) * 100)}%)
                          </p>
                        ))}
                      </div>
                    </details>
                  )}

                  {m.error && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{m.error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}

              {loading && (
                <div className="bg-accent-pink px-4 py-2 rounded-lg w-fit">
                  <Loader2 className="animate-spin w-4 h-4" />
                </div>
              )}

              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
