"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Plan = "free" | "premium" | "admin";

interface UserContextValue {
  plan: Plan;
  setPlan: (p: Plan) => void;
  isPremium: boolean;   // true for premium + admin
  isAdmin: boolean;
  canAccess: (require: "premium" | "admin") => boolean;
}

const UserContext = createContext<UserContextValue>({
  plan:       "free",
  setPlan:    () => {},
  isPremium:  false,
  isAdmin:    false,
  canAccess:  () => false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<Plan>("free");

  // Persist plan in localStorage for demo; read admin flag set by admin login
  useEffect(() => {
    const stored = localStorage.getItem("isa-plan") as Plan | null;
    const adminFlag = sessionStorage.getItem("isa-admin");
    if (adminFlag === "true") { setPlanState("admin"); return; }
    if (stored) setPlanState(stored);
  }, []);

  const setPlan = (p: Plan) => {
    setPlanState(p);
    localStorage.setItem("isa-plan", p);
  };

  const isPremium = plan === "premium" || plan === "admin";
  const isAdmin   = plan === "admin";

  const canAccess = (require: "premium" | "admin") => {
    if (require === "premium") return isPremium;
    if (require === "admin")   return isAdmin;
    return true;
  };

  return (
    <UserContext.Provider value={{ plan, setPlan, isPremium, isAdmin, canAccess }}>
      {children}
    </UserContext.Provider>
  );
}

export const usePlan = () => useContext(UserContext);
