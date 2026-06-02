"use client";

import type { Course } from "@/types/course";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { spring, tileMotion } from "./BentoGrid";

const iconMap: Record<string, LucideIcon> = {
  Atom: Icons.Atom,
  Network: Icons.Network,
  ServerCog: Icons.ServerCog,
  Braces: Icons.Braces,
  BookOpen: Icons.BookOpen,
  Code2: Icons.Code2
};

export function CourseCard({
  course,
  buttonLabel
}: {
  course: Course;
  buttonLabel: string;
}) {
  const Icon = iconMap[course.icon_name] ?? Icons.BookOpenCheck;

  return (
    <motion.article
      variants={tileMotion}
      whileHover={{ scale: 1.02 }}
      transition={spring}
      className="group glass-card relative overflow-hidden rounded-3xl p-5"
    >
      <div className="absolute inset-0 bg-mesh-radial opacity-55" />
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-0 shadow-blue-glow transition-opacity group-hover:opacity-100"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-sky-200">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-slate-200">
            {course.progress}%
          </span>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-white">{course.title}</h3>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10" aria-label={`${course.progress}% complete`}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={spring}
          className="mt-6 w-full rounded-2xl border border-indigo-300/20 bg-indigo-500/16 px-4 py-3 text-sm font-semibold text-indigo-100"
          type="button"
        >
          {buttonLabel}
        </motion.button>
      </div>
    </motion.article>
  );
}
