import { experience } from "@/data/profile";
import { ModalShell, Tag } from "./ModalShell";

/** Tech center — professional experience timeline. */
export function ExperienceModal() {
  return (
    <ModalShell eyebrow="Centro Tecnológico" title="Experiencia profesional">
      <ol className="relative space-y-5 border-l-2 border-border pl-5">
        {experience.map((item) => (
          <li key={item.id} className="relative">
            <span className="absolute top-1.5 -left-[27px] h-3 w-3 rounded-sm bg-primary shadow-pixel" />
            <p className="font-display text-lg leading-tight">{item.role}</p>
            <p className="text-sm font-medium text-primary">
              {item.company} <span className="text-muted-foreground">· {item.period}</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed">{item.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </ModalShell>
  );
}
