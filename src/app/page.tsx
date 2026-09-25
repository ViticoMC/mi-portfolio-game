"use client";

import GameCanvas from "@/components/game/GameCanvas";
import { HUD } from "@/components/game/HUD";
import { VirtualJoystick } from "@/components/game/VirtualJoystick";
import { ModalRoot } from "@/components/modals/ModalRoot";



export default function Index() {
    return (
        <main className="relative h-dvh w-full overflow-hidden bg-leaf">

            <GameCanvas />

            <HUD />

            <VirtualJoystick />

            <ModalRoot />
        </main>
    );
}


