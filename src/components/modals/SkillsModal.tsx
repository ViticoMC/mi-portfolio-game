import { useState } from "react";
import { skills } from "@/data/profile";
import { ModalShell } from "./ModalShell";

/** Workshop — each technology is an interactive object on the workbench. */
export function SkillsModal() {
  const [activeId, setActiveId] = useState(skills[0]?.id ?? null);
  const active = skills.find((s) => s.id === activeId);

  return (
    <ModalShell eyebrow="Taller del Programador" title="Habilidades técnicas" size="lg">
      <p className="text-sm text-muted-foreground">Toca cada herramienta del banco de trabajo para inspeccionarla.</p>

      <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-accent/30 p-3 sm:grid-cols-6">
        {skills.map((s) => {
          const selected = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              aria-pressed={selected}
              className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 transition ${
                selected
                  ? "bg-card pixel-border -translate-y-1"
                  : "bg-card/60 hover:-translate-y-0.5 hover:bg-card"
              }`}
            >
              <span className={`text-3xl ${selected ? "animate-bob" : ""}`} aria-hidden>
                {s.icon}
              </span>
              <span className="font-display text-xs">{s.name}</span>
            </button>
          );
        })}
      </div>

      {active && (
        <div key={active.id} className="animate-pop mt-4 rounded-2xl bg-card/70 p-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg">
              {active.icon} {active.name}
            </p>
            <span className="font-display text-sm text-primary">Nv. {Math.round(active.level / 10)}</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-md bg-muted">
            <div
              className="h-full rounded-md bg-primary transition-[width] duration-700"
              style={{ width: `${active.level}%` }}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed">{active.blurb}</p>
        </div>
      )}
    </ModalShell>
  );
}
