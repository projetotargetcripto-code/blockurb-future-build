'use client'
import { useEffect, useState } from 'react'
import { getClient } from '@/lib/dataClient'

export default function DebugConnection() {
  const { supabase, isMock } = getClient()
  const [msg, setMsg] = useState('Carregando…')

  useEffect(() => {
    (async () => {
      if (isMock) { 
        setMsg('MODO MOCK ativo — sem Supabase real. Dados locais em uso.'); 
        return 
      }
      try {
        const { error } = await supabase.from('empreendimentos').select('id').limit(1)
        setMsg(error ? `REAL conectado, mas erro de consulta: ${error.message}` : 'REAL conectado — consulta OK.')
      } catch (e: any) {
        setMsg(`REAL conectado, mas erro: ${e?.message || 'Erro desconhecido'}`)
      }
    })()
  }, [supabase, isMock])

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white p-6">
      <h1 className="text-2xl font-semibold mb-2">Debug de Conexão</h1>
      <div className="rounded-xl border border-[#1E2A24] p-4">
        <div className="mb-2">
          Modo: {isMock ? 'MOCK 🔧' : 'REAL 🌐'}
        </div>
        <pre className="text-xs text-[#D1D5DB] whitespace-pre-wrap">{msg}</pre>
        
        {isMock && (
          <div className="mt-4 text-sm text-[#D1D5DB]">
            <p>Para ativar o modo REAL:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Configure NEXT_PUBLIC_SUPABASE_URL em Settings → Environment Variables</li>
              <li>Configure NEXT_PUBLIC_SUPABASE_ANON_KEY em Settings → Environment Variables</li>
              <li>Recarregue a página</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}