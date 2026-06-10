import { useState } from "react";
import { useContent, defaultContent, type TimelineCard, type TimelineTag } from "@/lib/content";
import { Trash2, ArrowUp, ArrowDown, Plus, RotateCcw, Image as ImageIcon } from "lucide-react";

const TAGS: TimelineTag[] = ["memory", "funny", "song", "little moment", "favorite photo", "letter"];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1.5 text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-input bg-background/60 px-3 py-2 outline-none focus:border-clay focus:ring-2 focus:ring-clay/20";

export function Admin({ onBack }: { onBack: () => void }) {
  const [content, setContent] = useContent();
  const [saved, setSaved] = useState(false);
  const flashSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const update = (next: typeof content) => {
    setContent(next);
    flashSaved();
  };

  const updateCard = (id: string, patch: Partial<TimelineCard>) => {
    update({ ...content, cards: content.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  };
  const removeCard = (id: string) =>
    update({ ...content, cards: content.cards.filter((c) => c.id !== id) });
  const move = (id: string, dir: -1 | 1) => {
    const i = content.cards.findIndex((c) => c.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= content.cards.length) return;
    const next = [...content.cards];
    [next[i], next[j]] = [next[j], next[i]];
    update({ ...content, cards: next });
  };
  const addCard = () => {
    const id = "c" + Date.now();
    update({
      ...content,
      cards: [...content.cards, { id, title: "New memory", label: "", text: "", tag: "memory" }],
    });
  };
  const reset = () => {
    if (confirm("Reset everything to the default placeholder content?")) update(defaultContent);
  };

  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="font-hand text-clay text-xl">behind the scenes</div>
          <h1 className="text-3xl">Edit your gift</h1>
        </div>
        <div className="flex gap-2 items-center">
          {saved && <span className="font-hand text-clay text-lg">saved ♡</span>}
          <button onClick={onBack} className="soft-button !py-2 !px-4 text-sm">
            View site
          </button>
          <button
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> reset
          </button>
        </div>
      </div>

      {/* Settings */}
      <section className="paper-card p-6 mb-6">
        <h2 className="text-xl mb-4">Settings</h2>
        <Field label="Site password">
          <input
            className={inputCls}
            value={content.password}
            onChange={(e) => update({ ...content, password: e.target.value })}
          />
        </Field>
      </section>

      {/* Hero */}
      <section className="paper-card p-6 mb-6">
        <h2 className="text-xl mb-4">Hero</h2>
        <Field label="Headline">
          <input
            className={inputCls}
            value={content.hero.headline}
            onChange={(e) => update({ ...content, hero: { ...content.hero, headline: e.target.value } })}
          />
        </Field>
        <Field label="Subheadline">
          <textarea
            className={inputCls}
            rows={2}
            value={content.hero.subheadline}
            onChange={(e) =>
              update({ ...content, hero: { ...content.hero, subheadline: e.target.value } })
            }
          />
        </Field>
        <Field label="Button text">
          <input
            className={inputCls}
            value={content.hero.cta}
            onChange={(e) => update({ ...content, hero: { ...content.hero, cta: e.target.value } })}
          />
        </Field>
      </section>

      {/* Cards */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Timeline cards</h2>
          <button
            onClick={addCard}
            className="soft-button !py-2 !px-4 text-sm inline-flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> add card
          </button>
        </div>

        {content.cards.map((c, i) => (
          <details key={c.id} className="paper-card p-5 mb-3" open={i === 0}>
            <summary className="cursor-pointer flex items-center justify-between gap-3">
              <span className="font-medium">
                {i + 1}. {c.title || "(untitled)"}
              </span>
              <span className="flex gap-1 items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    move(c.id, -1);
                  }}
                  className="p-1 hover:bg-secondary rounded"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    move(c.id, 1);
                  }}
                  className="p-1 hover:bg-secondary rounded"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm("Delete this card?")) removeCard(c.id);
                  }}
                  className="p-1 hover:bg-destructive/10 text-destructive rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </span>
            </summary>
            <div className="mt-4">
              <Field label="Title">
                <input
                  className={inputCls}
                  value={c.title}
                  onChange={(e) => updateCard(c.id, { title: e.target.value })}
                />
              </Field>
              <Field label="Date / short label">
                <input
                  className={inputCls}
                  value={c.label ?? ""}
                  onChange={(e) => updateCard(c.id, { label: e.target.value })}
                />
              </Field>
              <Field label="Memory text">
                <textarea
                  className={inputCls}
                  rows={3}
                  value={c.text ?? ""}
                  onChange={(e) => updateCard(c.id, { text: e.target.value })}
                />
              </Field>
              <Field label="Quote (optional)">
                <input
                  className={inputCls}
                  value={c.quote ?? ""}
                  onChange={(e) => updateCard(c.id, { quote: e.target.value })}
                />
              </Field>
              <Field label="Tag">
                <select
                  className={inputCls}
                  value={c.tag ?? ""}
                  onChange={(e) =>
                    updateCard(c.id, { tag: (e.target.value || undefined) as TimelineTag })
                  }
                >
                  <option value="">— none —</option>
                  {TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Main photo (URL or upload)">
                <div className="flex gap-2 items-center">
                  <input
                    className={inputCls}
                    placeholder="https://…"
                    value={c.image ?? ""}
                    onChange={(e) => updateCard(c.id, { image: e.target.value })}
                  />
                  <label
                    className="shrink-0 p-2 rounded-lg bg-secondary hover:bg-accent cursor-pointer"
                    title="upload"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (f) updateCard(c.id, { image: await fileToDataUrl(f) });
                      }}
                    />
                  </label>
                </div>
                {c.image && (
                  <img src={c.image} alt="" className="mt-2 h-24 rounded-md object-cover" />
                )}
              </Field>

              <Field label="Gallery photos (comma-separated URLs)">
                <textarea
                  className={inputCls}
                  rows={2}
                  value={(c.gallery ?? []).join(", ")}
                  onChange={(e) =>
                    updateCard(c.id, {
                      gallery: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
                <label className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1 cursor-pointer">
                  <ImageIcon className="w-3 h-3" /> add image to gallery
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        updateCard(c.id, {
                          gallery: [...(c.gallery ?? []), await fileToDataUrl(f)],
                        });
                    }}
                  />
                </label>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Song title">
                  <input
                    className={inputCls}
                    value={c.songTitle ?? ""}
                    onChange={(e) => updateCard(c.id, { songTitle: e.target.value })}
                  />
                </Field>
                <Field label="Artist">
                  <input
                    className={inputCls}
                    value={c.songArtist ?? ""}
                    onChange={(e) => updateCard(c.id, { songArtist: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Spotify or YouTube link">
                <input
                  className={inputCls}
                  placeholder="https://open.spotify.com/track/… or https://youtu.be/…"
                  value={c.songUrl ?? ""}
                  onChange={(e) => updateCard(c.id, { songUrl: e.target.value })}
                />
              </Field>
            </div>
          </details>
        ))}
      </section>

      {/* Final surprise */}
      <section className="paper-card p-6 mb-12">
        <h2 className="text-xl mb-4">Final surprise</h2>
        <Field label="Trigger button">
          <input
            className={inputCls}
            value={content.finalSurprise.triggerLabel}
            onChange={(e) =>
              update({
                ...content,
                finalSurprise: { ...content.finalSurprise, triggerLabel: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Letter">
          <textarea
            className={inputCls}
            rows={8}
            value={content.finalSurprise.letter}
            onChange={(e) =>
              update({
                ...content,
                finalSurprise: { ...content.finalSurprise, letter: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Final photo (URL, optional)">
          <input
            className={inputCls}
            value={content.finalSurprise.photo ?? ""}
            onChange={(e) =>
              update({
                ...content,
                finalSurprise: { ...content.finalSurprise, photo: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Song or playlist link (optional)">
          <input
            className={inputCls}
            value={content.finalSurprise.songUrl ?? ""}
            onChange={(e) =>
              update({
                ...content,
                finalSurprise: { ...content.finalSurprise, songUrl: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Closing button">
          <input
            className={inputCls}
            value={content.finalSurprise.closeLabel}
            onChange={(e) =>
              update({
                ...content,
                finalSurprise: { ...content.finalSurprise, closeLabel: e.target.value },
              })
            }
          />
        </Field>
      </section>
    </main>
  );
}
