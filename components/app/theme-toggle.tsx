"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

type ThemeToggleProps = {
  className?: string;
  iconClassName?: string;
  variant?: "outline" | "ghost";
};

export default function ThemeToggle({ className, iconClassName, variant = "outline" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState<"light" | "dark" | "system">("light");

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      const prefersDarkMq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      const effectiveMode = saved ? (saved === "dark" || saved === "light" ? (saved as "dark" | "light") : "system") : "light";
      if (!saved) {
        // Padrão: claro
        localStorage.setItem("theme", "light");
      }
      setMode(effectiveMode);
      const useDark = effectiveMode === "dark";
      setDark(useDark);
      document.documentElement.classList.toggle("dark", useDark);

      // Se estiver em 'system', reagir a mudanças do SO
      const listener = (e: MediaQueryListEvent) => {
        if (localStorage.getItem("theme") === "system") {
          const nextDark = e.matches;
          setDark(nextDark);
          document.documentElement.classList.toggle("dark", nextDark);
        }
      };
      prefersDarkMq?.addEventListener?.("change", listener);
      return () => {
        prefersDarkMq?.removeEventListener?.("change", listener);
      };
    } catch (_) {
      // ignore
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
      setMode(next ? "dark" : "light");
    } catch (_) {}
    document.documentElement.classList.toggle("dark", next);
  }

  if (!mounted) {
    // Evitar mismatch de hidratação: não renderiza conteúdo dinâmico até montar
    return (
      <Button variant={variant} size="icon-sm" aria-label="Trocar tema" disabled className={className}>
        <Sun className={iconClassName} />
      </Button>
    );
  }

  return (
    <Button variant={variant} size="icon-sm" aria-label="Trocar tema" onClick={toggle} className={className}>
      {dark ? <Sun className={iconClassName} /> : <Moon className={iconClassName} />}
    </Button>
  );
}
