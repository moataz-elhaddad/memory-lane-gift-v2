import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { useContent, setAuthed } from "@/lib/content";

export function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [content] = useContent();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === content.password.trim().toLowerCase()) {
      setAuthed(true);
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <Sparkles className="absolute top-16 left-10 w-5 h-5 text-rose animate-twinkle" />
      <Heart className="absolute top-24 right-16 w-4 h-4 text-clay animate-twinkle" style={{ animationDelay: "1s" }} />
      <Sparkles className="absolute bottom-24 left-1/4 w-4 h-4 text-clay animate-twinkle" style={{ animationDelay: "2s" }} />
      <Heart className="absolute bottom-32 right-12 w-5 h-5 text-rose animate-twinkle" style={{ animationDelay: "0.5s" }} />

      <form onSubmit={submit} className="paper-card w-full max-w-md p-8 sm:p-10 text-center animate-reveal">
        <div className="font-hand text-clay text-2xl mb-2">psst…</div>
        <h1 className="text-3xl sm:text-4xl mb-3">This little place is made for you.</h1>
        <p className="text-muted-foreground mb-7 text-sm sm:text-base">
          Type the secret word to come inside.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="our little secret"
          className={`w-full rounded-full border bg-background/60 px-5 py-3 text-center outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20 ${
            error ? "border-destructive animate-pulse" : ""
          }`}
        />
        {error && <p className="text-destructive text-sm mt-2 font-hand text-lg">hmm, try again ♡</p>}
        <button type="submit" className="soft-button mt-6 w-full hover:[box-shadow:0_18px_30px_-12px_oklch(0.5_0.1_40/0.55)] hover:-translate-y-0.5">
          Open your gift
        </button>
      </form>
    </div>
  );
}
