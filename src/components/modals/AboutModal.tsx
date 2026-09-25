import { MapPin, Play } from "lucide-react";

import { profile } from "@/data/profile";
import { useGameStore } from "@/store/gameStore";
import { ModalShell, Tag } from "./ModalShell";
import Image from "next/image";

/** House — introduction. Acts as the intro screen the first time. */
export function AboutModal() {
  const hasStarted = useGameStore((s) => s.hasStarted);
  const start = useGameStore((s) => s.start);
  const isTouch = useGameStore((s) => s.isTouch);

  return (
    <ModalShell eyebrow="Casa" title={hasStarted ? "Sobre mí" : "¡Bienvenido a mi ciudad!"} dismissible={hasStarted}>
      <div className="flex flex-col gap-5 sm:flex-row">
        <Image
          src={profile.avatar}
          alt={`Avatar pixel art de ${profile.name}`}
          width={816}
          height={816}
          className="animate-float h-32 w-32 shrink-0 rounded-2xl pixel-border bg-accent/40 object-cover"
        />
        <div className="space-y-2">
          <p className="font-display text-xl leading-tight">{profile.name}</p>
          <p className="text-sm font-medium text-primary">{profile.title}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </p>
          <p className="text-sm leading-relaxed">{profile.intro}</p>
          <blockquote className="border-l-4 border-primary/60 pl-3 text-sm italic text-muted-foreground">
            “{profile.motto}”
          </blockquote>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {profile.specialties.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {isTouch ? "Usa el joystick y el botón E." : "Muévete con WASD o flechas y pulsa E frente a cada edificio."}
        </p>
        <button
          type="button"
          onClick={start}
          className="font-display inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-primary-foreground shadow-pixel transition hover:translate-y-[-1px] hover:brightness-105 active:translate-y-0"
        >
          <Play className="h-4 w-4" />
          {hasStarted ? "Seguir explorando" : "Comenzar exploración"}
        </button>
      </div>
    </ModalShell>
  );
}
