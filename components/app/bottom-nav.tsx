"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, CheckCircle, User } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactElement;
  isActive: (pathname: string) => boolean;
};

function IconHome(active: boolean) {
  return <Home className={active ? "text-sky-500" : "text-muted-foreground"} />
}

function IconList(active: boolean) {
  return <List className={active ? "text-sky-500" : "text-muted-foreground"} />
}

function IconCheck(active: boolean) {
  return <CheckCircle className={active ? "text-sky-500" : "text-muted-foreground"} />
}

function IconUser(active: boolean) {
  return <User className={active ? "text-sky-500" : "text-muted-foreground"} />
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
      <div className="w-full px-0 pb-0">
        <ul className="flex w-full items-center justify-between bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-2 border-t">
          {items.map((item) => {
            const active = item.isActive(pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={`group flex flex-col items-center gap-1 rounded-md px-3 py-1 text-xs transition-colors ${
                    active ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="transition-colors">
                    {item.icon(active)}
                  </span>
                  <span className={active ? "font-secondary font-bold text-primary" : "font-secondary font-bold text-muted-foreground"}>
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
