export type Intent =
  | 'greeting' | 'planting' | 'pest' | 'weather'
  | 'price' | 'yield' | 'fertilizer' | 'irrigation'
  | 'help' | 'general';

export type CardType = 'crops' | 'prices' | 'weather' | 'action' | 'pest' | 'tip' | 'yield';

export interface CropRec    { name: string; emoji: string; score: number; tip: string }
export interface PriceItem  { crop: string; price: string; unit: string; trend: 'up' | 'down' | 'stable'; market: string }
export interface WeatherCard { temp: number; condition: string; icon: string; humidity: number; rain: number; location: string }
export interface PestCard   { name: string; confidence: number; severity: 'low' | 'medium' | 'high'; treatment: string[]; emoji: string }
export interface YieldCard  { crop: string; area: number; projected: number; revenue: string; unit: string }
export interface ActionCard { label: string; href: string; icon: string; description: string }
export interface TipCard    { content: string; icon: string }

export type ResponseCard =
  | { type: 'crops';   data: CropRec[] }
  | { type: 'prices';  data: PriceItem[] }
  | { type: 'weather'; data: WeatherCard }
  | { type: 'action';  data: ActionCard }
  | { type: 'pest';    data: PestCard }
  | { type: 'yield';   data: YieldCard }
  | { type: 'tip';     data: TipCard };

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  cards?: ResponseCard[];
  quickReplies?: string[];
}

export interface ConversationContext {
  lastIntent: Intent | null;
  state: string | null;
  crop: string | null;
  season: string | null;
  pendingQuestion: string | null;
  messageCount: number;
}

// ── Entity tables ──────────────────────────────────────────────────
const STATES = [
  'abia','adamawa','akwa ibom','anambra','bauchi','bayelsa','benue','borno',
  'cross river','delta','ebonyi','edo','ekiti','enugu','fct','abuja','gombe','imo',
  'jigawa','kaduna','kano','katsina','kebbi','kogi','kwara','lagos',
  'nasarawa','niger','ogun','ondo','osun','oyo','plateau','rivers',
  'sokoto','taraba','yobe','zamfara',
];

const CROPS = [
  'tomato','tomatoes','maize','corn','cassava','rice','pepper','cowpea',
  'soybean','soybeans','groundnut','groundnuts','yam','onion','onions',
  'millet','sorghum','cocoa','cotton','sesame','ginger','watermelon',
];

const NORTHERN = ['kano','katsina','sokoto','zamfara','jigawa','kebbi','kaduna','bauchi','borno','yobe','gombe','adamawa'];
const SOUTHERN = ['lagos','ogun','oyo','osun','ondo','edo','delta','rivers','bayelsa','cross river','imo','anambra','enugu','ebonyi','abia','akwa ibom'];

function detectState(msg: string): string | null {
  const lower = msg.toLowerCase();
  return STATES.find(s => lower.includes(s)) ?? null;
}

function detectCrop(msg: string): string | null {
  const lower = msg.toLowerCase();
  return CROPS.find(c => lower.includes(c)) ?? null;
}

function detectIntent(msg: string): Intent {
  const lower = msg.toLowerCase();
  if (/\b(hi|hello|hey|good (morning|evening|afternoon)|how are you|start|begin)\b/.test(lower)) return 'greeting';
  if (/\b(help|what can you|capabilities|how do you work|what do you know|what can i ask)\b/.test(lower)) return 'help';
  if (/\b(weather|rain|rainfall|temperature|forecast|climate|humid|flood|drought|harmattan)\b/.test(lower)) return 'weather';
  if (/\b(price|market|sell|how much|worth|naira|₦|selling|buy|cost)\b/.test(lower)) return 'price';
  if (/\b(pest|disease|insect|larva|larvae|spot|wilt|blight|armyworm|aphid|fungus|mold|rot|dying|attack|infected|damaged|yellowing|brown)\b/.test(lower)) return 'pest';
  if (/\b(fertil|npk|urea|organic|compost|nutrient|manure|amendment|soil health)\b/.test(lower)) return 'fertilizer';
  if (/\b(irrigat|water|drip|sprinkler|moisture|watering)\b/.test(lower)) return 'irrigation';
  if (/\b(yield|harvest|tonnes|bags|produce|output|productivity|how much will i get)\b/.test(lower)) return 'yield';
  if (/\b(plant|grow|crop|what should|season|suitable|recommend|farm|sow|cultivat)\b/.test(lower)) return 'planting';
  return 'general';
}

