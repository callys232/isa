"use client";

const TRANSACTIONS = [
  { id:"TXN-001", user:"Tunde Adeyemi",    plan:"Premium", amount:"₦45,000", date:"2026-05-19", status:"Success", method:"Card" },
  { id:"TXN-002", user:"Amaka Eze",         plan:"Pro",     amount:"₦20,000", date:"2026-05-18", status:"Success", method:"Transfer" },
  { id:"TXN-003", user:"Halima Kwara",      plan:"Pro",     amount:"₦20,000", date:"2026-05-18", status:"Success", method:"Card" },
  { id:"TXN-004", user:"Abubakar Sule",     plan:"Pro",     amount:"₦20,000", date:"2026-05-17", status:"Success", method:"USSD" },
  { id:"TXN-005", user:"Yusuf Bello",       plan:"Premium", amount:"₦45,000", date:"2026-05-16", status:"Success", method:"Transfer" },
  { id:"TXN-006", user:"Fatima Al-Hassan",  plan:"Pro",     amount:"₦20,000", date:"2026-05-15", status:"Pending", method:"Card" },
  { id:"TXN-007", user:"Chioma Okonkwo",    plan:"Premium", amount:"₦45,000", date:"2026-05-14", status:"Success", method:"Card" },
  { id:"TXN-008", user:"Ibrahim Garba",     plan:"Pro",     amount:"₦20,000", date:"2026-05-13", status:"Failed",  method:"Card" },
];

const REVENUE_BY_PLAN = [
  { plan:"Free",    mrr:"₦0",        users:8920, pct:0,  color:"bg-gray-300" },
  { plan:"Pro",     mrr:"₦2.06M",    users:1030, pct:49, color:"bg-blue-500" },
  { plan:"Premium", mrr:"₦2.14M",    users:475,  pct:51, color:"bg-purple-600" },
];

const MONTHLY = [
  { month:"Dec", val:2100 }, { month:"Jan", val:2400 }, { month:"Feb", val:2800 },
  { month:"Mar", val:3100 }, { month:"Apr", val:3600 }, { month:"May", val:4200 },
];

const STATUS_CLS: Record<string, string> = {
  Success: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed:  "bg-red-100 text-red-700",
};

export default function RevenueTab() {
  const max = Math.max(...MONTHLY.map(m => m.val));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-gray-800">Revenue Analytics</h2>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:"MRR",            value:"₦4.2M",  sub:"Monthly recurring", trend:"+24%", color:"text-blue-600",   icon:"💰" },
          { label:"ARR",            value:"₦50.4M", sub:"Annual run rate",    trend:"+24%", color:"text-green-600",  icon:"📈" },
          { label:"Paying Users",   value:"1,505",  sub:"Pro + Premium",      trend:"+15%", color:"text-purple-600", icon:"💎" },
          { label:"Avg Revenue/User",value:"₦3,272",sub:"Per paying user",   trend:"+8%",  color:"text-amber-600",  icon:"📊" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5
            hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</p>
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">{s.icon}</span>
            </div>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            <span className="inline-block mt-2 text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              {s.trend} MoM
            </span>
          </div>
        ))}
      </div>

      {/* MRR chart + plan breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* MRR bar chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-5">MRR Growth (₦ thousands)</h3>
          <div className="flex items-end gap-4 h-40">
            {MONTHLY.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold text-gray-600">₦{(m.val / 1000).toFixed(1)}K</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-700
                  hover:from-blue-700 hover:to-blue-500 hover:scale-105 cursor-default"
                  style={{ height: `${(m.val / max) * 100}%` }} />
                <span className="text-[10px] text-gray-400">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-5">Revenue by Plan</h3>
          <div className="space-y-5">
            {REVENUE_BY_PLAN.map(p => (
              <div key={p.plan}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-gray-700">{p.plan}</span>
                  <span className="text-sm font-extrabold text-gray-800">{p.mrr}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color} transition-all duration-700`}
                    style={{ width: `${p.pct}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{p.users.toLocaleString()} users · {p.pct}% of MRR</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-extrabold text-gray-800">Recent Transactions</h3>
          <span className="text-xs text-gray-400">{TRANSACTIONS.length} transactions</span>
        </div>
        <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100
          text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-2">ID</div>
          <div className="col-span-3">User</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-1">Method</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Date</div>
        </div>
        <div className="divide-y divide-gray-50">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="px-5 py-3.5 grid grid-cols-1 md:grid-cols-12 gap-2 items-center
              hover:bg-green-50/30 transition-all duration-150 group">
              <div className="col-span-2 font-mono text-xs text-gray-500">{tx.id}</div>
              <div className="col-span-3 text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors truncate">{tx.user}</div>
              <div className="col-span-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                  ${tx.plan === "Premium" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                  {tx.plan}
                </span>
              </div>
              <div className="col-span-2 font-extrabold text-gray-800">{tx.amount}</div>
              <div className="col-span-1 text-xs text-gray-500">{tx.method}</div>
              <div className="col-span-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_CLS[tx.status]}`}>{tx.status}</span>
              </div>
              <div className="col-span-1 text-xs text-gray-400 text-right">{tx.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
