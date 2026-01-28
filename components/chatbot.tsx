"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, X, MessageCircle, ChevronDown, GripHorizontal } from "lucide-react";
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

const QUICK_REPLIES = [
  "Giới thiệu về MẢNH",
  "Vòng tay phù hợp mệnh Hỏa?",
  "Cách đặt hàng online?",
  "AI có tạo vòng tay chính xác không?",
  "Xem bộ sưu tập sản phẩm",
  "Hỗ trợ kích thước cổ tay",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem("chatbot_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
        setShowQuickReplies(parsed.length === 0);
      } catch {
        initMessage();
      }
    } else {
      initMessage();
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem("chatbot_history", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Drag only on desktop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // No drag on mobile
    if ((e.target as HTMLElement).closest("button, input")) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - (windowRef.current?.offsetLeft || 0),
      y: e.clientY - (windowRef.current?.offsetTop || 0),
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !windowRef.current) return;
      const newLeft = e.clientX - dragOffset.x;
      const newTop = e.clientY - dragOffset.y;
      const maxX = window.innerWidth - windowRef.current.offsetWidth;
      const maxY = window.innerHeight - windowRef.current.offsetHeight;
      windowRef.current.style.left = `${Math.max(0, Math.min(newLeft, maxX))}px`;
      windowRef.current.style.top = `${Math.max(0, Math.min(newTop, maxY))}px`;
      windowRef.current.style.right = "auto";
      windowRef.current.style.bottom = "auto";
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const initMessage = () => {
    setMessages([
      {
        id: "init",
        text: "Xin chào! Tôi là MẢNH – trợ lý AI của bạn. Tôi sẵn sàng giúp bạn khám phá sản phẩm, năng lượng vòng tay và trả lời mọi thắc mắc 🌿 Bạn muốn bắt đầu từ đâu?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setShowQuickReplies(true);
  };

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setShowQuickReplies(false); // Hide quick replies after first message

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/qdrant-gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "search-and-generate",
          query: text,
          limit: 3,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.answer || "Xin lỗi, tôi chưa tìm thấy câu trả lời phù hợp.",
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
          text: "Không thể kết nối tới máy chủ. Vui lòng thử lại sau.",
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
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-healing-brown text-white rounded-full p-4 shadow-2xl hover:bg-energy-gold hover:text-healing-brown transition-all duration-300 z-50 flex items-center justify-center hover:scale-110 group md:bottom-8 md:right-8"
          title="Trò chuyện với MẢNH"
        >
          <div className="relative">
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-energy-gold rounded-full animate-pulse border-2 border-white" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={windowRef}
          className={`fixed z-50 transition-all duration-300 ${
            window.innerWidth < 768
              ? "inset-x-0 bottom-0 w-full h-[85vh] max-h-[85vh] rounded-t-3xl shadow-2xl"
              : "bottom-8 right-8 w-full max-w-md h-[600px] rounded-2xl shadow-2xl"
          }`}
        >
          <Card className="h-full w-full flex flex-col bg-gradient-to-b from-accent-cream to-background border border-accent-pink/30 rounded-t-3xl md:rounded-2xl overflow-hidden">
            {/* Header */}
            <div
              className={`bg-gradient-to-r from-healing-brown via-energy-gold to-healing-brown text-white p-4 flex justify-between items-center ${
                window.innerWidth >= 768 ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-3">
                {window.innerWidth >= 768 && <GripHorizontal className="w-5 h-5 opacity-70 md:block hidden" />}
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">MẢNH AI</h3>
                  <p className="text-xs opacity-90">Trợ lý năng lượng</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (confirm("Xóa lịch sử chat?")) {
                      localStorage.removeItem("chatbot_history");
                      initMessage();
                    }
                  }}
                  className="text-white hover:bg-white/20"
                >
                  🔄
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 md:p-6 bg-gradient-to-b from-accent-cream/50 to-background/50">
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="space-y-2">
                    <div className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
                          m.sender === "user"
                            ? "bg-healing-brown text-white rounded-br-none shadow-md"
                            : m.error
                            ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-none"
                            : "bg-accent-pink/60 text-healing-brown rounded-bl-none shadow-sm"
                        }`}
                      >
                        {m.text}
                        <div className="text-xs opacity-70 mt-1 text-right">
                          {m.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>

                    {m.sources && m.sources.length > 0 && (
                      <details className="ml-2 text-xs text-healing-brown/70">
                        <summary className="cursor-pointer font-medium hover:text-healing-brown transition">
                          📚 Nguồn tham khảo ({m.sources.length})
                        </summary>
                        <div className="ml-4 mt-2 space-y-1 bg-white/40 p-3 rounded-lg">
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
                    <div className="bg-accent-pink/60 px-4 py-3 rounded-2xl rounded-bl-none w-fit flex items-center gap-2">
                      <Loader2 className="animate-spin w-5 h-5 text-healing-brown" />
                      <span className="text-sm text-healing-brown">Đang suy nghĩ...</span>
                    </div>
                  </div>
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            {showQuickReplies && (
              <div className="p-4 border-t border-accent-pink/20 bg-white/50 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm border-energy-gold text-healing-brown hover:bg-energy-gold/10 rounded-full"
                    onClick={() => handleSendMessage(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-accent-pink/20 bg-white/50 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về sản phẩm, năng lượng vòng tay..."
                onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
                disabled={loading}
                className="border-healing-brown/20 focus:border-healing-brown focus:ring-healing-brown rounded-full flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                className="bg-healing-brown hover:bg-energy-gold text-white rounded-full w-12 h-12 p-0 flex-shrink-0 flex items-center justify-center transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}