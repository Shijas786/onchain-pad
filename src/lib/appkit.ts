import { createAppKit } from '@reown/appkit/react'
import { wagmiAdapter, projectId, networks } from './wagmi'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const appKit = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    features: {
        analytics: true
    }
})
