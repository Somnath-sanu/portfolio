import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "portfolio-music";

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || localStorage.getItem(STORAGE_KEY) === "off") return;
    audio.volume = 0.45;
    void audio
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false));

  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      audio.pause();
      setOn(false);
      localStorage.setItem(STORAGE_KEY, "off");
      return;
    }
    audio.volume = 0.45;
    void audio.play().then(() => {
      setOn(true);
      localStorage.setItem(STORAGE_KEY, "on");
    });
  }

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="pointer-events-auto bg-background/80 backdrop-blur-sm"
        aria-label={on ? "Pause music" : "Play music"}
        aria-pressed={on}
        onClick={toggle}
      >
        {on ? <Volume2 /> : <VolumeX />}
      </Button>
    </>
  );
}
