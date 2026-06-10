import { useEffect, useRef, useState } from "react";
import { Music, Quote, Heart, Sparkles } from "lucide-react";
import type { TimelineCard } from "@/lib/content";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

function spotifyEmbed(url: string): string | null {
  // Accept open.spotify.com/track/<id> or embed form
  const m = url.match(/spotify\.com\/(embed\/)?(track|playlist|album)\/([a-zA-Z0-9]+)/);
  if (m) return `https://open.spotify.com/embed/${m[2]}/${m[3]}`;
  return null;
}
function youtubeEmbed(url: string): string | null {
  const m =
    url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/) ||
    url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) ||
    url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return null;
}

export function TimelineCardView({ card, side }: { card: TimelineCard; side: "left" | "right" }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const spotify = card.songUrl ? spotifyEmbed(card.songUrl) : null;
  const youtube = card.songUrl ? youtubeEmbed(card.songUrl) : null;

  const rot = side === "left" ? "-1.5deg" : "1.5deg";

  return (
    <div
      ref={ref}
      className={`relative md:w-1/2 ${side === "left" ? "md:pr-12 md:self-start" : "md:pl-12 md:self-end md:ml-auto"} mb-16`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Dot on timeline */}
      <div
        className={`hidden md:block absolute top-8 w-4 h-4 rounded-full bg-clay ring-4 ring-cream ${
          side === "left" ? "right-[-8px]" : "left-[-8px]"
        }`}
      />

      <div className="paper-card p-5 sm:p-6" style={{ transform: `rotate(${rot})` }}>
        {card.tag && (
          <div className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent/60 text-accent-foreground mb-3 font-hand text-base">
            {card.tag === "song" && <Music className="w-3 h-3" />}
            {card.tag === "funny" && <Sparkles className="w-3 h-3" />}
            {card.tag === "favorite photo" && <Heart className="w-3 h-3" />}
            {card.tag}
          </div>
        )}
        {card.label && <div className="font-hand text-clay text-lg mb-1">{card.label}</div>}
        <h3 className="text-2xl sm:text-3xl mb-3">{card.title}</h3>

        {card.image && (
          <div className="polaroid mb-4 mx-auto max-w-sm" style={{ transform: "rotate(-1deg)" }}>
            <img src={card.image} alt={card.title} className="w-full h-56 sm:h-64 object-cover rounded-sm" loading="lazy" />
            {card.label && <div className="font-hand text-clay text-center text-base mt-2">{card.label}</div>}
          </div>
        )}

        {card.gallery && card.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {card.gallery.map((g, i) => (
              <div
                key={i}
                className="polaroid !p-1.5 !pb-2"
                style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
              >
                <img src={g} alt="" className="w-full h-20 sm:h-24 object-cover rounded-sm" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {card.text && <p className="text-foreground/80 leading-relaxed mb-3">{card.text}</p>}

        {card.quote && (
          <div className="flex gap-2 items-start mt-3 p-3 bg-secondary/50 rounded-xl">
            <Quote className="w-4 h-4 text-clay shrink-0 mt-1" />
            <p className="font-hand text-xl text-clay">{card.quote}</p>
          </div>
        )}

        {card.songUrl && (
          <div className="mt-4">
            {card.songTitle && (
              <div className="flex items-center gap-2 mb-2 text-sm">
                <Music className="w-4 h-4 text-clay" />
                <span className="font-medium">{card.songTitle}</span>
                {card.songArtist && <span className="text-muted-foreground">· {card.songArtist}</span>}
              </div>
            )}
            {spotify ? (
              <iframe
                src={spotify}
                className="w-full rounded-xl"
                height={152}
                allow="encrypted-media"
                loading="lazy"
              />
            ) : youtube ? (
              <iframe
                src={youtube}
                className="w-full rounded-xl aspect-video"
                allow="encrypted-media"
                loading="lazy"
              />
            ) : (
              <a
                href={card.songUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 soft-button !py-2 !px-4 text-sm"
              >
                <Music className="w-4 h-4" /> play the song
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
