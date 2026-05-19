"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePlan } from "@/src/context/UserContext";

// ── Forms imported from src/components/forms/ ─────────────────────────
// Redesign any form without touching this file.
import RegisterCard from "@/src/forms/RegisterCard";
import TourCard, { TourStep } from "@/src/forms/TourCard";
import GuideCard, { GuideStep } from "@/src/forms/GuideCard";
import PricingCard from "@/src/forms/PricingCard";

// ── Types ─────────────────────────────────────────────────────────────
type CardType = "text" | "register" | "tour" | "service-guide" | "pricing" | "welcome";

interface BotCard {
  type:         CardType;
  text?:        string;
  tourTitle?:   string;
  guideTitle?:  string;
  links?:       { label: string; href: string }[];
  quickReplies?: string[];
}

interface Msg { id: number; role: "user" | "bot"; card: BotCard }

// ── Tour data ─────────────────────────────────────────────────────────
const TOURS: Record<string, TourStep[]> = {
  marketplace: [
    { icon:"🔍", title:"Browse & Search",      desc:"Filter by category — Crops, Seeds, Fertilizer, Equipment. Search by product name or state.",                    action:{ label:"Browse Marketplace", href:"/marketplace" } },
    { icon:"📋", title:"View Listing Details",  desc:"Click any listing for full details — price, seller rating, delivery options, and direct contact.",               action:{ label:"Open Marketplace",   href:"/marketplace" } },
    { icon:"💰", title:"Escrow Payments",        desc:"ISA holds your payment until you confirm delivery. Funds released only when you're satisfied.",                  action: undefined },
    { icon:"✅", title:"Verified Sellers",        desc:"All sellers are identity-verified. Ratings and reviews from real buyers help you shop confidently.",             action: undefined },
    { icon:"🛒", title:"Post Your Listing",       desc:"Premium users can post their own produce, seeds, or equipment for thousands of buyers across Nigeria.",          action:{ label:"Upgrade to Post",    href:"/premuim" } },
  ],
  dashboard: [
    { icon:"🗺️", title:"Select Your Farm",       desc:"Use the farm selector in the header to switch between your registered farms and plots.",                          action:{ label:"Open Dashboard",     href:"/dashboard" } },
    { icon:"📡", title:"Live Sensor Readings",   desc:"Real-time soil moisture, temperature, pH, and nitrogen levels from IoT sensors in your fields.",                 action:{ label:"View Sensors",       href:"/dashboard" } },
    { icon:"🌦️", title:"Weather Intelligence",   desc:"7-day AI weather forecast specific to your farm. Plan irrigation and harvests around rainfall.",                  action: undefined },
    { icon:"🔔", title:"Smart Alerts",            desc:"Automated alerts for soil deficiency, pest sightings, and weather risks. Never miss a critical event.",           action: undefined },
    { icon:"🔥", title:"AgriTech Videos",         desc:"Trending agro videos curated directly in your dashboard — learn while you monitor your farm.",                   action:{ label:"View Dashboard",     href:"/dashboard" } },
  ],
  ai: [
    { icon:"🌱", title:"Plant Advisor (Free)",   desc:"Enter your state, soil type, season & goal — get ranked crop recommendations with yield and revenue projections.", action:{ label:"Try Plant Advisor",  href:"/aiassistant" } },
    { icon:"🐛", title:"Pest Detector (Free)",   desc:"Describe your pest or disease symptoms. The AI identifies the issue and gives a treatment protocol.",             action:{ label:"Try Pest Detector",  href:"/aiassistant" } },
    { icon:"📊", title:"Yield Predictor ⭐",     desc:"Model your expected harvest by entering seed quality, irrigation, and fertilizer inputs. Premium only.",           action:{ label:"Upgrade to Unlock",  href:"/premuim" } },
    { icon:"📈", title:"Price Forecaster ⭐",    desc:"See 30/60/90-day price forecasts and the optimal selling window for any crop. Premium only.",                     action:{ label:"Upgrade to Unlock",  href:"/premuim" } },
    { icon:"🌾", title:"Farm Intelligence",      desc:"Combined analysis — soil upload, crop rankings, pest alerts, equipment guide, and yield estimate in one report.", action:{ label:"Open AI Hub",        href:"/aiassistant" } },
  ],
  invoice: [
    { icon:"➕", title:"Create an Invoice",      desc:"Click 'New Invoice' and fill in client name, email, due date, and currency.",                                     action:{ label:"Go to Invoice",      href:"/invoice" } },
    { icon:"📝", title:"Add Line Items",         desc:"Add each product/service with quantity, unit price, discount %, and tax %. Totals calculate automatically.",      action: undefined },
    { icon:"👁",  title:"Review & Preview",      desc:"Step 3 shows a full print-ready preview. Check all details before generating.",                                   action: undefined },
    { icon:"🖨",  title:"Print or Download PDF",  desc:"Click 'Print / PDF' to export a professional invoice PDF ready to send to clients.",                              action: undefined },
    { icon:"✅", title:"Mark as Paid",            desc:"Once payment is received, mark the invoice Paid — it moves to revenue tracking automatically.",                   action: undefined },
  ],
  schedule: [
    { icon:"📅", title:"Calendar View",          desc:"See all farm tasks on a weekly calendar, colour-coded by priority.",                                               action:{ label:"Open Schedule",      href:"/schedule" } },
    { icon:"➕", title:"Add a Task",              desc:"Click 'New Task', choose category (Planting, Irrigation, etc.), priority, date, and assignee.",                   action: undefined },
    { icon:"📋", title:"Task List View",          desc:"Switch to Task List for a filterable, sortable view of all active tasks.",                                        action: undefined },
    { icon:"✓",  title:"Mark Complete",           desc:"Click the circle checkbox or 'Mark as Done'. The task moves to the Completed tab automatically.",                 action: undefined },
    { icon:"⏰", title:"Overdue Alerts",          desc:"Overdue tasks are flagged in red on the dashboard stats — nothing slips through.",                               action: undefined },
  ],
};

