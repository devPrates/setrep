export default function AppHome() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-sm px-6 text-center">
        <h1 className="text-2xl font-semibold">Boas-vindas 👋</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Área das alunas. Aqui você poderá ver seus treinos, registrar início e conclusão,
          mesmo offline.
        </p>
      </div>
    </main>
  );
}