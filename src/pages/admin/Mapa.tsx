import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import L, { LatLngBoundsExpression, Layer } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { guessStatusStyle, mockFeatureCollection } from "@/utils/geo";

// Mock de empreendimentos
interface Emp {
  id: string;
  nome: string;
  stats: { lotes: number; vendidos: number; pct: number };
  bounds: { sw: [number, number]; ne: [number, number] };
  overlay?: { url: string; sw: [number, number]; ne: [number, number]; opacity?: number };
}

const EMPREENDIMENTOS: Emp[] = [
  {
    id: "alpha",
    nome: "Residencial Alpha",
    stats: { lotes: 120, vendidos: 36, pct: 30 },
    bounds: { sw: [-23.5492, -46.6409], ne: [-23.5465, -46.6365] },
    overlay: { url: "/placeholder/masterplan-demo.jpg", sw: [-23.5492, -46.6409], ne: [-23.5465, -46.6365], opacity: 0.7 },
  },
  {
    id: "beta",
    nome: "Parque Beta",
    stats: { lotes: 80, vendidos: 22, pct: 27 },
    bounds: { sw: [-23.553, -46.642], ne: [-23.548, -46.635] },
  },
  {
    id: "gamma",
    nome: "Jardins Gamma",
    stats: { lotes: 200, vendidos: 120, pct: 60 },
    bounds: { sw: [-23.560, -46.650], ne: [-23.552, -46.640] },
    overlay: { url: "/placeholder/masterplan-demo.jpg", sw: [-23.560, -46.650], ne: [-23.552, -46.640], opacity: 0.6 },
  },
];

