import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/dataClient";

export interface LoginFormProps {
  title: string;
  subtitle?: string;
  scope?: string | null;
  redirectPath?: string;
}

export function LoginForm({ title, subtitle, scope, redirectPath }: LoginFormProps) {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    const { data: res, error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
    if (error) { setError(error.message || "Falha ao entrar"); return; }
    if (res?.session) {
      navigate(redirectPath || "/admin");
    }
  });

  const preserve = scope ? `?scope=${encodeURIComponent(scope)}` : '';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold leading-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="voce@empresa.com" {...register('email')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input id="password" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••" {...register('password')} />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} className="absolute inset-y-0 right-2 inline-flex items-center justify-center px-2 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" variant="cta" size="lg" className="w-full btn-glow active:scale-[0.99]">Entrar</Button>

      {error && <div className="text-sm text-destructive" role="alert" aria-live="assertive">{error}</div>}

      <div className="text-sm text-muted-foreground">
        Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
        <a href={`/signup${preserve}`} className="story-link">Criar conta</a>
        <a href={`/reset${preserve}`} className="story-link">Esqueci minha senha</a>
      </div>

      <div role="status" aria-live="polite" className="sr-only" />
    </form>
  );
}
