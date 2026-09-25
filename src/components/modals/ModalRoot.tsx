import type { ModalId } from "@/data/profile";
import { useGameStore } from "@/store/gameStore";
import { AboutModal } from "./AboutModal";
import { ContactModal } from "./ContactModal";
import { EducationModal } from "./EducationModal";
import { ExperienceModal } from "./ExperienceModal";
import { ProjectsModal } from "./ProjectsModal";
import { SkillsModal } from "./SkillsModal";

const registry: Record<ModalId, () => React.JSX.Element> = {
  about: AboutModal,
  experience: ExperienceModal,
  skills: SkillsModal,
  education: EducationModal,
  projects: ProjectsModal,
  contact: ContactModal,
};

/** Renders whichever building modal is active in the store. */
export function ModalRoot() {
  const activeModal = useGameStore((s) => s.activeModal);
  if (!activeModal) return null;
  const Modal = registry[activeModal];
  return <Modal />;
}
