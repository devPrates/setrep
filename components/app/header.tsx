"use client";
import ThemeToggle from "@/components/app/theme-toggle";

export default function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-12 max-w-md items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary/20 ring-1 ring-primary/30" aria-hidden />
          <span className="text-sm font-semibold">Fernanda Personal</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}