// ── Step-by-step guide data ───────────────────────────────────────────
const GUIDES: Record<string, { title: string; icon: string; steps: GuideStep[] }> = {
  "how to register": {
    title:"How to Create Your ISA Account", icon:"🌱",
    steps:[
      { step:1, title:"Go to Sign Up",              detail:"Click 'Sign Up' in the navbar or use the button below." },
      { step:2, title:"Enter your details",          detail:"Fill in full name, email, phone number, and a password (min. 8 characters)." },
      { step:3, title:"Choose your plan",            detail:"Select Free (₦0), Pro (₦20,000/mo), or Premium (₦45,000/mo). Upgrade anytime." },
      { step:4, title:"Accept terms & submit",      detail:"Tick the Terms & Privacy checkbox and click 'Create My Account'." },
      { step:5, title:"Start using ISA",             detail:"You'll land on AI Hub. Head to Plant Advisor for your first crop recommendations!" },
    ],
  },
  "how to sell": {
    title:"How to Sell on the Marketplace", icon:"🛒",
    steps:[
      { step:1, title:"Upgrade to Premium",          detail:"Selling requires Pro or Premium. Go to Pricing and choose a plan." },
      { step:2, title:"Open the Marketplace",        detail:"Click 'Marketplace' in the navbar." },
      { step:3, title:"Click '+ Sell on Marketplace'", detail:"A green banner at the top has the Sell button." },
      { step:4, title:"Fill in listing details",     detail:"Enter product title, category, price per unit, quantity, state, and a description." },
      { step:5, title:"Publish and receive orders",  detail:"Your listing goes live immediately. Buyers contact you through the platform." },
    ],
  },
  "how to create invoice": {
    title:"How to Create an Invoice", icon:"📄",
    steps:[
      { step:1, title:"Upgrade to Premium",          detail:"Invoice Manager requires Pro or Premium." },
      { step:2, title:"Open Invoice Manager",        detail:"Click 'Invoice' in the navbar." },
      { step:3, title:"Click 'New Invoice'",          detail:"Enter client details (name, email, due date) in Step 1." },
      { step:4, title:"Add line items",              detail:"Step 2: add each product/service with quantity, price, tax, and discount." },
      { step:5, title:"Generate & download",         detail:"Step 3: preview the invoice then click 'Generate'. Use 'Print / PDF' to download." },
    ],
  },
  "how to use ai": {
    title:"How to Use the AI Farm Advisor", icon:"🤖",
    steps:[
      { step:1, title:"Open AI Hub",                 detail:"Click 'AI Hub' in the navbar — you land on the 🌿 AI Farm Advisor tab." },
      { step:2, title:"Choose a tool",               detail:"Plant Advisor and Pest Detector are free. Yield/Price Forecaster require Premium." },
      { step:3, title:"Enter farm details",           detail:"For Plant Advisor: select state, season, soil type, farm size, and goal." },
      { step:4, title:"Get recommendations",         detail:"Click 'Get AI Recommendations'. In ~2 seconds you'll see ranked crops + practices." },
      { step:5, title:"Act on insights",             detail:"Use the recommendations to buy inputs from the Marketplace and schedule tasks." },
    ],
  },
};

