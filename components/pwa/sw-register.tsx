"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function SWRegister() {
  const [offline, setOffline] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      } else {
        // Em desenvolvimento, evitar SW para não interferir em SSR/HMR
        navigator.serviceWorker
          .getRegistrations()
          .then((regs) => regs.forEach((reg) => reg.unregister()))
          .catch(() => {});
        if (typeof window !== "undefined" && "caches" in window) {
          window.caches
            .keys()
            .then((keys) =>
              Promise.all(
                keys.map((key) =>
                  key.startsWith("fernanda-personal-") || key.startsWith("setrep-")
                    ? window.caches.delete(key)
                    : Promise.resolve(null)
                )
              )
            )
            .catch(() => {});
        }
      }
    }
    const onOffline = () => setOffline(true);
    const onOnline = () => setOffline(false);
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };
    const onAppInstalled = () => {
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    setOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    try {
      await deferredPrompt.userChoice;
    } finally {
      setCanInstall(false);
      setDeferredPrompt(null);
    }
  }

  return (
    <>
      {offline && (
        <div className="fixed bottom-4 right-4 rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground shadow-sm">
          Modo offline — alterações serão sincronizadas quando reconectar
        </div>
      )}
      {canInstall && (
        <Button onClick={handleInstall} className="fixed bottom-4 left-4">
          Instalar app
        </Button>
      )}
    </>
  );
}