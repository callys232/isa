"use client";

import { useState, useMemo } from "react";

type Plan   = "Free" | "Pro" | "Premium";
type Status = "Active" | "Inactive" | "Suspended";

interface User {
  id: number;
  name: string;
  email: string;
  state: string;
  plan: Plan;
  status: Status;
  joined: string;
  lastActive: string;
  invoices: number;
  revenue: string;
  avatar: string;
}

const USERS: User[] = [
  { id:1,  name:"Adaeze Okafor",    email:"adaeze@greenvalley.ng",    state:"Anambra",  plan:"Premium", status:"Active",    joined:"2025-09-12", lastActive:"2026-05-19", invoices:24, revenue:"₦1.2M", avatar:"🧑‍🌾" },
  { id:2,  name:"Musa Ibrahim",     email:"musa.ibrahim@kanog.com",   state:"Kano",     plan:"Pro",     status:"Active",    joined:"2025-11-03", lastActive:"2026-05-18", invoices:11, revenue:"₦340K", avatar:"👨‍🌾" },
  { id:3,  name:"Chioma Okonkwo",   email:"chioma@riverbend.ng",      state:"Benue",    plan:"Premium", status:"Active",    joined:"2025-08-22", lastActive:"2026-05-17", invoices:18, revenue:"₦890K", avatar:"👩‍🌾" },
  { id:4,  name:"Emeka Nwosu",      email:"emeka.n@farmcoop.ng",      state:"Imo",      plan:"Free",    status:"Active",    joined:"2026-01-14", lastActive:"2026-05-15", invoices:3,  revenue:"₦0",    avatar:"🧑‍🌾" },
  { id:5,  name:"Ibrahim Garba",    email:"i.garba@sunriseagro.ng",   state:"Kaduna",   plan:"Pro",     status:"Inactive",  joined:"2025-12-07", lastActive:"2026-04-02", invoices:7,  revenue:"₦210K", avatar:"👨‍🌾" },
  { id:6,  name:"Fatima Al-Hassan", email:"fatima@farmconnect.org",   state:"Sokoto",   plan:"Pro",     status:"Active",    joined:"2026-02-18", lastActive:"2026-05-19", invoices:9,  revenue:"₦280K", avatar:"👩‍🌾" },
  { id:7,  name:"Tunde Adeyemi",    email:"tunde@lagrosagro.com",     state:"Lagos",    plan:"Premium", status:"Active",    joined:"2025-07-30", lastActive:"2026-05-19", invoices:31, revenue:"₦2.1M", avatar:"🧑‍🌾" },
  { id:8,  name:"Ngozi Eze",        email:"ngozi.eze@verdant.ng",     state:"Enugu",    plan:"Free",    status:"Suspended", joined:"2026-03-05", lastActive:"2026-04-18", invoices:1,  revenue:"₦0",    avatar:"👩‍🌾" },
  { id:9,  name:"Abubakar Sule",    email:"a.sule@northfield.ng",     state:"Bauchi",   plan:"Pro",     status:"Active",    joined:"2025-10-19", lastActive:"2026-05-16", invoices:14, revenue:"₦420K", avatar:"👨‍🌾" },
  { id:10, name:"Amaka Eze",        email:"amaka@heritage-farm.ng",   state:"Oyo",      plan:"Premium", status:"Active",    joined:"2025-06-11", lastActive:"2026-05-18", invoices:27, revenue:"₦1.8M", avatar:"👩‍🌾" },
  { id:11, name:"Seun Abiodun",     email:"seun@tropicrop.ng",        state:"Ogun",     plan:"Free",    status:"Active",    joined:"2026-04-22", lastActive:"2026-05-10", invoices:2,  revenue:"₦0",    avatar:"🧑‍🌾" },
  { id:12, name:"Yusuf Bello",      email:"yusuf.bello@harvest.ng",   state:"Niger",    plan:"Pro",     status:"Active",    joined:"2026-01-30", lastActive:"2026-05-17", invoices:8,  revenue:"₦195K", avatar:"👨‍🌾" },
];

const PLAN_STYLE: Record<Plan, string> = {
  Free:    "bg-gray-100 text-gray-600",
  Pro:     "bg-blue-100 text-blue-700",
  Premium: "bg-purple-100 text-purple-700",
};
const STATUS_STYLE: Record<Status, string> = {
  Active:    "bg-green-100 text-green-700",
  Inactive:  "bg-amber-100 text-amber-700",
  Suspended: "bg-red-100 text-red-700",
};
const STATUS_DOT: Record<Status, string> = {
  Active: "bg-green-500", Inactive: "bg-amber-400", Suspended: "bg-red-500",
};