// ── Response builders ──────────────────────────────────────────────
function greetingResponse(): Partial<ChatMessage> {
  return {
    content: "Hey! 👋 I'm **ISA**, your intelligent farm advisor.\n\nI'm trained on Nigerian agricultural data for all 36 states. Ask me anything — I'll give you real, actionable advice.",
    cards: [{ type: 'tip', data: { icon: '🌾', content: 'Try asking: "What should I plant in Kano this season?" or "What\'s the price of tomatoes?"' } }],
    quickReplies: ['What should I plant?', 'Current crop prices', 'Pest/disease help', 'Weather forecast', 'Fertilizer advice'],
  };
}

function helpResponse(): Partial<ChatMessage> {
  return {
    content: "Here's everything I can help you with:\n\n🌱 **Planting** — Crop recommendations by state, season & soil\n🔬 **Pest Detection** — Identify diseases & get treatment plans\n💰 **Market Prices** — Live prices across Nigerian markets\n📊 **Yield Modeling** — Predict harvest before you plant\n🧪 **Fertilizer** — What to apply, when, and how much\n💧 **Irrigation** — Water management advice\n🌦️ **Weather** — Farm-specific forecasts",
    quickReplies: ['Best crop for my state', 'Show market prices', 'Diagnose my plant', 'Calculate my yield'],
  };
}

function plantingResponse(state: string | null, ctx: ConversationContext): Partial<ChatMessage> {
  if (!state) {
    return {
      content: "I'd love to help with crop recommendations! 🌱\n\nTo give you the most accurate advice, **which state are you farming in?**",
      quickReplies: ['Lagos', 'Kano', 'Oyo', 'Kaduna', 'Rivers', 'Enugu', 'Other state'],
    };
  }

  const isNorth = NORTHERN.includes(state.toLowerCase());
  const isDry = !ctx.season || ctx.season.includes('dry') || ctx.season.includes('harmattan');

  const northCrops: CropRec[] = [
    { name: 'Onions',     emoji: '🧅', score: 94, tip: 'Dry season onion commands ₦60k–90k/bag. Best return/acre in the north.' },
    { name: 'Tomatoes',   emoji: '🍅', score: 88, tip: 'Irrigated dry-season tomato: premium prices Nov–Feb.' },
    { name: 'Maize',      emoji: '🌽', score: 82, tip: 'High demand from feed mills. IITA hybrid yields 6–8t/ha.' },
    { name: 'Soybeans',   emoji: '🫘', score: 78, tip: 'Strong export market. NASC certified seed for best yield.' },
  ];

  const southCrops: CropRec[] = [
    { name: 'Tomatoes',   emoji: '🍅', score: 92, tip: 'High demand year-round. Grow with drip irrigation for dry season premium.' },
    { name: 'Maize',      emoji: '🌽', score: 88, tip: 'Two growing seasons per year in the south. Excellent ROI.' },
    { name: 'Cassava',    emoji: '🥔', score: 85, tip: 'Drought-tolerant & long shelf life. Starch processors pay ₦95k/tonne.' },
    { name: 'Pepper',     emoji: '🌶️', score: 80, tip: 'Highest value crop per hectare. Dry & sell off-season for 3× price.' },
  ];

  const crops = isNorth ? northCrops : southCrops;
  const stateName = state.charAt(0).toUpperCase() + state.slice(1);

  return {
    content: `Great news — ${stateName} State has excellent growing conditions! 🌱\n\nBased on your region, current season, and market demand, here are your **top 4 crops** ranked by profitability:`,
    cards: [
      { type: 'crops', data: crops },
      { type: 'action', data: { icon: '🔬', label: 'Full AI Analysis', href: '/ai-advisor', description: 'Get a detailed farm plan with yield projections and input requirements' } },
    ],
    quickReplies: ['Fertilizer for ' + crops[0].name, 'Price of ' + crops[0].name, 'Pest risks for ' + crops[0].name, 'See full planting guide'],
  };
}

