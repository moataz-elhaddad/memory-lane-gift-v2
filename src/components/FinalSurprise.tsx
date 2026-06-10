import { useState } from "react";
import { useContent } from "@/lib/content";
import { Heart, Sparkles, X } from "lucide-react";

export function FinalSurprise() {
  const [content] = useContent();
  const [open, setOpen] = useState(false);
  const { finalSurprise } = content;

  return (
    <section className="relative py-24 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <Sparkles className="w-8 h-8 text-clay mx-auto mb-4 animate-twinkle" />
        <h2 className="text-3xl sm:text-4xl mb-6">there's a little something else…</h2>
        <button
          onClick={() => setOpen(true)}
          className="soft-button inline-flex items-center gap-2 hover:-translate-y-0.5"
        >
          <Heart className="w-4 h-4 fill-current" />
          {finalSurprise.triggerLabel}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 animate-reveal"
          onClick={() => setOpen(false)}
        >
          <div
            className="paper-card max-w-lg w-full p-8 sm:p-10 text-left relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="font-hand text-clay text-2xl mb-2 text-center">a little letter</div>
            <h3 className="text-3xl sm:text-4xl text-center mb-6">for you ♡</h3>

            {finalSurprise.photo && (
              <div className="polaroid mb-6 mx-auto max-w-xs" style={{ transform: "rotate(-2deg)" }}>
                <img src={finalSurprise.photo} alt="" className="w-full h-56 object-cover rounded-sm" />
              </div>
            )}

            <div className="whitespace-pre-wrap leading-relaxed text-foreground/85 mb-6">
              {finalSurprise.letter}
            </div>

            {finalSurprise.songUrl && (
              <a
                href={finalSurprise.songUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-center font-hand text-xl text-clay underline-offset-4 hover:underline mb-6"
              >
                ♪ a song just for today
              </a>
            )}

            <button onClick={() => setOpen(false)} className="soft-button w-full">
              {finalSurprise.closeLabel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
