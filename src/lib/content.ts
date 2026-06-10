import { useEffect, useState } from "react";

export type TimelineTag = "memory" | "funny" | "song" | "little moment" | "favorite photo" | "letter";

export type TimelineCard = {
  id: string;
  title: string;
  label?: string;
  text?: string;
  image?: string;
  gallery?: string[];
  songTitle?: string;
  songArtist?: string;
  songUrl?: string;
  quote?: string;
  tag?: TimelineTag;
};

export type SiteContent = {
  password: string;
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  cards: TimelineCard[];
  finalSurprise: {
    triggerLabel: string;
    letter: string;
    photo?: string;
    songUrl?: string;
    closeLabel: string;
  };
};

const PLACEHOLDER_IMG = (seed: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

export const defaultContent: SiteContent = {
  password: "iloveyou",
  hero: {
    headline: "A Timeline of You",
    subheadline: "A little place for the memories, songs, and moments that feel like you.",
    cta: "Start the Journey",
  },
  cards: [
    {
      id: "c1",
      title: "The first memory I want to keep",
      label: "where it all began",
      tag: "memory",
      text: "Some moments are simple, but somehow they stay forever.",
      image: PLACEHOLDER_IMG("1529333166437-7750a6dd5a70&ixlib=rb-4.0.3"),
    },
    {
      id: "c2",
      title: "A song that feels like you",
      label: "press play",
      tag: "song",
      text: "This song reminds me of your energy in the softest way.",
      songTitle: "Sunflower",
      songArtist: "Rex Orange County",
      songUrl: "https://open.spotify.com/embed/track/3iw6V4LH7yPj1ESORX9RIN",
    },
    {
      id: "c3",
      title: "A moment that still makes me laugh",
      label: "the giggles",
      tag: "funny",
      text: "I still laugh when I think about this.",
      image: PLACEHOLDER_IMG("1503454537195-1dcabb73ffb9&ixlib=rb-4.0.3"),
    },
    {
      id: "c4",
      title: "A little thing I love about you",
      label: "a tiny note",
      tag: "little moment",
      text: "Not everything has to be a big moment. Sometimes it's the small things that mean the most.",
      quote: "the way you hum when you're thinking",
    },
    {
      id: "c5",
      title: "A photo I'll always love",
      label: "framed forever",
      tag: "favorite photo",
      text: "This photo feels like a whole memory by itself.",
      image: PLACEHOLDER_IMG("1517423440428-a5a00ad493e8&ixlib=rb-4.0.3"),
    },
    {
      id: "c6",
      title: "A chapter I would relive",
      label: "a little chapter",
      tag: "memory",
      text: "If I could go back to one little chapter, this would be one of them.",
      gallery: [
        PLACEHOLDER_IMG("1469854523086-cc02fe5d8800&ixlib=rb-4.0.3", 600, 600),
        PLACEHOLDER_IMG("1500530855697-b586d89ba3ee&ixlib=rb-4.0.3", 600, 600),
        PLACEHOLDER_IMG("1502082553048-f009c37129b9&ixlib=rb-4.0.3", 600, 600),
      ],
    },
    {
      id: "c7",
      title: "One of my favorite versions of you",
      label: "completely you",
      tag: "letter",
      text: "This is one of those moments where you felt completely like yourself.",
      image: PLACEHOLDER_IMG("1492684223066-81342ee5ff30&ixlib=rb-4.0.3"),
    },
  ],
  finalSurprise: {
    triggerLabel: "One last thing…",
    letter:
      "I made this little place so I could keep all the small things that make you, you. Every photo, every song, every silly moment — they all live here now, tucked away just for you.\n\nThank you for being the warmest part of my life. I hope today feels as loved as you make every other day feel.",
    closeLabel: "Happy Birthday",
  },
};

const STORAGE_KEY = "timeline-of-you/content/v1";
const AUTH_KEY = "timeline-of-you/auth/v1";

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    return { ...defaultContent, ...JSON.parse(raw) };
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("content-updated"));
}

export function useContent(): [SiteContent, (c: SiteContent) => void] {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => {
    setContent(loadContent());
    const handler = () => setContent(loadContent());
    window.addEventListener("content-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("content-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  const update = (c: SiteContent) => {
    saveContent(c);
    setContent(c);
  };
  return [content, update];
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}
export function setAuthed(v: boolean) {
  if (typeof window === "undefined") return;
  if (v) sessionStorage.setItem(AUTH_KEY, "1");
  else sessionStorage.removeItem(AUTH_KEY);
}
