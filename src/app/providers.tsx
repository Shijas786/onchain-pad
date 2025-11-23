'use client'

import { WagmiProvider, cookieToInitialState } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi'
import { ReactNode, useState } from 'react'

// Import appKit to ensure it initializes on client
import '@/lib/appkit'

export function Providers({ children, cookies }: { children: ReactNode, cookies: string | null }) {
    const initialState = cookieToInitialState(config, cookies)

    // Create QueryClient once
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
