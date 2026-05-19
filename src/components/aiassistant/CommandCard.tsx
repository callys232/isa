"use client";

import Link from "next/link";

const COLOR_MAP = {
  blue:   { bg: "from-blue-500 to-blue-600",   ring: "hover:ring-blue-300",   badge: "bg-blue-100 text-blue-700" },
  green:  { bg: "from-green-500 to-emerald-600",ring: "hover:ring-green-300",  badge: "bg-green-100 text-green-700" },
  purple: { bg: "from-purple-500 to-indigo-600",ring: "hover:ring-purple-300", badge: "bg-purple-100 text-purple-700" },
  amber:  { bg: "from-amber-400 to-orange-500", ring: "hover:ring-amber-300",  badge: "bg-amber-100 text-amber-700" },
  rose:   { bg: "from-rose-500 to-pink-600",    ring: "hover:ring-rose-300",   badge: "bg-rose-100 text-rose-700" },
};

interface Props {
  icon: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
  color?: keyof typeof COLOR_MAP;
  isNew?: boolean;
}

function CardContent({ icon, title, description, badge, color = "blue", isNew }: Omit<Props, "href" | "onClick">) {
  const c = COLOR_MAP[color];
  return (
    <>
      {/* Top badges */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center text-2xl shadow-sm
          transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}>
          {icon}
        </div>
        <div className="flex gap-1.5">
          {isNew && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 bg-green-100 text-green-700 rounded-full animate-pulse">
              NEW
            </span>
          )}
          {badge && (
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${c.badge}`}>{badge}</span>
          )}
        </div>
      </div>

      {/* Text */}
      <h3 className="font-extrabold text-gray-800 text-sm mb-1.5 group-hover:text-blue-700 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>

      {/* Arrow */}
      <div className="mt-4 flex items-center text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors duration-200">
        Open
        <svg className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:translate-x-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </>
  );
}

export default function CommandCard({ icon, title, description, href, onClick, badge, color = "blue", isNew }: Props) {
  const cls = `group relative bg-white rounded-2xl border border-gray-200 shadow-sm p-5 cursor-pointer
    transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-200
    hover:ring-2 ${COLOR_MAP[color].ring} active:scale-95`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        <CardContent icon={icon} title={title} description={description} badge={badge} color={color} isNew={isNew} />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls + " text-left w-full"}>
      <CardContent icon={icon} title={title} description={description} badge={badge} color={color} isNew={isNew} />
    </button>
  );
}
