import React, { useState, useRef, useEffect } from "react";
import { Bot } from "lucide-react"; // 🤖 Import the robot icon

// Helper function to render simple markdown since we can't import a library in this single-file component
const renderMarkdown = (text) => {
  let html = text;

  // Render bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Render italics
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Render links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-400 hover:text-blue-300">$1</a>');
  // Render new lines
  html = html.replace(/\n/g, '<br />');

  return { __html: html };
};

/**
 * TonyAI Chat Widget
 * Props:
 * userHabits    : Array  -> list of current user habits
 * userProgress : Object -> progress info (streaks, averages, etc.)
 */
const TonyAI = ({ userHabits = [], userProgress = {} }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi, I'm Tony! Ask me for habit tips anytime, and also to know about your habits which you are currently following." }
  ]);
  const [input, setInput] = useState("");
  
  // State for drag functionality
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const messagesEndRef = useRef(null);

  // The API key is hardcoded.
  const apiKey = import.meta.env.OPENROUTER_API ||  "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" || "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";

  // ---- Helper to call OpenRouter ----
  const callTony = async (question) => {
    setLoading(true);
    try {
      // Craft a more detailed prompt to make sure the AI uses the user data
      const prompt = `
        You are an AI named Tony, designed to help with habit tracking, and providing personalised tips for the user.
        Here are the user's current habits: ${JSON.stringify(userHabits)}.
        Here is the user's progress: ${JSON.stringify(userProgress)}.
        User question: "${question}".
        The one who created you is Dhayanithi, a passionate developer focused on habit tracking and self-improvement.
        His portfolio is https://dhayanithi.vercel.app/, only give, if the user asks about the creator or owner, or developer of Tony.
        Reply with short, friendly tips, using markdown for emphasis and actionable advice based on the provided data.
      `;

      const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await resp.json();
      const text = data.choices?.[0]?.message?.content || "No suggestions.";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Tony had a hiccup. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ---- When user presses Enter or clicks Send ----
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    callTony(question);
  };

  // ---- Auto-suggestions when opening the chat ----
  const openChat = () => {
    setOpen((o) => !o);
    if (!open && messages.length === 1) {
      // Only fetch first suggestions once
      callTony("Greet me energetically. Give me quick tips to improve my current habits which I have been following.  Give it shorter");
    }
  };

  // ---- Draggable logic ----
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    setStartPos({ x: clientX, y: clientY });
    dragRef.current = { x: position.x, y: position.y };
    console.log("Drag started");
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    const dx = clientX - startPos.x;
    const dy = clientY - startPos.y;
    setPosition({ x: dragRef.current.x + dx, y: dragRef.current.y + dy });
    console.log("Dragging... Current Position:", { x: dragRef.current.x + dx, y: dragRef.current.y + dy });
  };

  const onDragEnd = () => {
    setIsDragging(false);
    dragRef.current = null;
    console.log("Drag ended");
  };

  // Attach drag event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDragging);
      window.addEventListener('touchend', onDragEnd);
    } else {
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDragging);
      window.removeEventListener('touchend', onDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDragging);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, [isDragging, onDragging]);

  // ---- Auto-scroll to the bottom when a new message is added ----
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div 
      className="font-sans fixed bottom-4 right-4 z-50 flex flex-col items-end"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {/* Floating button */}
      <button
        onClick={openChat}
        className="p-4 text-white rounded-full shadow-xl transition-all duration-300 active:scale-95 flex flex-col items-center justify-center space-y-1 bg-gradient-to-r from-indigo-600 to-purple-700" // 🎨 Added gradient and flexbox for icon/text
        aria-label="Open Tony chat"
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
      >
        <Bot size={28} /> {/* 🤖 Robot icon */}
        <span className="text-sm font-medium">Tony AI</span> {/* 💬 The label */}
      </button>

      <div
        className={`
          mt-3 w-80 sm:w-96 max-h-[70vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out
          ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}
          bg-white/20 backdrop-blur-xl border border-white/20
        `}
      >
        {/* Header - Drag Handle */}
        <div
          className="flex justify-between items-center px-4 py-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-t-3xl border-b border-white/20 cursor-move touch-none"
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        >
          <span className="font-semibold text-lg">Tony AI</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close chat"
            onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking close
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {messages.slice(1).map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  rounded-xl px-4 py-3 max-w-[85%]
                  ${m.role === "user" ? "bg-blue-500/80 text-white" : "bg-white/40 text-gray-800 backdrop-blur-sm"}
                `}
                dangerouslySetInnerHTML={renderMarkdown(m.content)}
              />
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-xl px-4 py-3 bg-white/40 text-gray-500 text-xs backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="dot-flashing" />
                  <span>Tony is typing...</span>
                </div>
              </div>
            </div>
          )}
          {/* Invisible element to scroll into view */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSend}
          className="flex items-center p-3 border-t border-white/20 bg-white/40"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 text-sm bg-white/30 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Tailwind & Custom CSS for animations and scrollbar */}
      <style>
        {`
          .font-sans {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          }

          /* Dot flashing animation for loading state */
          .dot-flashing {
            position: relative;
            width: 5px;
            height: 5px;
            border-radius: 5px;
            background-color: #9ca3af;
            color: #9ca3af;
            animation: dot-flashing 1s infinite linear alternate;
            animation-delay: 0.5s;
          }
          .dot-flashing::before,
          .dot-flashing::after {
            content: "";
            display: inline-block;
            position: absolute;
            top: 0;
          }
          .dot-flashing::before {
            left: -8px;
            width: 5px;
            height: 5px;
            border-radius: 5px;
            background-color: #9ca3af;
            color: #9ca3af;
            animation: dot-flashing 1s infinite linear alternate;
            animation-delay: 0s;
          }
          .dot-flashing::after {
            left: 8px;
            width: 5px;
            height: 5px;
            border-radius: 5px;
            background-color: #9ca3af;
            color: #9ca3af;
            animation: dot-flashing 1s infinite linear alternate;
            animation-delay: 1s;
          }
          @keyframes dot-flashing {
            0% { background-color: #9ca3af; }
            50%, 100% { background-color: #e5e7eb; }
          }
          
          /* Custom scrollbar for webkit browsers */
          .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: #9ca3af transparent;
          }
          .scrollbar-thin::-webkit-scrollbar {
            width: 8px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #9ca3af;
            border-radius: 9999px;
            border: 2px solid transparent;
          }
        `}
      </style>
    </div>
  );
};

export default TonyAI;