export default function UsersTab() {
  const [search,  setSearch]  = useState("");
  const [plan,    setPlan]    = useState<Plan | "All">("All");
  const [status,  setStatus]  = useState<Status | "All">("All");
  const [sortBy,  setSortBy]  = useState<"name"|"joined"|"revenue"|"invoices">("joined");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("desc");
  const [page,    setPage]    = useState(1);
  const [selected, setSelected] = useState<User | null>(null);
  const PER_PAGE = 8;

  const filtered = useMemo(() => {
    let list = [...USERS];
    if (plan   !== "All") list = list.filter(u => u.plan   === plan);
    if (status !== "All") list = list.filter(u => u.status === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.state.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      let diff = 0;
      if (sortBy === "name")     diff = a.name.localeCompare(b.name);
      if (sortBy === "joined")   diff = new Date(a.joined).getTime() - new Date(b.joined).getTime();
      if (sortBy === "invoices") diff = a.invoices - b.invoices;
      if (sortBy === "revenue")  diff = parseInt(a.revenue.replace(/[₦KM,]/g,"")) - parseInt(b.revenue.replace(/[₦KM,]/g,""));
      return sortDir === "asc" ? diff : -diff;
    });
    return list;
  }, [search, plan, status, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const sort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };
  const Arr = ({ col }: { col: typeof sortBy }) =>
    sortBy === col ? <span className="ml-1 text-blue-500">{sortDir === "asc" ? "↑" : "↓"}</span> : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-extrabold text-gray-800">User Management</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-semibold">
          {filtered.length} of {USERS.length} users
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search name, email, state…"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all" />
        </div>
        <select value={plan} onChange={e => { setPlan(e.target.value as Plan | "All"); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          {["All","Free","Pro","Premium"].map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={status} onChange={e => { setStatus(e.target.value as Status | "All"); setPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          {["All","Active","Inactive","Suspended"].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-3 cursor-pointer hover:text-blue-600 select-none" onClick={() => sort("name")}>
            User <Arr col="name" />
          </div>
          <div className="col-span-2">State</div>
          <div className="col-span-1">Plan</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 cursor-pointer hover:text-blue-600 select-none" onClick={() => sort("joined")}>
            Joined <Arr col="joined" />
          </div>
          <div className="col-span-1 cursor-pointer hover:text-blue-600 select-none text-right" onClick={() => sort("invoices")}>
            Inv. <Arr col="invoices" />
          </div>
          <div className="col-span-2 cursor-pointer hover:text-blue-600 select-none text-right" onClick={() => sort("revenue")}>
            Revenue <Arr col="revenue" />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {paged.map(u => (
            <div key={u.id}
              onClick={() => setSelected(u)}
              className="px-5 py-3.5 grid grid-cols-1 md:grid-cols-12 gap-2 items-center
                hover:bg-blue-50/30 cursor-pointer group transition-all duration-150">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-base flex-shrink-0
                  group-hover:scale-110 transition-transform duration-150">
                  {u.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-700 transition-colors">{u.name}</p>
                  <p className="text-xs text-gray-400 truncate">{u.email}</p>
                </div>
              </div>
              <div className="col-span-2 text-sm text-gray-600">{u.state}</div>
              <div className="col-span-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PLAN_STYLE[u.plan]}`}>{u.plan}</span>
              </div>
              <div className="col-span-1">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[u.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[u.status]}`} />
                  {u.status}
                </span>
              </div>
              <div className="col-span-2 text-xs text-gray-500">{u.joined}</div>
              <div className="col-span-1 text-sm font-semibold text-gray-700 text-right">{u.invoices}</div>
              <div className="col-span-2 text-sm font-extrabold text-gray-800 text-right">{u.revenue}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Page {page} of {totalPages} · {filtered.length} results
          </p>
          <div className="flex gap-1">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 bg-white
                hover:border-blue-300 hover:text-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95">
              ← Prev
            </button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 bg-white
                hover:border-blue-300 hover:text-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* User detail modal */}
      {selected && (
        <>
          <style>{`@keyframes slideLeft{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}`}</style>
          <div className="fixed inset-0 z-50" style={{ background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)" }}
            onClick={() => setSelected(null)}>
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
              style={{ animation:"slideLeft 0.25s cubic-bezier(0.16,1,0.3,1)" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">{selected.avatar}</div>
                  <div>
                    <p className="text-white font-extrabold text-sm">{selected.name}</p>
                    <p className="text-blue-200 text-xs">{selected.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-white transition-all">✕</button>
              </div>
              <div className="p-6 space-y-4">
                {[
                  ["Plan",        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PLAN_STYLE[selected.plan]}`}>{selected.plan}</span>],
                  ["Status",      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[selected.status]}`}>{selected.status}</span>],
                  ["State",       selected.state],
                  ["Joined",      selected.joined],
                  ["Last Active", selected.lastActive],
                  ["Invoices",    selected.invoices],
                  ["Revenue",     <span className="font-extrabold text-green-700">{selected.revenue}</span>],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-xs font-semibold text-gray-500">{k}</span>
                    <span className="text-sm font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all active:scale-95">
                    Send Message
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-500 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-100 transition-all active:scale-95">
                    Suspend
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
