"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground">
      <path d="M21 12.79A9 9 0 1 1 11.21 3c.25 0 .5.02.74.04A7 7 0 1 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      const prefersDarkMq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      const prefersDark = prefersDarkMq?.matches ?? false;
      const effectiveMode = saved ? (saved === "dark" || saved === "light" ? (saved as "dark" | "light") : "system") : "system";
      if (!saved) {
        // Persistir padrão como 'system' para refletir a configuração do usuário
        localStorage.setItem("theme", "system");
      }
      setMode(effectiveMode);
      const useDark = effectiveMode === "system" ? prefersDark : effectiveMode === "dark";
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
      <Button variant="outline" size="icon-sm" aria-label="Trocar tema" disabled>
        <SunIcon />
      </Button>
    );
  }

  return (
    <Button variant="outline" size="icon-sm" aria-label="Trocar tema" onClick={toggle}>
      {dark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}