"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactElement;
  isActive: (pathname: string) => boolean;
};

function IconHome(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={active ? "text-sky-500" : "text-muted-foreground"}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5h-4v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IconList(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={active ? "text-sky-500" : "text-muted-foreground"}>
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function IconDumbbell(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={active ? "text-sky-500" : "text-muted-foreground"}>
      <rect x="2" y="9" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="19" y="9" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="7" y="10" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function IconCheck(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={active ? "text-sky-500" : "text-muted-foreground"}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function IconUser(active: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={active ? "text-sky-500" : "text-muted-foreground"}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  const items: NavItem[] = [
    {
      href: "/app",
      label: "Início",
      icon: IconHome,
      isActive: (p) => p === "/app" || p === "/app/",
    },
    {
      href: "/app/treinos",
      label: "Treinos",
      icon: IconList,
      isActive: (p) => p.startsWith("/app/treinos"),
    },
    {
      href: "/app/exercicios",
      label: "Exercícios",
      icon: IconDumbbell,
      isActive: (p) => p.startsWith("/app/exercicios"),
    },
    {
      href: "/app/registros",
      label: "Registros",
      icon: IconCheck,
      isActive: (p) => p.startsWith("/app/registros"),
    },
    {
      href: "/app/perfil",
      label: "Perfil",
      icon: IconUser,
      isActive: (p) => p.startsWith("/app/perfil"),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-md px-4 pb-2">
        <ul className="flex items-center justify-between rounded-lg border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-1.5 shadow-lg">
          {items.map((item) => {
            const active = item.isActive(pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={`group flex flex-col items-center gap-1 rounded-md px-3 py-1 text-xs transition-colors ${
                    active ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <span className="transition-colors group-hover:text-foreground">
                    {item.icon(active)}
                  </span>
                  <span className={active ? "font-medium text-primary" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}