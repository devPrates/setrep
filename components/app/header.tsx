"use client";
import ThemeToggle from "@/components/app/theme-toggle";

export default function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-12 max-w-md items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary-foreground/20 ring-1 ring-primary-foreground/30" aria-hidden />
          <span className="text-sm font-semibold">Fernanda Personal</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle
            variant="ghost"
            className="size-8 bg-primary-foreground/20 hover:bg-primary-foreground/30 dark:bg-primary-foreground/25 dark:hover:bg-primary-foreground/35 ring-1 ring-primary-foreground/30 shadow-sm"
            iconClassName="text-white dark:text-white"
          />
        </div>
      </div>
    </header>
  );
}