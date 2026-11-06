
import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  UserRound,
  Sparkles,
  LoaderCircle,
  Trash2,
} from "lucide-react";

const MODEL = "openrouter/free";
const API_KEY =  import.meta.env.VITE_OPENROUTER_API_KEY;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Assalam-o-Alaikum! 👋 Welcome to APWA Synapse AI. How can I help you with your studies today?",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    if (!API_KEY) {
      alert("OpenRouter API key is missing. Check your .env file.");
      return;
    }

    const userMessage = {
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "X-OpenRouter-Title": "APWA Synapse LMS",
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              {
                role: "system",
                content: `You are APWA Synapse AI, a friendly educational assistant for class 10 students.

                Help students with:
                - Mathematics
                - Science
                - Computer studies
                - English
                - Pakistan Studies

                Explain everything in simple English.
                Give examples and step-by-step explanations.
                Be polite, friendly and educational.
                Never request personal information from students.`,
              },
              ...updatedMessages.slice(-12),
            ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message || `API Error: ${response.status}`
        );
      }

      const aiReply = data?.choices?.[0]?.message?.content;

      if (!aiReply) {
        throw new Error("AI returned an empty response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry! ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! What would you like to learn today?",
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          className="fixed bottom-7 right-7 z-[9999] flex h-[100px] w-[100px] items-center justify-center rounded-full border-2 border-[#DDD6FE] bg-transparent transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-lg shadow-purple-300/50 transition-all duration-300 hover:bg-[#5B21B6]">
            <MessageCircle size={35} strokeWidth={2} />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] flex h-[min(580px,calc(100dvh-48px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#DDD6FE] bg-white shadow-2xl shadow-purple-900/20 animate-in fade-in slide-in-from-bottom-4 duration-300">

          {/* Header */}
          <div className="flex items-center gap-3 bg-[#2E1065] p-4 text-white">

            <div className="rounded-full bg-white/15 p-2">
              <Bot size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold">
                APWA Synapse AI
              </h3>
              <p className="text-xs text-purple-200">
                Your Learning Assistant
              </p>
            </div>

            <button
              onClick={clearChat}
              disabled={loading}
              title="Clear chat"
              className="rounded-lg p-2 transition hover:bg-white/15 disabled:opacity-50"
            >
              <Trash2 size={18} />
            </button>

            <button
              onClick={() => setIsOpen(false)}
              title="Close chat"
              className="rounded-lg p-2 transition hover:bg-white/15"
            >
              <X size={21} />
            </button>
          </div>

          {/* Welcome Banner */}
          <div className="flex items-center gap-2 border-b border-[#DDD6FE] bg-[#F5F3FF] px-4 py-3">
            <Sparkles size={17} className="text-[#7C3AED]" />
            <p className="text-xs font-medium text-[#5B21B6]">
              Ask anything about your studies!
            </p>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-white p-4">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  message.role === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >
                <div
                  className={`shrink-0 rounded-full p-2 ${
                    message.role === "user"
                      ? "bg-purple-100 text-[#7C3AED]"
                      : "bg-[#7C3AED] text-white"
                  }`}
                >
                  {message.role === "user" ? (
                    <UserRound size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>

                <div
                  className={`max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2.5 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-tr-none bg-[#7C3AED] text-white"
                      : "rounded-tl-none bg-[#F5F3FF] text-[#1E1B4B]"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#7C3AED] p-2 text-white">
                  <Bot size={16} />
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-3 py-3 text-xs text-[#7C3AED]">
                  <LoaderCircle size={15} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-[#DDD6FE] bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-3 text-sm text-[#1E1B4B] outline-none placeholder:text-gray-400 focus:border-[#7C3AED]"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white transition hover:bg-[#5B21B6] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>

          <div className="bg-white pb-2 text-center text-[10px] text-gray-400">
            Powered by OpenRouter · APWA Synapse
          </div>
        </div>
      )}
    </>
  );
}