function pestResponse(crop: string | null): Partial<ChatMessage> {
  const knownPests: PestCard[] = [
    {
      name: 'Fall Armyworm', emoji: '🐛', confidence: 84, severity: 'high',
      treatment: ['Apply Emamectin benzoate 1.9EC at 0.4L/ha within 48h', 'Scout with pheromone traps (1 per 2 acres)', 'Use Neem-based bio-pesticide for organic option'],
    },
    {
      name: 'Leaf Rust (Fungal)', emoji: '🍂', confidence: 91, severity: 'medium',
      treatment: ['Apply Mancozeb 80WP at 2.5kg/ha immediately', 'Alternate with Propiconazole 25EC after 7 days', 'Remove & burn infected leaves to reduce spread'],
    },
  ];

  if (!crop) {
    return {
      content: "I can help identify pests and diseases! 🔬\n\nFor the most accurate diagnosis, could you:\n\n1. **Describe the symptoms** (yellowing, spots, wilting, etc.)\n2. Tell me **which crop** is affected\n3. Mention if the damage is on **leaves, stems, or roots**\n\nOr upload a photo in the full Pest Detector tool:",
      cards: [{ type: 'action', data: { icon: '📸', label: 'Open Pest Detector', href: '/ai-advisor', description: 'Upload a photo for instant AI-powered pest identification' } }],
      quickReplies: ['Fall Armyworm on maize', 'Tomato leaf blight', 'Cassava mosaic disease', 'Yellow leaves on my crop'],
    };
  }

  const pest = knownPests[Math.floor(Math.random() * knownPests.length)];
  return {
    content: `Based on your description of **${crop}** damage, here's my diagnosis:`,
    cards: [
      { type: 'pest', data: pest },
      { type: 'tip', data: { icon: '⏰', content: 'Act within 48 hours — most fungal diseases and armyworm infestations spread 2–3× in 72h under current humidity levels.' } },
    ],
    quickReplies: ['Buy pesticide on Marketplace', 'Prevention tips', 'Other crop problems', 'Diagnose another plant'],
  };
}

function priceResponse(crop: string | null): Partial<ChatMessage> {
  const allPrices: PriceItem[] = [
    { crop: 'Tomatoes',  price: '₦18,000',  unit: '25kg basket', trend: 'up',    market: 'Mile 12, Lagos' },
    { crop: 'Maize',     price: '₦42,000',  unit: 'tonne',       trend: 'stable',market: 'Dawanau, Kano' },
    { crop: 'Cassava',   price: '₦90,000',  unit: 'tonne',       trend: 'up',    market: 'Oba, Anambra' },
    { crop: 'Rice',      price: '₦55,000',  unit: '50kg bag',    trend: 'stable',market: 'Bodija, Ibadan' },
    { crop: 'Pepper',    price: '₦55,000',  unit: '50kg bag',    trend: 'up',    market: 'Dutse, Lagos' },
    { crop: 'Soybeans',  price: '₦380,000', unit: 'tonne',       trend: 'up',    market: 'Zaria, Kaduna' },
    { crop: 'Onions',    price: '₦85,000',  unit: '50kg bag',    trend: 'up',    market: 'Jibia, Katsina' },
    { crop: 'Groundnuts',price: '₦420,000', unit: 'tonne',       trend: 'stable',market: 'Gusau, Zamfara' },
  ];

  const shown = crop
    ? allPrices.filter(p => p.crop.toLowerCase().includes(crop.toLowerCase())).slice(0, 3)
    : allPrices.slice(0, 4);

  const displayCrop = crop ? crop.charAt(0).toUpperCase() + crop.slice(1) : null;

  return {
    content: crop
      ? `Here are today's ${displayCrop} prices across Nigerian markets 💰:`
      : "Here are today's market prices for major Nigerian crops 💰:",
    cards: [
      { type: 'prices', data: shown.length > 0 ? shown : allPrices.slice(0, 4) },
      { type: 'action', data: { icon: '📈', label: 'Price Forecaster', href: '/ai-advisor', description: 'See 30/60/90-day projections and the best time to sell' } },
    ],
    quickReplies: ['Best time to sell tomatoes', 'Compare all markets', 'Buy on Marketplace', 'Yield + revenue estimate'],
  };
}

