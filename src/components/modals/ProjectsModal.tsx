import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/profile";
import { useGameStore } from "@/store/gameStore";
import { ModalShell, Tag } from "./ModalShell";

/** Port — project list; selecting a ship opens its own detail modal. */
export function ProjectsModal() {
  const selectedId = useGameStore((s) => s.selectedProjectId);
  const selectProject = useGameStore((s) => s.selectProject);
  const selected = projects.find((p) => p.id === selectedId);

  if (selected) {
    return (
      <ModalShell eyebrow="Puerto de Proyectos" title={selected.name}>
        <button
          type="button"
          onClick={() => selectProject(null)}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al puerto
        </button>
        <p className="text-sm font-medium text-primary">{selected.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed">{selected.description}</p>
        <ul className="mt-4 space-y-1.5">
          {selected.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-secondary-foreground" /> {h}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {selected.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        {selected.url && (
          <a
            href={selected.url}
            target="_blank"
            rel="noreferrer"
            className="font-display mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-primary-foreground shadow-pixel"
          >
            Ver proyecto <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </ModalShell>
    );
  }

  return (
    <ModalShell eyebrow="Puerto de Proyectos" title="Proyectos" size="lg">
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => selectProject(p.id)}
            className="group flex flex-col items-start rounded-2xl bg-card/70 p-4 text-left transition hover:-translate-y-0.5 hover:bg-card hover:shadow-cozy"
          >
            <span className="font-display text-lg leading-tight group-hover:text-primary">{p.name}</span>
            <span className="mt-1 text-sm text-muted-foreground">{p.tagline}</span>
            <span className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 3).map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}