// ── Default quick replies ─────────────────────────────────────────────
const DEFAULT_QUICK = [
  "How do I register?",
  "Tour the Marketplace",
  "Show AI tools",
  "How to create invoice?",
  "Tour the Dashboard",
  "What's free?",
  "View pricing",
];

// ── Intent resolver ───────────────────────────────────────────────────
function resolve(input: string): BotCard {
  const q = input.toLowerCase().trim();

  if (q.includes("register") || q.includes("sign up") || q.includes("create account") || q.includes("join"))
    return { type:"register", text:"Let me help you get started! Fill in the quick form below:", quickReplies:["Tour the Marketplace","Show AI tools","View pricing"] };

  if (q.includes("how to sell") || q.includes("post listing"))
    return { type:"service-guide", guideTitle:"how to sell", text:"Here's how to sell on the ISA Marketplace:", quickReplies:["Tour the Marketplace","How do I register?","View pricing"] };

  if (q.includes("marketplace") || q.includes("market") || q.includes("buy") || q.includes("sell"))
    return { type:"tour", tourTitle:"marketplace", text:"Here's a tour of the ISA Marketplace:", quickReplies:["How to sell?","Tour the Dashboard","Show AI tools"] };

  if (q.includes("dashboard") || q.includes("sensor") || q.includes("iot") || q.includes("monitor"))
    return { type:"tour", tourTitle:"dashboard", text:"Here's a tour of the Farm Dashboard:", quickReplies:["Show AI tools","Tour the Marketplace","How do I register?"] };

  if (q.includes("how to use") && (q.includes("ai") || q.includes("advisor")))
    return { type:"service-guide", guideTitle:"how to use ai", text:"Here's how to use the ISA AI tools:", quickReplies:["Tour the Marketplace","View pricing","How do I register?"] };

  if (q.includes("ai") || q.includes("advisor") || q.includes("pest") || q.includes("crop") || q.includes("yield"))
    return { type:"tour", tourTitle:"ai", text:"Here's a tour of the ISA AI tools:", quickReplies:["How to use AI?","Tour the Marketplace","View pricing"] };

  if (q.includes("how to") && q.includes("invoice"))
    return { type:"service-guide", guideTitle:"how to create invoice", text:"Here's how to create an invoice:", quickReplies:["View pricing","Tour the Marketplace","Show AI tools"] };

  if (q.includes("invoice") || q.includes("bill"))
    return { type:"tour", tourTitle:"invoice", text:"Here's a tour of the Invoice Manager:", quickReplies:["How to create invoice?","View pricing","Tour the Marketplace"] };

  if (q.includes("schedule") || q.includes("task") || q.includes("calendar"))
    return { type:"tour", tourTitle:"schedule", text:"Here's a tour of the Farm Schedule:", quickReplies:["View pricing","Tour the Marketplace","Show AI tools"] };

  if (q.includes("how") && q.includes("register"))
    return { type:"service-guide", guideTitle:"how to register", text:"Step-by-step guide to creating your account:", quickReplies:["Tour the Marketplace","What's free?","View pricing"] };

  if (q.includes("free") || q.includes("what") || q.includes("included"))
    return {
      type:"text",
      text:"On the **Free plan** you can:\n\n✅ Farm Dashboard\n✅ Browse Marketplace\n✅ Plant Advisor AI\n✅ Pest Detector AI\n✅ Awareness Hub + Videos\n✅ Onboarding Guide\n\n🔒 Upgrade to Premium for Invoice, Schedule, Yield Predictor, Price Forecaster, and posting listings.",
      links:[{ label:"View Premium Plans", href:"/premuim" }],
      quickReplies:["How do I register?","View pricing","Tour the Marketplace"],
    };

  if (q.includes("price") || q.includes("pricing") || q.includes("plan") || q.includes("upgrade") || q.includes("cost") || q.includes("premium"))
    return { type:"pricing", text:"Here are the ISA plans:", quickReplies:["How do I register?","Tour the Marketplace","Show AI tools"] };

  return { type:"text", text:"I can help with tours, registration, step-by-step guides, and plan questions. Try one of the quick options below!", quickReplies:DEFAULT_QUICK };
}

