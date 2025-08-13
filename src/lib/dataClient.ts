import { createClient } from '@supabase/supabase-js'

// Função para obter env de forma compatível com Lovable e Cursor
const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key]
  }
  // @ts-ignore - suporte Lovable window.__ENV__
  if (typeof window !== 'undefined' && (window as any).__ENV__ && (window as any).__ENV__[key]) {
    return (window as any).__ENV__[key]
  }
  return undefined
}

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL') || ''
const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || ''

// Aviso se variáveis não definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  )
}

// Cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})