import { useContent } from "@/lib/content";
import { TimelineCardView } from "./TimelineCardView";

export function Timeline() {
  const [content] = useContent();

  return (
    <section id="timeline" className="relative py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="font-hand text-clay text-2xl mb-2">our little timeline</div>
        <h2 className="text-4xl sm:text-5xl">moments that feel like you</h2>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Center line on desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-clay/40 to-transparent -translate-x-1/2" />

        <div className="flex flex-col">
          {content.cards.map((c, i) => (
            <TimelineCardView key={c.id} card={c} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
      </div>
    </section>
  );
}
