"use client";

import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import NoteComposer from "@/components/NoteComposer";
import NotesGrid from "@/components/NotesGrid";
import { motion } from "framer-motion";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md flex flex-col items-center"
      >
        {/* Header */}
        <header className="w-full flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Onchain Notes</h1>
            <p className="text-sm text-neutral-400">Leave a short note on Base.</p>
          </div>

          <button
            onClick={() => open()}
            className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-sm font-medium transition-colors"
          >
            {isConnected && address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Connect Wallet"}
          </button>
        </header>

        {/* Composer */}
        <NoteComposer />

        {/* Grid */}
        <div className="w-full mt-4">
          <NotesGrid />
        </div>
      </motion.div>
    </main>
  );
}
