import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/shared/contexts/auth-types";
import { useDocumentTitle } from "@/shared/hooks/use-document-title";
import { UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  useDocumentTitle("Criar Conta");
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (pass.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    // Simula tempo de rede
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = register(name, email, pass);
    if (success) {
      navigate("/watchlist", { replace: true });
    } else {
      setError("Este e-mail já está sendo utilizado por outra conta.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-md duration-500">
        <div className="overflow-hidden rounded-3xl bg-zinc-900/80 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl sm:p-10">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fuchsia-600 shadow-lg shadow-fuchsia-600/30">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white sm:text-3xl">
                Criar Conta
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Faça parte do melhor portal de animes
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 rounded-xl bg-red-500/10 p-4 text-sm text-red-500 ring-1 ring-red-500/20">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-300">
                  Seu Nome
                </label>
                <div className="relative">
                  <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Miguel"
                    className="w-full rounded-xl bg-zinc-950/50 py-3.5 pr-4 pl-12 text-white placeholder-zinc-500 ring-1 ring-white/10 transition-all focus:bg-zinc-950 focus:ring-fuchsia-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-300">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="w-full rounded-xl bg-zinc-950/50 py-3.5 pr-4 pl-12 text-white placeholder-zinc-500 ring-1 ring-white/10 transition-all focus:bg-zinc-950 focus:ring-fuchsia-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-300">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-zinc-950/50 py-3.5 pr-4 pl-12 text-white placeholder-zinc-500 ring-1 ring-white/10 transition-all focus:bg-zinc-950 focus:ring-fuchsia-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-fuchsia-600 px-4 py-4 font-bold text-white transition-all hover:bg-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Finalizar Cadastro"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-400">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-bold text-white hover:text-fuchsia-400 hover:underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
