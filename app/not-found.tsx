import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-14 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        <SearchX className="mx-auto size-8 text-muted-foreground" aria-hidden />
        <h1 className="mt-3 text-2xl font-semibold">Página não encontrada</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Não encontramos o conteúdo que você procurou.
        </p>
        <div className="mt-5">
          <Button asChild>
            <Link href="/" aria-label="Voltar para a página inicial">
              Voltar para a página inicial
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}