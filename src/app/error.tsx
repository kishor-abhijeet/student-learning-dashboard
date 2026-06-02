"use client";

import { motion } from "framer-motion";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-6 text-slate-100">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-lg rounded-[2rem] p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10">
          <TriangleAlert className="h-7 w-7 text-red-300" />
        </div>
        <h1 className="text-2xl font-semibold text-white">Learning data is temporarily offline</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          The dashboard could not load courses from Supabase. Check the database connection and try again.
        </p>
        {error.digest ? <p className="mt-3 text-xs text-slate-500">Error digest: {error.digest}</p> : null}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-glow"
        >
          <RefreshCw className="h-4 w-4" />
          Retry dashboard
        </motion.button>
      </motion.section>
    </main>
  );
}
