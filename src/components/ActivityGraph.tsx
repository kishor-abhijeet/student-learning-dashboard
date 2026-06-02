"use client";

import type { ActivityDay, ActivityMetric } from "@/types/dashboard";
import { motion } from "framer-motion";
import { spring, tileMotion } from "./BentoGrid";

const levels = [
  "bg-slate-800",
  "bg-indigo-950",
  "bg-indigo-800",
  "bg-sky-600",
  "bg-cyan-300"
];

export function ActivityGraph({
  eyebrow,
  title,
  metrics,
  days
}: {
  eyebrow: string;
  title: string;
  metrics: ActivityMetric[];
  days: ActivityDay[];
}) {
  return (
    <motion.article variants={tileMotion} className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-sky-300">{eyebrow}</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-xs text-slate-400">{metric.label}</p>
              <p className="mt-1 text-xl font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <div className="grid min-w-[720px] grid-flow-col grid-rows-7 gap-2">
          {days.map((day, index) => {
            const level = Math.max(0, Math.min(4, day.sessions));

            return (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.18 }}
              transition={{ ...spring, delay: index * 0.004 }}
              className={`h-4 w-4 rounded-[5px] ${levels[level]} ring-1 ring-white/5`}
              aria-label={`${day.sessions} learning sessions on ${day.activity_date}`}
            />
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
