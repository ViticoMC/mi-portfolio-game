import { Briefcase, Home, Library, Mail, Ship, Wrench } from "lucide-react";
import type { ModalId } from "@/data/profile";
import { profile } from "@/data/profile";
import { useGameStore } from "@/store/gameStore";

const places: Array<{ id: ModalId; label: string; Icon: typeof Home }> = [
  { id: "about", label: "Casa", Icon: Home },
  { id: "experience", label: "Experiencia", Icon: Briefcase },
  { id: "skills", label: "Taller", Icon: Wrench },
  { id: "education", label: "Biblioteca", Icon: Library },
  { id: "projects", label: "Puerto", Icon: Ship },
  { id: "contact", label: "Plaza", Icon: Mail },
];

/** Overlay chrome: name tag, controls hint, interaction prompt and quick-travel menu. */
export function HUD() {
  const nearby = useGameStore((s) => s.nearby);
  const activeModal = useGameStore((s) => s.activeModal);
  const isTouch = useGameStore((s) => s.isTouch);
  const openModal = useGameStore((s) => s.openModal);
  const requestInteract = useGameStore((s) => s.requestInteract);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="glass animate-pop rounded-2xl px-4 py-2.5">
          <p className="font-display text-base leading-tight sm:text-lg">{profile.name}</p>
          <p className="text-xs text-muted-foreground sm:text-sm">{profile.title}</p>
        </div>
        {!isTouch && (
          <div className="glass-dark hidden rounded-2xl px-4 py-2.5 text-xs sm:block">
            <span className="font-display">WASD / ←↑↓→</span> moverse ·{" "}
            <span className="font-display">E</span> interactuar
          </div>
        )}
      </header>

      <div className="flex flex-col items-center gap-3">
        {nearby && !activeModal && (
          <button
            type="button"
            onClick={requestInteract}
            className="glass pointer-events-auto animate-pop flex items-center gap-3 rounded-2xl px-5 py-3 text-sm"
          >
            <kbd className="font-display animate-bob rounded-lg bg-accent px-2.5 py-1 text-accent-foreground shadow-pixel">
              E
            </kbd>
            <span>
              Entrar a <strong className="font-display">{nearby.label}</strong>
            </span>
          </button>
        )}

        <nav aria-label="Viaje rápido" className="glass pointer-events-auto flex gap-1 rounded-2xl p-1.5">
          {places.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              title={label}
              onClick={() => openModal(id)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground/80 transition hover:bg-accent hover:text-accent-foreground sm:h-11 sm:w-11"
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