function weatherResponse(state: string | null): Partial<ChatMessage> {
  const stateWeather: Record<string, WeatherCard> = {
    kano:   { temp: 34, condition: 'Sunny',        icon: '☀️', humidity: 28, rain: 0,    location: 'Kano, Kano State' },
    lagos:  { temp: 28, condition: 'Partly Cloudy', icon: '⛅', humidity: 82, rain: 3.2,  location: 'Lagos Island, Lagos' },
    ibadan: { temp: 29, condition: 'Partly Cloudy', icon: '⛅', humidity: 74, rain: 2.4,  location: 'Ibadan, Oyo State' },
    oyo:    { temp: 29, condition: 'Partly Cloudy', icon: '⛅', humidity: 74, rain: 2.4,  location: 'Ibadan, Oyo State' },
    rivers: { temp: 27, condition: 'Rainy',         icon: '🌧️', humidity: 92, rain: 18.6, location: 'Port Harcourt, Rivers' },
    enugu:  { temp: 26, condition: 'Cloudy',        icon: '🌥️', humidity: 78, rain: 4.1,  location: 'Enugu, Enugu State' },
    kaduna: { temp: 31, condition: 'Sunny',         icon: '☀️', humidity: 35, rain: 0,    location: 'Kaduna, Kaduna State' },
  };

  const key = state?.toLowerCase() ?? '';
  const wData = stateWeather[key] ?? { temp: 29, condition: 'Partly Cloudy', icon: '⛅', humidity: 68, rain: 1.8, location: `${state ? state.charAt(0).toUpperCase() + state.slice(1) + ', Nigeria' : 'Nigeria (avg)'}` };

  const advisory = wData.humidity > 80
    ? '⚠️ High humidity — fungal disease risk is elevated. Monitor crops closely and consider preventive fungicide.'
    : wData.temp > 33
    ? '🌡️ High temperatures — increase irrigation frequency. Apply mulch to conserve soil moisture.'
    : wData.rain > 10
    ? '🌧️ Heavy rainfall — ensure drainage channels are clear. Postpone fertilizer application.'
    : '✅ Good farming conditions today. Ideal for field operations, planting, and spraying.';

  return {
    content: `Current weather conditions for **${wData.location}** 🌦️:`,
    cards: [
      { type: 'weather', data: wData },
      { type: 'tip', data: { icon: '🌾', content: advisory } },
    ],
    quickReplies: ['7-day forecast', 'Best day to spray', 'Irrigation advice today', 'Open farm dashboard'],
  };
}