function SidebarEmpreendimentos({ onSelect, activeId }: { onSelect: (e: Emp) => void; activeId?: string; }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("todos");
  const [periodo, setPeriodo] = useState("7");

  const filtered = useMemo(() => {
    return EMPREENDIMENTOS.filter(e => e.nome.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <aside className="rounded-[14px] border border-border bg-secondary/60 p-3 h-full flex flex-col">
      <h2 className="text-sm font-semibold mb-2">Empreendimentos</h2>
      <div className="space-y-2">
        <Input placeholder="Buscar por nome" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar empreendimento" />
        <div className="grid grid-cols-2 gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent className="z-[60] bg-background">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="disponivel">Disponível</SelectItem>
              <SelectItem value="reservado">Reservado</SelectItem>
              <SelectItem value="vendido">Vendido</SelectItem>
            </SelectContent>
          </Select>
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80"><SelectValue placeholder="Período" /></SelectTrigger>
            <SelectContent className="z-[60] bg-background">
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="mt-3 flex-1">
        <div className="space-y-2 pr-1">
          {filtered.map((e) => (
            <button
              key={e.id}
              onClick={() => onSelect(e)}
              className={cn("w-full text-left rounded-md border border-border p-3 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary", activeId===e.id && "ring-2 ring-primary")}
              aria-pressed={activeId===e.id}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{e.nome}</div>
                <a href={`/admin?empreendimento=${e.id}`} onClick={(ev)=>ev.stopPropagation()} className="text-xs text-primary underline">Abrir no painel</a>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary">{e.stats.lotes} lotes</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent">{e.stats.vendidos} vendidos</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-foreground/80">{e.stats.pct}%</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <footer className="pt-3 border-t border-border mt-3 text-xs text-muted-foreground">
        Legenda: <span className="text-[10px] ml-2">Disponível</span> <span className="inline-block w-3 h-3 bg-[#00C26E] rounded-sm align-middle" />
        <span className="text-[10px] ml-2">Reservado</span> <span className="inline-block w-3 h-3 bg-[#EAB308] rounded-sm align-middle" />
        <span className="text-[10px] ml-2">Vendido</span> <span className="inline-block w-3 h-3 bg-[#EF4444] rounded-sm align-middle" />
      </footer>
    </aside>
  );
}

function MapView({
  selected,
}: { selected?: Emp }) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [base, setBase] = useState<'esri'|'osm'>('esri');
  const [showLots, setShowLots] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [opacity, setOpacity] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [lotsLayer, setLotsLayer] = useState<Layer | null>(null);
  const [overlayLayer, setOverlayLayer] = useState<Layer | null>(null);

  // Initialize map
  useEffect(() => {
    const container = document.getElementById('leaflet-map-int');
    if (map || !container) return;
    const m = L.map(container, {
      zoomControl: true,
      center: [-23.5489, -46.6388],
      zoom: 13,
    });
    setMap(m);
    return () => { m.remove(); };
  }, [map]);

  // Base layers
  useEffect(() => {
    if (!map) return;
    const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri' });
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' });

    const chosen = base === 'esri' ? esri : osm;
    chosen.addTo(map);

    return () => { map.removeLayer(chosen); };
  }, [map, base]);

  // When selected empreend changes, load data and fit bounds
  useEffect(() => {
    if (!map || !selected) return;
    const bounds: LatLngBoundsExpression = [selected.bounds.sw, selected.bounds.ne];
    map.fitBounds(bounds, { padding: [20,20] });

    // loading state
    setLoading(true);
    const timer = setTimeout(() => {
      // Load mock geojson
      const fc = mockFeatureCollection();
      const layer = L.geoJSON(fc as any, {
        style: (feat: any) => guessStatusStyle(feat?.properties?.status),
        onEachFeature: (feat, lyr) => {
          const p: any = feat.properties || {};
          const html = `<div class="text-xs"><div><strong>${p.codigo ?? 'Lote'}</strong></div><div>Status: ${p.status ?? '—'}</div>${p.area ? `<div>Área: ${p.area} m²</div>`:''}${p.preco ? `<div>Preço: R$ ${p.preco}</div>`:''}</div>`;
          (lyr as any).bindPopup(html);
        },
      });
      if (lotsLayer) map.removeLayer(lotsLayer);
      setLotsLayer(layer);
      if (showLots) layer.addTo(map);

      // Overlay
      if (overlayLayer) { map.removeLayer(overlayLayer); setOverlayLayer(null); }
      if (selected.overlay && showOverlay) {
        const img = L.imageOverlay(selected.overlay.url, [selected.overlay.sw, selected.overlay.ne] as any, { opacity: selected.overlay.opacity ?? opacity });
        img.addTo(map);
        setOverlayLayer(img);
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, selected]);

  // Toggle showLots
  useEffect(() => {
    if (!map || !lotsLayer) return;
    if (showLots) lotsLayer.addTo(map); else map.removeLayer(lotsLayer);
  }, [map, lotsLayer, showLots]);

  // Overlay visibility and opacity changes
  useEffect(() => {
    if (!map) return;
    if (overlayLayer) {
      if (showOverlay) (overlayLayer as any).addTo(map); else map.removeLayer(overlayLayer);
      if ((overlayLayer as any).setOpacity) (overlayLayer as any).setOpacity(opacity);
    } else if (selected?.overlay && showOverlay) {
      const img = L.imageOverlay(selected.overlay.url, [selected.overlay.sw, selected.overlay.ne] as any, { opacity });
      img.addTo(map);
      setOverlayLayer(img);
    }
  }, [map, showOverlay, opacity, selected, overlayLayer]);

  const clearSelection = () => {
    setLoading(false);
    if (lotsLayer && map) map.removeLayer(lotsLayer);
    if (overlayLayer && map) map.removeLayer(overlayLayer);
  };

  return (
    <div className="relative h-[60vh] lg:h-[calc(100vh-180px)] rounded-[14px] border border-border bg-secondary/60 overflow-hidden">
      <div id="leaflet-map-int" className="absolute inset-0" />

      {/* Topbar flutuante */}
      <div className="absolute left-3 top-3 z-40 rounded-md border border-border bg-background/90 backdrop-blur p-3 shadow">
        <div className="grid grid-cols-2 lg:flex lg:items-center gap-2">
          <div className="min-w-[160px]">
            <Select value={base} onValueChange={(v: any)=>setBase(v)}>
              <SelectTrigger className="h-9 bg-background/90"><SelectValue placeholder="Base Map" /></SelectTrigger>
              <SelectContent className="z-[60] bg-background">
                <SelectItem value="esri">Esri World Imagery</SelectItem>
                <SelectItem value="osm">OpenStreetMap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <label className="inline-flex items-center gap-2 text-sm"><Checkbox checked={showLots} onCheckedChange={(v)=>setShowLots(Boolean(v))}/> Mostrar lotes</label>
          <label className="inline-flex items-center gap-2 text-sm"><Checkbox checked={showOverlay} onCheckedChange={(v)=>setShowOverlay(Boolean(v))}/> Mostrar masterplan</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Opacidade</span>
            <div className="w-[120px]">
              <Slider min={0.2} max={1} step={0.05} value={[opacity]} onValueChange={(v)=>setOpacity(v[0])} />
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={clearSelection}>Limpar seleção</Button>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-background/40">
          <div className="h-8 w-8 rounded-full border-2 border-accent/40 border-t-accent animate-spin" aria-label="Carregando" />
        </div>
      )}

      {!selected && !loading && (
        <div className="absolute inset-0 z-20 grid place-items-center pointer-events-none">
          <div className="rounded-md bg-background/90 border border-border px-4 py-2 text-sm text-muted-foreground">Selecione um empreendimento à esquerda para visualizar no mapa.</div>
        </div>
      )}
    </div>
  );
}

export default function AdminMapa() {
  const [active, setActive] = useState<Emp | undefined>(undefined);
  
  useEffect(() => { 
    document.title = `Mapa Interativo | BlockURB`; 
  }, []);

  return (
    <Protected>
      <AppShell menuKey="adminfilial" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admin' }, { label: 'Mapa Interativo' }]}> 
        <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] items-start">
          <div className="h-full">
            <SidebarEmpreendimentos onSelect={setActive} activeId={active?.id} />
          </div>
          <div>
            <MapView selected={active} />
          </div>
        </div>
      </AppShell>
    </Protected>
  );
}
