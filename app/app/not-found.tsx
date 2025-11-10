import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-10 text-center">
      <SearchX className="mx-auto size-8 text-muted-foreground" aria-hidden />
      <h1 className="mt-3 text-2xl font-semibold">Página não encontrada</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Não encontramos o conteúdo que você procurou.
      </p>
      <div className="mt-5">
        <Button asChild>
          <Link href="/app/treinos" aria-label="Voltar para Meus treinos">
            Voltar aos treinos
          </Link>
        </Button>
      </div>
    </div>
  );
}