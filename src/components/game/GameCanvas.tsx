import { useEffect, useRef } from "react";
import type Phaser from "phaser";

/** Mounts the Phaser world. Phaser is imported lazily so it never runs during SSR. */
export default function GameCanvas() {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;
        let game: Phaser.Game | undefined;
        let cancelled = false;

        import("@@/config").then(({ createGame }) => {
            if (cancelled) return;
            game = createGame(host);
        });

        return () => {
            cancelled = true;
            game?.destroy(true);
        };
    }, []);

    return <div ref={hostRef} className="absolute inset-0 bg-leaf" aria-label="Ciudad interactiva" />;
}
