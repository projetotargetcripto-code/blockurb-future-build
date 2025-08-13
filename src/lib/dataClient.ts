import { createClient, SupabaseClient } from '@supabase/supabase-js'

type SupaLike = {
  auth: {
    getSession: () => Promise<{ data:{ session:any }, error:null|any }>
    onAuthStateChange: (fn:any) => { data:{ subscription:{ unsubscribe:()=>void } } }
    signInWithPassword: (p:{email:string,password:string}) => Promise<{ data:any, error:any }>
    signUp: (p:{email:string,password:string,options?:any}) => Promise<{ data:any, error:any }>
    resetPasswordForEmail: (email:string, opts?:any) => Promise<{ data:any, error:any }>
    signOut: () => Promise<{ error:any }>
  },
  from: (table:string) => any,
  rpc: (fn:string, args?:any) => Promise<{ data:any, error:any }>,
  storage: {
    from: (bucket:string) => {
      upload: (path:string, file:File|Blob, opts?:any)=>Promise<{ data:any, error:any }>,
      getPublicUrl?: (path:string)=>{ data:{ publicUrl:string } },
      createSignedUrl?: (path:string, seconds:number)=>Promise<{ data:any, error:any }>
    }
  }
}

const FORCE_MOCK = false; // mude para true se quiser forçar mock mesmo com env

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ---- MOCK DATA (mínimo vital)
const mockDB = {
  session: null as any,
  users: [] as {email:string; password:string; name?:string}[],
  empreendimentos: [
    { id:'emp-001', nome:'Itaboraí Usina (Mock)', created_at: new Date().toISOString(),
      bounds: { sw:{lat:-22.8200,lng:-42.8000}, ne:{lat:-22.8190,lng:-42.7985} },
      overlay: null as null | { image_path:string, opacity:number }
    },
    { id:'emp-002', nome:'Residencial Alpha (Mock)', created_at: new Date().toISOString(),
      bounds: { sw:{lat:-23.5492,lng:-46.6409}, ne:{lat:-23.5465,lng:-46.6365} },
      overlay: { image_path:'masterplans/emp-002.jpg', opacity:0.7 }
    },
    { id:'emp-003', nome:'Parque Beta (Mock)', created_at: new Date().toISOString(),
      bounds: { sw:{lat:-23.553,lng:-46.642}, ne:{lat:-23.548,lng:-46.635} },
      overlay: null
    },
  ],
  lotesByEmp: {
    'emp-001': {
      type:'FeatureCollection',
      features:[
        { type:'Feature', properties:{ codigo:'A01', status:'disponivel', preco:120000, area_m2:250 },
          geometry:{ type:'Polygon', coordinates:[[
            [-42.80,-22.82],[-42.7995,-22.82],[-42.7995,-22.8195],[-42.80,-22.8195],[-42.80,-22.82]
          ]]}}
      ]
    },
    'emp-002': {
      type:'FeatureCollection',
      features:[
        { type:'Feature', properties:{ codigo:'B01', status:'disponivel', preco:180000, area_m2:300 },
          geometry:{ type:'Polygon', coordinates:[[
            [-46.6409,-23.5492],[-46.6405,-23.5492],[-46.6405,-23.5490],[-46.6409,-23.5490],[-46.6409,-23.5492]
          ]]}},
        { type:'Feature', properties:{ codigo:'B02', status:'vendido', preco:175000, area_m2:280 },
          geometry:{ type:'Polygon', coordinates:[[
            [-46.6405,-23.5492],[-46.6400,-23.5492],[-46.6400,-23.5490],[-46.6405,-23.5490],[-46.6405,-23.5492]
          ]]}}
      ]
    },
    'emp-003': {
      type:'FeatureCollection',
      features:[
        { type:'Feature', properties:{ codigo:'C01', status:'reservado', preco:160000, area_m2:320 },
          geometry:{ type:'Polygon', coordinates:[[
            [-46.642,-23.553],[-46.641,-23.553],[-46.641,-23.552],[-46.642,-23.552],[-46.642,-23.553]
          ]]}}
      ]
    }
  }
}