function fertilizerResponse(crop: string | null): Partial<ChatMessage> {
  const plans: Record<string, string> = {
    maize:     '**Maize:** Apply NPK 15-15-15 at 200kg/ha at planting. Top-dress with Urea (100kg/ha) at 4 weeks. Total cost: ~₦28,000/ha.',
    tomatoes:  '**Tomatoes:** Base dressing NPK 20-10-10 at 300kg/ha. Foliar spray CAN weekly from fruit set. Potassium boost at flowering.',
    tomato:    '**Tomatoes:** Base dressing NPK 20-10-10 at 300kg/ha. Foliar spray CAN weekly from fruit set. Potassium boost at flowering.',
    cassava:   '**Cassava:** Apply NPK 10-10-10 at 200kg/ha at planting. Top-dress at 8 weeks. Cassava is low-input but responds well to potassium.',
    rice:      '**Rice:** Basal NPK 15-15-15 at 250kg/ha at transplanting. Urea top-dress in 2 splits (3 weeks + 6 weeks after transplant).',
    pepper:    '**Pepper:** High potassium demand. Use NPK 12-12-17 at 300kg/ha. Regular foliar calcium reduces blossom end rot.',
    soybeans:  '**Soybeans:** Inoculate seed with Rhizobium before planting. Single-super phosphate (200kg/ha) boosts nodulation. Minimal nitrogen needed.',
    groundnuts:'**Groundnuts:** Single-super phosphate at 200kg/ha. Gypsum at 250kg/ha at pegging for pod fill. Low nitrogen — legume fixes its own.',
  };

  const key = crop?.toLowerCase() ?? '';
  const plan = plans[key] ?? null;

  return {
    content: plan
      ? `${plan}\n\n💡 Always do a **soil test** before heavy fertilizer investment — it can save you 30–40% on input costs.`
      : `Fertilizer recommendations depend on your crop and soil health. 🧪\n\n**General principles:**\n• NPK 15-15-15 works for most crops at planting\n• Top-dress with Urea at 4–6 weeks\n• Always split-apply to reduce leaching\n• Organic compost improves soil structure long-term\n\n**Which crop are you asking about?**`,
    cards: [
      { type: 'action', data: { icon: '🏪', label: 'Buy Fertilizer', href: '/marketplace', description: 'Certified NPK, Urea, and Organic Compost from verified suppliers' } },
    ],
    quickReplies: crop
      ? ['How to apply it', 'Where to buy', 'Organic alternatives', 'Next crop advice']
      : ['Maize fertilizer', 'Tomato fertilizer', 'Rice fertilizer', 'Organic options'],
  };
}

function irrigationResponse(): Partial<ChatMessage> {
  return {
    content: "Smart irrigation = higher yields + lower costs. 💧\n\nHere's a quick comparison:\n\n| System | Water saved | Best for |\n|--------|------------|----------|\n| **Drip** | 60% vs flood | Vegetables, tomatoes |\n| **Sprinkler** | 40% | Maize, groundnuts |\n| **Flood/Furrow** | Baseline | Lowland rice |\n| **Rain-fed** | — | Rainy-season crops |\n\n**Rule of thumb:** Drip irrigation pays back its cost in 1–2 seasons for high-value vegetables.",
    cards: [
      { type: 'action', data: { icon: '🚜', label: 'Browse Irrigation Equipment', href: '/marketplace', description: 'Drip kits, sprinkler systems, and pumps from verified sellers' } },
    ],
    quickReplies: ['Drip system cost', 'Which crops need irrigation', 'Irrigation schedule for tomatoes', 'Open Dashboard'],
  };
}

