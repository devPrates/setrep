export default function DashboardHome() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-sm px-6 text-center">
        <h1 className="text-2xl font-semibold">Painel do Personal</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Boas-vindas! Gerencie alunas, exercícios e treinos com agilidade.
        </p>
      </div>
    </main>
  );
}