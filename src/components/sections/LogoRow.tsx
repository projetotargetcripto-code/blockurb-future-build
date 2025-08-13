import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export function LogoRowSection() {
  return (
    <Section id="logos">
      <div className="flex flex-col gap-6">
        <Heading as="h3" className="text-center text-xl sm:text-2xl">Parcerias e mídias</Heading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md border border-border bg-background/60 flex items-center justify-center text-xs text-muted-foreground">
              Logo {i + 1}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
