"use client";

import { useEffect } from "react";
import sdk from "@farcaster/miniapp-sdk";
import { useChainId, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";

export default function FarcasterProvider({ children }: { children: React.ReactNode }) {
    const chainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

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

    // Auto-switch to Base network if on wrong chain
    useEffect(() => {
        const switchToBase = async () => {
            if (chainId && chainId !== base.id) {
                try {
                    await switchChainAsync({ chainId: base.id });
                    console.log("Switched to Base network");
                } catch (error) {
                    console.error("Failed to switch to Base:", error);
                }
            }
        };

        switchToBase();
    }, [chainId, switchChainAsync]);

    return <>{children}</>;
}
