import { Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ModalShell } from "./ModalShell";

const links = [
  // { label: "GitHub", href: profile.links.github, Icon: Github, external: true },
  // { label: "LinkedIn", href: profile.links.linkedin, Icon: Linkedin, external: true },
  { label: "Email", href: profile.links.email, Icon: Mail, external: false },
  { label: "Descargar CV", href: profile.links.cv, Icon: Download, external: false, download: true },
];

/** Central plaza — contact links. */
export function ContactModal() {
  return (
    <ModalShell eyebrow="Plaza Central" title="Hablemos">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Disponible para roles remotos y proyectos freelance. Elige tu camino:
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map(({ label, href, Icon, external, download }) => (
          <a
            key={label}
            href={href}
            download={download}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="flex items-center gap-3 rounded-2xl bg-card/70 p-4 transition hover:-translate-y-0.5 hover:bg-card hover:shadow-cozy"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-pixel">
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-display text-lg">{label}</span>
          </a>
        ))}
      </div>
    </ModalShell>
  );
}
