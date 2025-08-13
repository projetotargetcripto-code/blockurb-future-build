// Safe Supabase client with mock fallback
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;
let warned = false;

function readEnv(key: string): string | undefined {
  // Vite envs use import.meta.env; accept NEXT_ keys too for compatibility
  const env: any = (import.meta as any).env || {};
  return env[key] || env[`VITE_${key}`] || env[`NEXT_PUBLIC_${key}`];
}

export function getSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = readEnv("SUPABASE_URL");
  const anonKey = readEnv("SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    if (!warned) {
      console.warn(
        "[BlockURB] Supabase desativado: variáveis de ambiente ausentes. Usando client mock para desenvolvimento."
      );
      warned = true;
    }
    const mock: any = {
      auth: {
        async getSession() { return { data: { session: null }, error: null }; },
        onAuthStateChange(_cb: any) {
          return { data: { subscription: { unsubscribe(){} } } } as const;
        },
        async signInWithPassword() { return { data: null, error: { message: "Env vars ausentes" } } as const; },
        async signUp() { return { data: null, error: { message: "Env vars ausentes" } } as const; },
        async resetPasswordForEmail() { return { data: null, error: { message: "Env vars ausentes" } } as const; },
        async signOut() { return { error: null } as const; },
      }
    };
    cached = mock as SupabaseClient;
    return cached;
  }

  cached = createClient(url, anonKey);
  return cached;
}

const supabase = getSupabase();
export default supabase;
