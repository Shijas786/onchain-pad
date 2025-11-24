"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import sdk from "@farcaster/miniapp-sdk";

/**
 * Hook to detect if the app is running inside a Farcaster client
 */
export function useIsFarcasterApp() {
    const [isFarcaster, setIsFarcaster] = useState(false);

    useEffect(() => {
        // Check if we're in a Farcaster mini app environment
        const checkFarcasterEnvironment = async () => {
            try {
                const context = await sdk.context;
                setIsFarcaster(!!context);
            } catch {
                setIsFarcaster(false);
            }
        };

        checkFarcasterEnvironment();
    }, []);

    return isFarcaster;
}

/**
 * Hook to auto-connect wallet in Farcaster environment
 */
export function useFarcasterAutoConnect() {
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const isFarcaster = useIsFarcasterApp();

    useEffect(() => {
        if (isFarcaster && !isConnected) {
            // Find the Farcaster connector
            const farcasterConnector = connectors.find(
                (connector) => connector.id === "farcasterFrame"
            );

            if (farcasterConnector) {
                try {
                    connect({ connector: farcasterConnector });
                } catch (error) {
                    console.error("Auto-connect failed:", error);
                }
            }
        }
    }, [isFarcaster, isConnected, connect, connectors]);

    return { isFarcaster, isConnected };
}
