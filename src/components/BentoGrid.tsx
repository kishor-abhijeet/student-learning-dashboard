"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8"
    >
      {children}
    </motion.div>
  );
}

export const tileMotion = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

export const spring = {
  type: "spring",
  stiffness: 300,
  damping: 20
} as const;
