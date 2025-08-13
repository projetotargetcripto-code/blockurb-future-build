import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface ResetFormProps {
  scope?: string | null;
}

export function ResetForm({ scope }: ResetFormProps) {
  const { register, handleSubmit } = useForm<{ email: string }>();

  const onSubmit = handleSubmit((data) => {
    // TODO: integrar Supabase resetPasswordForEmail
    console.log('reset', { email: data.email, scope });
  });

  const preserve = scope ? `?scope=${encodeURIComponent(scope)}` : '';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold leading-tight">Recuperar senha</h1>
        <p className="mt-1 text-sm text-muted-foreground">Informe seu e-mail para envio do link de recuperação.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="voce@empresa.com" {...register('email')} />
        </div>
      </div>

      <Button type="submit" variant="cta" size="lg" className="w-full btn-glow active:scale-[0.99]">Enviar link de recuperação</Button>

      <p className="text-sm text-muted-foreground">
        Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.
      </p>

      <div className="text-right text-sm">
        <a href={`/login${preserve}`} className="story-link">Voltar ao login</a>
      </div>

      <div role="status" aria-live="polite" className="sr-only" />
    </form>
  );
}
