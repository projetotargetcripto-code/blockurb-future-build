import { useEffect } from "react";

const Whitepaper = () => {
  useEffect(() => {
    document.title = "Whitepaper | BlockURB";
    const meta = (document.querySelector('meta[name="description"]') as HTMLMetaElement) ?? (() => {
      const m = document.createElement('meta');
      m.name = 'description';
      document.head.appendChild(m);
      return m as HTMLMetaElement;
    })();
    meta.content = "Whitepaper do projeto BlockURB: visão, arquitetura e modelo.";

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
        <h1 className="sr-only">Whitepaper BlockURB</h1>
      </section>
    </main>
  );
};

export default Whitepaper;
