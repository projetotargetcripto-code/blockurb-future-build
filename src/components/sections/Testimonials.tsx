import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

function TestimonialCard({ quote, name, role }: TestimonialProps) {
  return (
    <article className="p-6 rounded-lg border border-border bg-background card-hover h-full">
      <p className="text-sm">“{quote}”</p>
      <div className="mt-4 text-sm">
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground">{role}</div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <Section id="testemunhos">
      <Heading as="h3" className="text-xl sm:text-2xl">O que dizem os parceiros</Heading>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <TestimonialCard quote="Operação leve, processos claros e suporte 360°. Resultado em tempo recorde." name="Mariana S." role="Franqueada • MG" />
        <TestimonialCard quote="Tokenização parcial abriu um novo público e acelerou a captação." name="Rafael T." role="Investidor • SP" />
        <TestimonialCard quote="Transformamos a gleba em um projeto vendável com previsibilidade." name="João P." role="Terrenista • PR" />
      </div>
    </Section>
  );
}
