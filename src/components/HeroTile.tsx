"use client";

import type { DashboardProfile } from "@/types/dashboard";
import { motion } from "framer-motion";
import { BookMarked, Flame, Sparkles, TrendingUp } from "lucide-react";
import { spring, tileMotion } from "./BentoGrid";

type HeroTileProps = {
  profile: DashboardProfile;
  labels: {
    streak: string;
    activeCourses: string;
    averageProgress: string;
    streakSuffix: string;
  };
  streak: number;
  activeCourses: number;
  averageProgress: number;
};

const summaryConfig = [
  { icon: Flame, keyName: "streak" },
  { icon: BookMarked, keyName: "activeCourses" },
  { icon: TrendingUp, keyName: "averageProgress" }
] as const;

export function HeroTile({
  profile,
  labels,
  streak,
  activeCourses,
  averageProgress
}: HeroTileProps) {
  const values = {
    streak: `${streak} ${labels.streakSuffix}`,
    activeCourses: `${activeCourses}`,
    averageProgress: `${averageProgress}%`
  };
  const labelValues = {
    streak: labels.streak,
    activeCourses: labels.activeCourses,
    averageProgress: labels.averageProgress
  };

  return (
    <motion.article
      variants={tileMotion}
      whileHover={{ scale: 1.005 }}
      transition={spring}
      className="glass-card relative overflow-hidden rounded-[2rem] p-6 shadow-glow sm:p-8"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-mesh-radial"
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-40" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-2 text-sm text-sky-200">
            <Sparkles className="h-4 w-4" />
            {profile.eyebrow}
          </div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
            {profile.welcome_label}, {profile.student_name}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            {profile.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {summaryConfig.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.keyName} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">{labelValues[item.keyName]}</span>
                  <Icon className="h-4 w-4 text-sky-300" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{values[item.keyName]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
