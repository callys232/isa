"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  processMessage, makeId, WELCOME_MESSAGE,
  ChatMessage, ConversationContext, ResponseCard,
  CropRec, PriceItem, WeatherCard, PestCard, YieldCard, ActionCard, TipCard,
} from "@/src/utils/advisorEngine";

// ── Markdown-lite renderer ─────────────────────────────────────────
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={j}>{part.slice(2, -2)}</strong>
        : part
    );
    // List item
    if (line.startsWith('• ') || line.startsWith('- ')) {
      return <li key={i} className="ml-3 list-disc">{parts.slice(1)}</li>;
    }
    return <p key={i} className={line === '' ? 'h-2' : ''}>{parts}</p>;
  });
}

// ── Card renderers ─────────────────────────────────────────────────
function CropListCard({ items }: { items: CropRec[] }) {
  return (
    <div className="mt-2 space-y-2">
      {items.map((crop, i) => (
        <div key={crop.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${i === 0 ? 'bg-green-600' : i === 1 ? 'bg-green-400' : 'bg-gray-400'}`}>
            {i + 1}
          </div>
          <span className="text-2xl shrink-0">{crop.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800 text-sm">{crop.name}</span>
              <span className="text-xs font-bold text-green-600 shrink-0">{crop.score}%</span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full mt-1">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: `${crop.score}%` }} />
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">{crop.tip}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PricesCard({ items }: { items: PriceItem[] }) {
  const trendIcon = { up: '↑', down: '↓', stable: '→' };
  const trendColor = { up: 'text-green-600', down: 'text-red-500', stable: 'text-gray-400' };
  return (
    <div className="mt-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {items.map((item, i) => (
        <div key={item.crop} className={`flex items-center justify-between px-3 py-2.5 ${i < items.length - 1 ? 'border-b border-gray-50' : ''}`}>
          <div>
            <span className="font-bold text-gray-800 text-sm">{item.crop}</span>
            <p className="text-[11px] text-gray-400">{item.unit} · {item.market}</p>
          </div>
          <div className="text-right">
            <span className="font-extrabold text-gray-900 text-sm">{item.price}</span>
            <p className={`text-xs font-bold ${trendColor[item.trend]}`}>{trendIcon[item.trend]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function WeatherMiniCard({ data }: { data: WeatherCard }) {
  return (
    <div className="mt-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-3 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sky-200 text-[11px] font-semibold">{data.location}</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-3xl font-extrabold">{data.temp}°C</span>
            <span className="text-sky-200 text-xs mb-0.5">{data.condition}</span>
          </div>
        </div>
        <span className="text-4xl">{data.icon}</span>
      </div>
      <div className="flex gap-4 mt-2 text-xs text-sky-200">
        <span>💧 {data.humidity}% humid</span>
        <span>🌧️ {data.rain}mm rain</span>
      </div>
    </div>
  );
}

function PestMiniCard({ data }: { data: PestCard }) {
  const sevColor = { low: 'bg-green-100 text-green-700', medium: 'bg-amber-100 text-amber-700', high: 'bg-red-100 text-red-700' };
  return (
    <div className="mt-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-rose-500 px-3 py-2 flex items-center gap-2">
        <span className="text-2xl">{data.emoji}</span>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">{data.name}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${sevColor[data.severity]}`}>{data.severity}</span>
          </div>
          <div className="h-1 bg-white/30 rounded-full mt-1 w-32">
            <div className="h-full bg-white rounded-full" style={{ width: `${data.confidence}%` }} />
          </div>
          <p className="text-red-100 text-[10px] mt-0.5">{data.confidence}% confidence</p>
        </div>
      </div>
      <div className="p-2.5 space-y-1">
        {data.treatment.map((t, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[11px] text-gray-700">
            <span className="text-red-500 shrink-0 mt-0.5">→</span>{t}
          </div>
        ))}
      </div>
    </div>
  );
}

function YieldMiniCard({ data }: { data: YieldCard }) {
  return (
    <div className="mt-2 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-3 text-white">
      <p className="text-green-200 text-[11px] font-semibold">{data.crop} · 1 Hectare Projection</p>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-2xl font-extrabold">{data.projected}</span>
        <span className="text-green-200 text-xs mb-0.5">{data.unit}</span>
      </div>
      <div className="mt-1.5 bg-white/20 rounded-lg px-2 py-1.5">
        <p className="text-[11px] text-green-200">Estimated Revenue</p>
        <p className="text-lg font-extrabold">{data.revenue}</p>
      </div>
    </div>
  );
}

function ActionMiniCard({ data }: { data: ActionCard }) {
  return (
    <Link href={data.href}
      className="mt-2 flex items-center gap-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-xl p-3 transition-all group">
      <span className="text-2xl">{data.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors">{data.label}</p>
        <p className="text-[11px] text-gray-500 leading-tight">{data.description}</p>
      </div>
      <span className="text-gray-300 group-hover:text-green-500 transition-colors">→</span>
    </Link>
  );
}

function TipMiniCard({ data }: { data: TipCard }) {
  return (
    <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-start gap-2">
      <span className="text-base shrink-0 mt-0.5">{data.icon}</span>
      <p className="text-[11px] text-amber-800 leading-relaxed">{data.content}</p>
    </div>
  );
}

function RenderCards({ cards }: { cards: ResponseCard[] }) {
  return (
    <div className="w-full">
      {cards.map((card, i) => {
        if (card.type === 'crops')   return <CropListCard  key={i} items={card.data as CropRec[]} />;
        if (card.type === 'prices')  return <PricesCard    key={i} items={card.data as PriceItem[]} />;
        if (card.type === 'weather') return <WeatherMiniCard key={i} data={card.data as WeatherCard} />;
        if (card.type === 'pest')    return <PestMiniCard  key={i} data={card.data as PestCard} />;
        if (card.type === 'yield')   return <YieldMiniCard key={i} data={card.data as YieldCard} />;
        if (card.type === 'action')  return <ActionMiniCard key={i} data={card.data as ActionCard} />;
        if (card.type === 'tip')     return <TipMiniCard   key={i} data={card.data as TipCard} />;
        return null;
      })}
    </div>
  );
}

// ── Message bubble ─────────────────────────────────────────────────
function MessageBubble({ message, onQuickReply }: { message: ChatMessage; onQuickReply: (r: string) => void }) {
  const isUser = message.role === 'user';
  const time = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isUser) {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-[78%]">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-sm">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <p className="text-[10px] text-gray-400 text-right mt-1 pr-1">{time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mb-4">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 shadow-sm">
        🌾
      </div>
      <div className="flex-1 max-w-[85%]">
        {/* Bubble */}
        <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 px-4 py-3">
          <div className="text-sm text-gray-800 leading-relaxed space-y-0.5">
            {renderMarkdown(message.content)}
          </div>
          {message.cards && message.cards.length > 0 && (
            <RenderCards cards={message.cards} />
          )}
        </div>
        {/* Quick replies */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {message.quickReplies.map(r => (
              <button key={r} onClick={() => onQuickReply(r)}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white border border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all shadow-sm">
                {r}
              </button>
            ))}
          </div>
        )}
        <p className="text-[10px] text-gray-400 mt-1.5 pl-1">{time}</p>
      </div>
    </div>
  );
}

// ── Typing indicator ───────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white text-xs shrink-0">
        🌾
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 px-4 py-3.5 flex items-center gap-1.5">
        {[0, 150, 300].map(delay => (
          <div key={delay} className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function FloatingAdvisor() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const contextRef = useRef<ConversationContext>({
    lastIntent: null, state: null, crop: null,
    season: null, pendingQuestion: null, messageCount: 0,
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, open, minimized]);

  // Pulse effect stops after 4 seconds
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    setMinimized(false);
    setUnread(0);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setInput('');

    const userMsg: ChatMessage = {
      id: makeId(), role: 'user',
      content: trimmed, timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    // Simulate thinking delay (800–1600ms)
    const delay = 800 + Math.random() * 800;

    setTimeout(() => {
      const { message, contextUpdate } = processMessage(trimmed, contextRef.current);
      contextRef.current = { ...contextRef.current, ...contextUpdate };

      const botMsg: ChatMessage = {
        id: makeId(), role: 'assistant',
        content: message.content ?? "Let me help you with that.",
        timestamp: new Date(),
        cards: message.cards,
        quickReplies: message.quickReplies,
      };

      setTyping(false);
      setMessages(prev => [...prev, botMsg]);

      if (!open || minimized) {
        setUnread(u => u + 1);
      }
    }, delay);
  }, [open, minimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
    // Remove quick replies from the message that triggered this
    setMessages(prev => prev.map((m, i) =>
      i === prev.length - 1 ? { ...m, quickReplies: [] } : m
    ));
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    contextRef.current = { lastIntent: null, state: null, crop: null, season: null, pendingQuestion: null, messageCount: 0 };
  };

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────── */}
      {open && (
        <div className={`fixed z-50 shadow-2xl transition-all duration-300 flex flex-col
          bottom-0 right-0 w-full sm:bottom-24 sm:right-6 sm:w-[380px]
          ${minimized ? 'h-[60px] sm:rounded-2xl overflow-hidden' : 'h-screen sm:h-[580px] sm:rounded-2xl overflow-hidden'}
        `}
          style={{ animation: 'advisorSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                🌾
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-300 rounded-full border-2 border-green-700 animate-pulse"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-extrabold text-sm leading-none">ISA Farm AI</p>
              <p className="text-green-300 text-[10px] mt-0.5">● Online · All 36 states</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearChat} title="Clear chat"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all text-xs">
                🗑
              </button>
              <button onClick={() => setMinimized(!minimized)} title={minimized ? 'Expand' : 'Minimize'}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d={minimized ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              <button onClick={() => setOpen(false)} title="Close"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-400/60 flex items-center justify-center text-white/70 hover:text-white transition-all">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Suggestion bar */}
              <div className="bg-green-50 border-b border-green-100 px-3 py-1.5 flex gap-1.5 overflow-x-auto scrollbar-hide shrink-0">
                {['Crop prices', 'What to plant', 'Pest help', 'Yield model', 'Weather'].map(s => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white border border-green-200 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all whitespace-nowrap shadow-sm">
                    {s}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-4 bg-gray-50">
                {messages.map(msg => (
                  <MessageBubble key={msg.id} message={msg} onQuickReply={handleQuickReply} />
                ))}
                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit}
                className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100 shrink-0">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about crops, prices, pests..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all"
                />
                <button type="submit" disabled={!input.trim()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0
                    ${input.trim() ? 'bg-green-600 hover:bg-green-700 shadow-md' : 'bg-gray-200'}`}>
                  <svg className={`w-4 h-4 ${input.trim() ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>

              {/* Powered by */}
              <div className="text-center py-1.5 bg-white border-t border-gray-50 shrink-0">
                <p className="text-[10px] text-gray-400">Powered by <span className="font-bold text-green-600">ISA AI</span> · 36 states · Real-time data</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Floating Button ─────────────────────────────────────── */}
      <button
        onClick={open ? () => setOpen(false) : openChat}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl
          flex items-center justify-center transition-all duration-300
          bg-gradient-to-br from-green-500 to-emerald-600
          hover:scale-110 hover:shadow-green-400/50
          ${open ? 'rotate-0' : ''}
        `}
        aria-label="Open Farm AI Advisor"
      >
        {/* Pulse ring */}
        {pulse && !open && (
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40"></span>
        )}

        {/* Unread badge */}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unread}
          </span>
        )}

        {/* Icon */}
        <span className="text-2xl transition-transform duration-300">
          {open ? '✕' : '🌾'}
        </span>
      </button>

      {/* Slide-up animation */}
      <style>{`
        @keyframes advisorSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
