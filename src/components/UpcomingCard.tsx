"use client";

import type { UpcomingEvent } from "@/types/dashboard";
import { motion } from "framer-motion";
import { CalendarClock, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { tileMotion } from "./BentoGrid";

const iconMap: Record<string, LucideIcon> = {
  CalendarClock,
  Video
};

export function UpcomingCard({
  title,
  events
}: {
  title: string;
  events: UpcomingEvent[];
}) {
  return (
    <motion.article variants={tileMotion} className="glass-card rounded-3xl p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <CalendarClock className="h-5 w-5 text-indigo-200" />
      </div>
      <div className="mt-4 space-y-3">
        {events.map((event) => {
          const Icon = iconMap[event.icon_name] ?? Video;

          return (
          <div key={event.id} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/14">
              <Icon className="h-4 w-4 text-indigo-200" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{event.title}</p>
              <p className="mt-1 text-xs text-slate-400">{event.event_time}</p>
            </div>
          </div>
          );
        })}
      </div>
    </motion.article>
  );
}
