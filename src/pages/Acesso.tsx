import { useEffect } from "react";

const Acesso = () => {
  useEffect(() => {
    document.title = "Acesso ao Hub | BlockURB";
    const meta = (document.querySelector('meta[name="description"]') as HTMLMetaElement) ?? (() => {
      const m = document.createElement('meta');
      m.name = 'description';
      document.head.appendChild(m);
      return m as HTMLMetaElement;
    })();
    meta.content = "Hub de painéis da BlockURB: acesso aos indicadores e operações.";

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href;
    document.head.appendChild(canonical);
    return () => {
      document.head.removeChild(canonical);
    };
  }, []);

  return (
    <main>
      <section className="container py-16">
        <h1 className="sr-only">Acesso ao Hub de Painéis</h1>
      </section>
    </main>
  );
};

export default Acesso;
