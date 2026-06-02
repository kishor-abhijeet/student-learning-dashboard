import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#070A12",
        graphite: "#101521",
        ink: "#151A27",
        line: "rgba(148, 163, 184, 0.18)"
      },
      boxShadow: {
        glow: "0 0 42px rgba(99, 102, 241, 0.22)",
        "blue-glow": "0 0 36px rgba(59, 130, 246, 0.22)"
      },
      backgroundImage: {
        "mesh-radial":
          "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.32), transparent 32%), radial-gradient(circle at 86% 8%, rgba(56,189,248,0.2), transparent 30%), radial-gradient(circle at 50% 100%, rgba(14,165,233,0.14), transparent 36%)"
      }
    }
  },
  plugins: []
};

export default config;
