"use client";

import type { QuickAction } from "@/types/dashboard";
import { motion } from "framer-motion";
import { Bookmark, Download, PlayCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { spring, tileMotion } from "./BentoGrid";

const iconMap: Record<string, LucideIcon> = {
  Bookmark,
  Download,
  PlayCircle
};

export function QuickActions({
  title,
  actions
}: {
  title: string;
  actions: QuickAction[];
}) {
  return (
    <motion.article variants={tileMotion} className="glass-card rounded-3xl p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 space-y-3">
        {actions.map((action) => {
          const Icon = iconMap[action.icon_name] ?? PlayCircle;
          return (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-left text-sm font-medium text-slate-200"
            >
              <Icon className="h-5 w-5 text-sky-300" />
              {action.label}
            </motion.button>
          );
        })}
      </div>
    </motion.article>
  );
}
