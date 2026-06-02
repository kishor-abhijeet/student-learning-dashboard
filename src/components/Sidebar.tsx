"use client";

import type { DashboardProfile, NavigationItem } from "@/types/dashboard";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, GraduationCap, LayoutDashboard, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Settings
};

export function Sidebar({
  profile,
  items
}: {
  profile: DashboardProfile;
  items: NavigationItem[];
}) {
  const [active, setActive] = useState(items[0]?.label ?? "");

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-0 top-0 z-40 hidden h-screen border-r border-line bg-obsidian/70 backdrop-blur-2xl md:block md:w-[5.75rem] lg:w-72"
      >
        <div className="flex h-full flex-col px-3 py-5 lg:px-5">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-glow">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-slate-400">{profile.sidebar_label}</p>
              <p className="font-semibold text-white">{profile.sidebar_brand}</p>
            </div>
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const Icon = iconMap[item.icon_name] ?? LayoutDashboard;
              const isActive = active === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActive(item.label)}
                  aria-current={isActive ? "page" : undefined}
                  className="relative flex h-12 w-full items-center justify-center rounded-2xl px-3 text-sm font-medium text-slate-400 transition-colors hover:text-white lg:justify-start lg:gap-3"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-navigation-highlight"
                      className="absolute inset-0 rounded-2xl border border-indigo-300/20 bg-indigo-500/14 shadow-glow"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  ) : null}
                  <Icon className="relative h-5 w-5" />
                  <span className="relative hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto hidden rounded-3xl border border-line bg-white/[0.04] p-4 lg:block">
            <p className="text-sm font-medium text-white">{profile.focus_title}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              {profile.focus_description}
            </p>
          </div>
        </div>
      </nav>

      <nav
        aria-label="Mobile primary"
        className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border border-line bg-obsidian/82 p-2 shadow-glow backdrop-blur-2xl md:hidden"
      >
        <div className="grid grid-cols-4 gap-1">
          {items.map((item) => {
            const Icon = iconMap[item.icon_name] ?? LayoutDashboard;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(item.label)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className="relative flex h-14 items-center justify-center rounded-2xl text-slate-400"
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-mobile-navigation-highlight"
                    className="absolute inset-0 rounded-2xl border border-indigo-300/20 bg-indigo-500/16"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                ) : null}
                <Icon className="relative h-5 w-5" />
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
