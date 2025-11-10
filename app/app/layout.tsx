import type { Metadata } from "next";
import BottomNav from "@/components/app/bottom-nav";
import AppHeader from "@/components/app/header";

export const metadata: Metadata = {
  title: "Área da aluna — Fernanda Personal",
};

export default function AlunaLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-dvh pb-20 pt-14">
      <AppHeader />
      {children}
      <BottomNav />
    </section>
  );
}