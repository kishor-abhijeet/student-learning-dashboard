"use client";

import type { DashboardStat } from "@/types/dashboard";
import { motion } from "framer-motion";
import { Award, Clock3, Target, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { spring, tileMotion } from "./BentoGrid";

type StatsCardProps = {
  stat: DashboardStat;
};

const iconMap: Record<string, LucideIcon> = {
  Award,
  Clock3,
  Target,
  UsersRound
};

export function StatsCard({ stat }: StatsCardProps) {
  const Icon = iconMap[stat.icon_name] ?? Clock3;

  return (
    <motion.article
      variants={tileMotion}
      whileHover={{ scale: 1.02 }}
      transition={spring}
      className="glass-card rounded-3xl p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl border border-indigo-300/20 bg-indigo-500/12 p-3">
          <Icon className="h-5 w-5 text-indigo-200" />
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
          {stat.delta}
        </span>
      </div>
      <p className="mt-5 text-sm text-slate-400">{stat.label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
    </motion.article>
  );
}