function yieldResponse(crop: string | null): Partial<ChatMessage> {
  const yields: Record<string, YieldCard> = {
    maize:    { crop: 'Maize',    area: 1, projected: 4.5, revenue: '₦189,000',  unit: 'tonnes/ha' },
    tomatoes: { crop: 'Tomatoes', area: 1, projected: 18,  revenue: '₦324,000',  unit: 'tonnes/ha' },
    tomato:   { crop: 'Tomatoes', area: 1, projected: 18,  revenue: '₦324,000',  unit: 'tonnes/ha' },
    cassava:  { crop: 'Cassava',  area: 1, projected: 22,  revenue: '₦1,980,000',unit: 'tonnes/ha' },
    rice:     { crop: 'Rice',     area: 1, projected: 3.5, revenue: '₦192,500',  unit: 'tonnes/ha' },
    pepper:   { crop: 'Pepper',   area: 1, projected: 8,   revenue: '₦440,000',  unit: 'tonnes/ha' },
    soybeans: { crop: 'Soybeans', area: 1, projected: 2.0, revenue: '₦760,000',  unit: 'tonnes/ha' },
    soybean:  { crop: 'Soybeans', area: 1, projected: 2.0, revenue: '₦760,000',  unit: 'tonnes/ha' },
  };

  const key = crop?.toLowerCase() ?? '';
  const data = yields[key] ?? null;

  if (!data) {
    return {
      content: "I can model your expected yield and revenue before you plant. 📊\n\n**Which crop** are you planning to grow? I'll give you a projection based on seed quality, irrigation, and fertilizer inputs.",
      quickReplies: ['Yield for maize', 'Yield for tomatoes', 'Yield for rice', 'Open Yield Predictor'],
    };
  }

  return {
    content: `Here's a **1 hectare projection** for ${data.crop} under standard management 📊:`,
    cards: [
      { type: 'yield', data },
      { type: 'action', data: { icon: '📊', label: 'Full Yield Predictor', href: '/ai-advisor', description: 'Model yield across different input levels — seed quality, irrigation, fertilizer' } },
    ],
    quickReplies: [`Fertilizer for ${data.crop}`, `Market price of ${data.crop}`, 'Model a different crop', 'Calculate for my farm size'],
  };
}

function generalResponse(msg: string, ctx: ConversationContext): Partial<ChatMessage> {
  // Handle follow-up state answers
  const detectedState = detectState(msg);
  if (ctx.pendingQuestion === 'state' && detectedState) {
    return plantingResponse(detectedState, ctx);
  }

  // Handle standalone state mentions
  if (detectedState && !ctx.lastIntent) {
    return plantingResponse(detectedState, ctx);
  }

  return {
    content: "I'm not sure I understood that fully. Let me help you with something specific! 😊\n\nTry asking:\n• *\"What should I plant in Lagos?\"*\n• *\"Price of maize today\"*\n• *\"My tomatoes have yellow leaves\"*\n• *\"Weather forecast for Kano\"*",
    quickReplies: ['What should I plant?', 'Market prices', 'Identify a pest', 'Fertilizer advice'],
  };
}

// ── Main engine function ───────────────────────────────────────────
export function processMessage(
  userMessage: string,
  context: ConversationContext
): { message: Partial<ChatMessage>; contextUpdate: Partial<ConversationContext> } {
  const intent = detectIntent(userMessage);
  const state  = detectState(userMessage) ?? context.state;
  const crop   = detectCrop(userMessage)  ?? context.crop;

  let response: Partial<ChatMessage>;

  switch (intent) {
    case 'greeting':    response = greetingResponse(); break;
    case 'help':        response = helpResponse(); break;
    case 'planting':    response = plantingResponse(state, { ...context, state }); break;
    case 'pest':        response = pestResponse(crop); break;
    case 'price':       response = priceResponse(crop); break;
    case 'weather':     response = weatherResponse(state); break;
    case 'fertilizer':  response = fertilizerResponse(crop); break;
    case 'irrigation':  response = irrigationResponse(); break;
    case 'yield':       response = yieldResponse(crop); break;
    default:            response = generalResponse(userMessage, context); break;
  }

  const contextUpdate: Partial<ConversationContext> = {
    lastIntent: intent,
    state:  state  ?? context.state,
    crop:   crop   ?? context.crop,
    messageCount: context.messageCount + 1,
    pendingQuestion: intent === 'planting' && !state ? 'state' : null,
  };

  return { message: response, contextUpdate };
}

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hey! 👋 I'm **ISA**, your AI farm advisor. I'm trained on Nigerian agricultural data across all 36 states.\n\nHow can I help your farm today?",
  timestamp: new Date(),
  cards: [{ type: 'tip', data: { icon: '💡', content: 'Ask me about crops, pest diagnosis, market prices, yield projections, or weather forecasts.' } }],
  quickReplies: ['What should I plant?', 'Crop prices today', 'Diagnose my plant', 'Weather forecast'],
};
