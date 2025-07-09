import type { Config } from "tailwindcss";

function withOpacityValue(variable: string) {
  return ({ opacityValue, opacityVariable }: any) => {
    if (opacityValue !== undefined) {
      return `hsl(var(${variable}) / ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `hsl(var(${variable}) / var(${opacityVariable}))`;
    }
    return `hsl(var(${variable}))`;
  };
}

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: withOpacityValue("--background"),
        foreground: withOpacityValue("--foreground"),
        border: withOpacityValue("--border"),
        input: withOpacityValue("--input"),
        ring: withOpacityValue("--ring"),
        card: {
          DEFAULT: withOpacityValue("--card"),
          foreground: withOpacityValue("--card-foreground"),
        },
        popover: {
          DEFAULT: withOpacityValue("--popover"),
          foreground: withOpacityValue("--popover-foreground"),
        },
        primary: {
          DEFAULT: withOpacityValue("--primary"),
          foreground: withOpacityValue("--primary-foreground"),
        },
        secondary: {
          DEFAULT: withOpacityValue("--secondary"),
          foreground: withOpacityValue("--secondary-foreground"),
        },
        muted: {
          DEFAULT: withOpacityValue("--muted"),
          foreground: withOpacityValue("--muted-foreground"),
        },
        accent: {
          DEFAULT: withOpacityValue("--accent"),
          foreground: withOpacityValue("--accent-foreground"),
        },
        destructive: {
          DEFAULT: withOpacityValue("--destructive"),
          foreground: withOpacityValue("--destructive-foreground"),
        },
        chart: {
          1: withOpacityValue("--chart-1"),
          2: withOpacityValue("--chart-2"),
          3: withOpacityValue("--chart-3"),
          4: withOpacityValue("--chart-4"),
          5: withOpacityValue("--chart-5"),
        },
        sidebar: {
          DEFAULT: withOpacityValue("--sidebar-background"),
          foreground: withOpacityValue("--sidebar-foreground"),
          primary: withOpacityValue("--sidebar-primary"),
          "primary-foreground": withOpacityValue("--sidebar-primary-foreground"),
          accent: withOpacityValue("--sidebar-accent"),
          "accent-foreground": withOpacityValue("--sidebar-accent-foreground"),
          border: withOpacityValue("--sidebar-border"),
          ring: withOpacityValue("--sidebar-ring"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  
  plugins: [],
};

export default config;