// ── Text renderer (supports **bold**) ────────────────────────────────
function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-1.5" />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : p
    );
    return <p key={i} className="text-sm text-gray-800 leading-relaxed">{parts}</p>;
  });
}

// ── Welcome message ───────────────────────────────────────────────────
const WELCOME: Msg = {
  id: 0, role: "bot",
  card: {
    type: "welcome",
    text: "👋 Welcome to ISA Platform! I'm your Onboarding Guide.\n\nI can:\n• **Register you** right here with a quick form\n• **Tour any feature** — Marketplace, Dashboard, AI, Invoice, Schedule\n• **Guide you step-by-step** through any task\n• **Answer questions** about plans, pricing, and features\n\nWhat would you like to do first?",
    quickReplies: DEFAULT_QUICK,
  },
};

// ── Main component ─────────────────────────────────────────────────────
export default function OnboardingAgent() {
  const { plan } = usePlan();
  const [msgs,   setMsgs]   = useState<Msg[]>([WELCOME]);
  const [input,  setInput]  = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { id: Date.now(), role: "user", card: { type: "text", text } }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const card = resolve(text);
      setMsgs(m => [...m, { id: Date.now() + 1, role: "bot", card }]);
      setTyping(false);
    }, 600 + Math.random() * 300);
  };

  const lastBot = [...msgs].reverse().find(m => m.role === "bot");
  const quickReplies = lastBot?.card.quickReplies ?? DEFAULT_QUICK;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── Chat pane ── */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
        style={{ height: "640px" }}>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🌾</div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-extrabold text-sm">ISA Onboarding Guide</p>
            <p className="text-green-200 text-[10px]">
              Tours · Registration · Step guides · Plan: <span className="text-white font-bold capitalize">{plan}</span>
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
          {msgs.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "gap-2"}`}>

              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-500
                  flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                  🌾
                </div>
              )}

              <div className={msg.role === "user" ? "max-w-[80%] bg-green-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5" : "flex-1 max-w-[92%]"}>

                {/* User bubble */}
                {msg.role === "user" && <p className="text-sm">{msg.card.text}</p>}

                {/* Bot: plain text / welcome */}
                {msg.role === "bot" && (msg.card.type === "text" || msg.card.type === "welcome") && (
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3">
                    {msg.card.text && renderText(msg.card.text)}
                    {msg.card.links && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.card.links.map(l => (
                          <Link key={l.href} href={l.href}
                            className="text-[11px] font-bold px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-95">
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Bot: registration form */}
                {msg.role === "bot" && msg.card.type === "register" && (
                  <div>
                    {msg.card.text && (
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 mb-1">
                        <p className="text-sm text-gray-800">{msg.card.text}</p>
                      </div>
                    )}
                    <RegisterCard />
                  </div>
                )}

                {/* Bot: tour (imported from forms/) */}
                {msg.role === "bot" && msg.card.type === "tour" && msg.card.tourTitle && TOURS[msg.card.tourTitle] && (
                  <div>
                    {msg.card.text && (
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 mb-1">
                        <p className="text-sm text-gray-800">{msg.card.text}</p>
                      </div>
                    )}
                    <TourCard title={msg.card.tourTitle} steps={TOURS[msg.card.tourTitle]} />
                  </div>
                )}

                {/* Bot: step guide (imported from forms/) */}
                {msg.role === "bot" && msg.card.type === "service-guide" && msg.card.guideTitle && GUIDES[msg.card.guideTitle] && (
                  <div>
                    {msg.card.text && (
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 mb-1">
                        <p className="text-sm text-gray-800">{msg.card.text}</p>
                      </div>
                    )}
                    <GuideCard {...GUIDES[msg.card.guideTitle]} />
                  </div>
                )}

                {/* Bot: pricing (imported from forms/) */}
                {msg.role === "bot" && msg.card.type === "pricing" && (
                  <div>
                    {msg.card.text && (
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 mb-1">
                        <p className="text-sm text-gray-800">{msg.card.text}</p>
                      </div>
                    )}
                    <PricingCard />
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-500
                flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">🌾</div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3.5 flex gap-1.5">
                {[0, 150, 300].map(d => (
                  <div key={d} className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay:`${d}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="border-t border-gray-100 px-3 py-2 bg-white flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-hide">
          {quickReplies.map(q => (
            <button key={q} onClick={() => send(q)}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700
                hover:bg-green-600 hover:text-white transition-all whitespace-nowrap active:scale-95 flex-shrink-0">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={e => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100 flex-shrink-0">
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ask anything — register, tours, how-tos, pricing…"
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all" />
          <button type="submit" disabled={!input.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all
              ${input.trim() ? "bg-green-600 hover:bg-green-700 shadow-md active:scale-95" : "bg-gray-200"}`}>
            <svg className={`w-4 h-4 ${input.trim() ? "text-white" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      {/* ── Sidebar ── */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-4 text-sm">What I Can Help With</h3>
          <div className="space-y-1">
            {[
              ["📝", "Register",           "How do I register?"],
              ["🛒", "Marketplace Tour",   "Tour the Marketplace"],
              ["📡", "Dashboard Tour",     "Tour the Dashboard"],
              ["🤖", "AI Tools Tour",      "Show AI tools"],
              ["📄", "Invoice Guide",      "How to create invoice?"],
              ["📅", "Schedule Guide",     "Tour the Farm Schedule"],
              ["💰", "Pricing & Plans",    "View pricing"],
            ].map(([icon, label, q]) => (
              <button key={label} onClick={() => send(q)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                  hover:bg-green-50 hover:border-green-200 border border-transparent
                  transition-all duration-150 group active:scale-95">
                <span className="text-base">{icon}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-colors flex-1">{label}</span>
                <span className="text-gray-300 group-hover:text-green-500 transition-colors text-xs">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Plan status */}
        <div className={`rounded-2xl border p-4 ${plan === "free" ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}>
          <p className={`text-xs font-extrabold uppercase tracking-wide mb-1 ${plan === "free" ? "text-amber-700" : "text-green-700"}`}>
            Your Plan: <span className="capitalize">{plan}</span>
          </p>
          {plan === "free" ? (
            <>
              <p className="text-xs text-amber-700 mb-3 leading-relaxed">
                2 free AI agents + full browsing access. Upgrade to unlock invoicing, scheduling, and all AI tools.
              </p>
              <Link href="/premuim"
                className="flex items-center justify-center gap-1 w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all active:scale-95">
                ⭐ Upgrade to Premium
              </Link>
            </>
          ) : (
            <p className="text-xs text-green-700 font-semibold">✅ Full access — all features unlocked.</p>
          )}
        </div>
      </div>
    </div>
  );
}
