"use client";

import { useState } from "react";
import sdk from "@farcaster/miniapp-sdk";

interface SignInResult {
    signature: string;
    message: string;
}

export function useFarcasterSignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const signIn = async (): Promise<SignInResult | null> => {
        setIsLoading(true);
        setError(null);

        try {
            // Generate a random nonce (at least 8 alphanumeric characters)
            const nonce = Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);

            // Sign in with Farcaster
            const result = await sdk.actions.signIn({
                nonce,
                acceptAuthAddress: true, // Accept auth addresses for best UX
            });

            setIsLoading(false);
            return result;
        } catch (err) {
            const error = err as Error;
            console.error("Farcaster sign-in failed:", error);
            setError(error);
            setIsLoading(false);
            return null;
        }
    };

    return {
        signIn,
        isLoading,
        error,
    };
}
