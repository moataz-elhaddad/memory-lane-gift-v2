import { useState } from "react";
import { isAuthed } from "@/lib/content";
import { PasswordGate } from "@/components/PasswordGate";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { FinalSurprise } from "@/components/FinalSurprise";
import { Admin } from "@/components/Admin";

type Page = "home" | "admin";

function getInitialPage(): Page {
  if (typeof window !== "undefined" && window.location.pathname === "/admin") {
    return "admin";
  }
  return "home";
}

export default function App() {
  const [page, setPage] = useState<Page>(getInitialPage);
  const [unlocked, setUnlocked] = useState(() => isAuthed());

  // Sync URL for /admin <-> /
  const navigate = (p: Page) => {
    setPage(p);
    window.history.pushState({}, "", p === "admin" ? "/admin" : "/");
  };

  if (page === "admin") {
    return <Admin onBack={() => navigate("home")} />;
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <main className="relative">
      <Hero />
      <Timeline />
      <FinalSurprise />
      <footer className="py-10 text-center text-muted-foreground text-sm">
        <div className="font-hand text-clay text-xl">made with all my love ♡</div>
        <button
          onClick={() => navigate("admin")}
          className="text-xs opacity-50 hover:opacity-100 mt-3 inline-block"
        >
          edit
        </button>
      </footer>
    </main>
  );
}
