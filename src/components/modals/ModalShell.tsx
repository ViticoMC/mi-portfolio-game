import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useGameStore } from "@/store/gameStore";

interface ModalShellProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  /** Hide the close button (used by the intro). */
  dismissible?: boolean;
  size?: "md" | "lg";
}

/** Shared glassmorphism dialog used by every building modal. */
export function ModalShell({ title, eyebrow, children, dismissible = true, size = "md" }: ModalShellProps) {
  const closeModal = useGameStore((s) => s.closeModal);

  useEffect(() => {
    if (!dismissible) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal, dismissible]);

  return (
    <div
      className="absolute inset-0 z-30 flex items-end justify-center bg-night/40 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
      onClick={dismissible ? closeModal : undefined}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`glass animate-pop scrollbar-thin relative max-h-[88dvh] w-full overflow-y-auto rounded-3xl p-5 sm:p-8 ${
          size === "lg" ? "max-w-3xl" : "max-w-xl"
        }`}
      >
        {dismissible && (
          <button
            type="button"
            onClick={closeModal}
            aria-label="Cerrar"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {eyebrow && <p className="font-display text-xs tracking-wider text-primary uppercase">{eyebrow}</p>}
        <h2 className="mt-1 text-2xl sm:text-3xl">{title}</h2>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg bg-secondary/40 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
      {children}
    </span>
  );
}
