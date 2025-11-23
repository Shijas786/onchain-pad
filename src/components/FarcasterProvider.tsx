"use client";

import { useEffect } from "react";
import sdk from "@farcaster/frame-sdk";

export default function FarcasterProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const init = async () => {
            try {
                // Tell Farcaster the app is ready to be displayed
                await sdk.actions.ready();
            } catch (err) {
                console.error("Failed to initialize Farcaster SDK:", err);
            }
        };

        init();
    }, []);

    return <>{children}</>;
}
