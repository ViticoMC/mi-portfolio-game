/** Single source of truth for all professional information shown in the UI. */

export type ModalId =
  | "about"
  | "experience"
  | "skills"
  | "education"
  | "projects"
  | "contact";

export const profile = {
  name: "Víctor Manuel Martínez Campo",
  title: "Frontend Engineer | React | Next.js | TypeScript",
  location: "Remote | Cuba",
  motto: "Primero haz que exista, luego hazlo mejor.",
  intro:
    "Construyo interfaces rápidas, accesibles y bien arquitecturadas. Me gusta convertir ideas en productos reales y luego pulirlos hasta que se sientan naturales.",
  specialties: [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Supabase",
    "PostgreSQL",
    "REST APIs",
    "UX",
    "SEO",
    "Arquitectura Frontend",
  ],

  // TODO: replace placeholder links with the real ones.
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:hola@example.com",
    cv: "/cv-victor-martinez.pdf",
  },
  avatar: "/avatar.png",
} as const;

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "pct",
    role: "Frontend Engineer",
    company: "PCT Santa Clara",
    period: "Parque Científico-Tecnológico",
    summary:
      "Desarrollo de plataformas web para el ecosistema tecnológico: arquitectura frontend, componentes reutilizables y rendimiento.",
    stack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    id: "freelance",
    role: "Freelance Frontend Developer",
    company: "Clientes remotos",
    period: "Remoto",
    summary:
      "Landing pages, dashboards y aplicaciones a medida con foco en UX, SEO y entregas iterativas.",
    stack: ["Next.js", "Supabase", "REST APIs", "SEO"],
  },
  {
    id: "directorio",
    role: "Frontend Lead",
    company: "Directorio Empresarial",
    period: "Producto",
    summary:
      "Directorio de empresas con búsqueda, filtros y perfiles públicos optimizados para buscadores.",
    stack: ["Next.js", "PostgreSQL", "TailwindCSS", "SEO"],
  },
];

export interface Skill {
  id: string;
  name: string;
  /** Emoji used as the pixel-object icon in the workshop. */
  icon: string;
  level: number; // 0–100
  blurb: string;
}

export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    level: 92,
    blurb: "Hooks, patrones de composición, rendimiento y Server Components.",
  },
  {
    id: "next",
    name: "Next.js",
    icon: "▲",
    level: 90,
    blurb: "App Router, SSR/SSG, rutas API, caché y SEO técnico.",
  },
  {
    id: "ts",
    name: "TypeScript",
    icon: "🧩",
    level: 88,
    blurb: "Tipado estricto, genéricos y modelado de dominio.",
  },
  {
    id: "tailwind",
    name: "Tailwind",
    icon: "🎨",
    level: 90,
    blurb: "Design systems con tokens semánticos y variantes.",
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "⚡",
    level: 80,
    blurb: "Auth, RLS, storage y funciones serverless.",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    icon: "🐘",
    level: 78,
    blurb: "Modelado relacional, índices y consultas eficientes.",
  },
];

export const education = [
  {
    id: "uclv",
    institution: 'Universidad Central "Marta Abreu" de Las Villas',
    degree: "Licenciatura en Ciencias de la Computación",
    detail:
      "Fundamentos sólidos de algoritmos, estructuras de datos, ingeniería de software y bases de datos.",
  },
];

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    id: "directorio",
    name: "Directorio Empresarial",
    tagline: "Buscador de empresas con perfiles públicos",
    description:
      "Plataforma para descubrir empresas por sector y ubicación, con perfiles optimizados para SEO y panel de administración.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    highlights: [
      "Búsqueda con filtros combinados",
      "SSR para indexación",
      "Panel de gestión",
    ],
  },
  {
    id: "pct",
    name: "PCT Santa Clara",
    tagline: "Web del Parque Científico-Tecnológico",
    description:
      "Sitio institucional y herramientas internas para el parque tecnológico, con arquitectura de componentes escalable.",
    stack: ["React", "Next.js", "TailwindCSS"],
    highlights: [
      "Design system propio",
      "Accesibilidad AA",
      "Rendimiento Lighthouse 95+",
    ],
  },
  {
    id: "delivery",
    name: "Delivery App",
    tagline: "Pedidos y seguimiento en tiempo real",
    description:
      "Aplicación de pedidos con catálogo, carrito, estados de entrega y notificaciones en tiempo real.",
    stack: ["Next.js", "Supabase", "TypeScript"],
    highlights: ["Realtime con Supabase", "Auth y roles", "PWA instalable"],
  },
  {
    id: "oxiris",
    name: "Oxiris Web3",
    tagline: "Interfaz para una dApp Web3",
    description:
      "Frontend para interactuar con contratos inteligentes: conexión de wallet, firmas y visualización de datos on-chain.",
    stack: ["React", "TypeScript", "Web3"],
    highlights: [
      "Integración de wallets",
      "Estados de transacción",
      "UI responsive",
    ],
  },
];
