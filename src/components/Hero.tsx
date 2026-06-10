import { useContent } from "@/lib/content";
import { Heart, Sparkles, Star } from "lucide-react";

export function Hero() {
  const [content] = useContent();

  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Floating polaroid frames */}
      <div
        className="hidden md:block absolute top-20 left-12 w-32 h-40 polaroid animate-float opacity-80"
        style={{ ["--r" as any]: "-8deg", transform: "rotate(-8deg)" }}
      >
        <div className="w-full h-24 rounded-sm bg-gradient-to-br from-rose/40 to-clay/30" />
        <div className="font-hand text-clay text-sm text-center mt-2">us ♡</div>
      </div>
      <div
        className="hidden md:block absolute top-32 right-16 w-32 h-40 polaroid animate-float opacity-80"
        style={{ ["--r" as any]: "10deg", transform: "rotate(10deg)", animationDelay: "1.5s" }}
      >
        <div className="w-full h-24 rounded-sm bg-gradient-to-br from-sage/50 to-rose/30" />
        <div className="font-hand text-clay text-sm text-center mt-2">always</div>
      </div>
      <div
        className="hidden lg:block absolute bottom-24 left-24 w-28 h-36 polaroid animate-float opacity-70"
        style={{ ["--r" as any]: "6deg", transform: "rotate(6deg)", animationDelay: "0.8s" }}
      >
        <div className="w-full h-20 rounded-sm bg-gradient-to-br from-clay/40 to-sage/30" />
        <div className="font-hand text-clay text-xs text-center mt-2">a chapter</div>
      </div>

      <Sparkles className="absolute top-1/4 right-1/4 w-5 h-5 text-rose animate-twinkle" />
      <Star className="absolute top-1/3 left-1/5 w-4 h-4 text-clay animate-twinkle" style={{ animationDelay: "1s" }} />
      <Heart className="absolute bottom-1/3 right-1/5 w-4 h-4 text-rose animate-twinkle" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-2xl text-center animate-reveal">
        <div className="font-hand text-clay text-2xl sm:text-3xl mb-4">just for you,</div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-6">
          {content.hero.headline}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
          {content.hero.subheadline}
        </p>
        <button
          onClick={scrollToTimeline}
          className="soft-button inline-flex items-center gap-2 hover:-translate-y-0.5 hover:[box-shadow:0_18px_30px_-12px_oklch(0.5_0.1_40/0.55)]"
        >
          {content.hero.cta}
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/60 text-xs font-hand text-base animate-twinkle">
        scroll gently ↓
      </div>
    </section>
  );
}