function makeMock(): SupaLike {
  return {
    auth: {
      getSession: async ()=>({ data:{ session: mockDB.session }, error:null }),
      onAuthStateChange: (fn:any)=>({ data:{ subscription:{ unsubscribe(){} } } }),
      signInWithPassword: async ({email,password})=>{
        const ok = mockDB.users.find(u=>u.email===email && u.password===password)
        if(!ok) return { data:null, error:{ message:'Credenciais inválidas (mock)' } }
        mockDB.session = { user:{ email } }
        return { data:{ session: mockDB.session }, error:null }
      },
      signUp: async ({email,password,options})=>{
        mockDB.users.push({ email, password, name: options?.data?.full_name })
        mockDB.session = { user:{ email } }
        return { data:{ user:{ email } }, error:null }
      },
      resetPasswordForEmail: async ()=>({ data:{}, error:null }),
      signOut: async ()=>{ mockDB.session=null; return { error:null } }
    },
    from: (table:string)=>{
      return {
        select: (cols?: string) => {
          if(table==='empreendimentos'){ 
            return { 
              data: mockDB.empreendimentos, 
              error:null,
              order: (col: string, opts?: any) => ({ data: mockDB.empreendimentos, error:null }),
              limit: (n: number) => ({ data: mockDB.empreendimentos.slice(0, n), error:null })
            } 
          }
          return { data:[], error:null }
        },
        eq: (col: string, val: any) => ({
          maybeSingle: async () => {
            if(table==='masterplan_overlays'){
              const emp = mockDB.empreendimentos.find(e => e.id === val)
              if(emp?.overlay) {
                return { 
                  data: { 
                    image_path: emp.overlay.image_path, 
                    bounds: { coordinates: [[
                      [emp.bounds.sw.lng, emp.bounds.sw.lat],
                      [emp.bounds.ne.lng, emp.bounds.sw.lat],
                      [emp.bounds.ne.lng, emp.bounds.ne.lat],
                      [emp.bounds.sw.lng, emp.bounds.ne.lat],
                      [emp.bounds.sw.lng, emp.bounds.sw.lat]
                    ]] },
                    opacity: emp.overlay.opacity 
                  }, 
                  error: null 
                }
              }
            }
            return { data: null, error: null }
          }
        }),
        limit: (n: number) => ({ 
          select: async () => ({ data: mockDB.empreendimentos.slice(0, n), error:null }) 
        })
      }
    },
    rpc: async (fn:string, args:any)=>{
      if(fn==='lotes_geojson' && args?.p_empreendimento){
        return { data: mockDB.lotesByEmp[args.p_empreendimento] || {type:'FeatureCollection',features:[]}, error:null }
      }
      if(fn==='create_empreendimento_from_geojson'){
        const id = 'emp-'+Math.random().toString(36).slice(2,7)
        mockDB.empreendimentos.unshift({
          id, nome: args.p_nome || 'Novo Empreendimento (Mock)', created_at:new Date().toISOString(),
          bounds: args.p_sw_lat? { sw:{lat:args.p_sw_lat,lng:args.p_sw_lng}, ne:{lat:args.p_ne_lat,lng:args.p_ne_lng} } : undefined,
          overlay: args.p_overlay_path? { image_path: args.p_overlay_path, opacity: 0.7 } : null
        } as any)
        mockDB.lotesByEmp[id] = args.p_geojson || { type:'FeatureCollection', features:[] }
        return { data: id, error:null }
      }
      if(fn==='add_masterplan_overlay'){
        const emp = mockDB.empreendimentos.find(e=>e.id===args.p_empreendimento)
        if(emp){ (emp as any).overlay = { image_path: args.p_image_path, opacity: args.p_opacity ?? 0.7 } }
        return { data: true, error:null }
      }
      return { data:null, error:{ message:'RPC não mockada: '+fn } }
    },
    storage: {
      from: (_bucket:string)=>({
        upload: async ()=>({ data:{ path:'mock-file' }, error:null }),
        getPublicUrl: (path:string)=>({ data:{ publicUrl: '/'+path } }),
        createSignedUrl: async (path:string)=>({ data:{ signedUrl: '/'+path+'?signed=1' }, error:null })
      })
    }
  }
}

export function getClient(): { supabase: SupaLike | SupabaseClient, isMock: boolean } {
  const useReal = !FORCE_MOCK && !!url && !!anon
  if(useReal){
    const client = createClient(url!, anon!, { auth:{ persistSession:true, autoRefreshToken:true } })
    return { supabase: client, isMock:false }
  }
  console.warn('⚠️ Rodando em MODO MOCK (sem SUPABASE_URL/ANON_KEY).')
  return { supabase: makeMock(), isMock:true }
}