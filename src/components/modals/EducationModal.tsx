import { GraduationCap } from "lucide-react";
import { education } from "@/data/profile";
import { ModalShell } from "./ModalShell";

/** Library — education. */
export function EducationModal() {
  return (
    <ModalShell eyebrow="Biblioteca" title="Educación">
      <ul className="space-y-4">
        {education.map((e) => (
          <li key={e.id} className="flex gap-4 rounded-2xl bg-card/70 p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/40 text-secondary-foreground">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg leading-tight">{e.degree}</p>
              <p className="text-sm font-medium text-primary">{e.institution}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </ModalShell>
  );
}
