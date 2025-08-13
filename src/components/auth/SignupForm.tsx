import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface SignupFormProps {
  title: string;
  scope?: string | null;
}

export function SignupForm({ title, scope }: SignupFormProps) {
  const { register, handleSubmit } = useForm<{ name: string; email: string; password: string; confirm: string; terms: boolean }>();
  const [agreeError, setAgreeError] = useState<string | null>(null);

  const onSubmit = handleSubmit((data) => {
    if (!data.terms) { setAgreeError('Você deve aceitar os Termos para continuar.'); return; }
    // TODO: integrar Supabase signUp
    console.log('signup', { name: data.name, email: data.email, scope });
  });

  const preserve = scope ? `?scope=${encodeURIComponent(scope)}` : '';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold leading-tight">{title}</h1>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" placeholder="Seu nome" {...register('name')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="voce@empresa.com" {...register('email')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" autoComplete="new-password" placeholder="••••••••" {...register('password')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirmar senha</Label>
          <Input id="confirm" type="password" autoComplete="new-password" placeholder="••••••••" {...register('confirm')} />
        </div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" className="mt-0.5 accent-current" {...register('terms')} />
          <span> Aceito os <a className="story-link" href="#">Termos de Uso</a> e a <a className="story-link" href="#">Política de Privacidade</a>.</span>
        </label>
        {agreeError && <p className="text-sm text-destructive">{agreeError}</p>}
      </div>

      <Button type="submit" variant="cta" size="lg" className="w-full btn-glow active:scale-[0.99]">Criar conta</Button>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Já tem conta?</span>
        <a href={`/login${preserve}`} className="story-link">Entrar</a>
      </div>

      <div role="status" aria-live="polite" className="sr-only" />
    </form>
  );
}
