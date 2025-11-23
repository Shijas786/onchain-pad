"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { motion } from "framer-motion";
import { ONCHAIN_NOTES_ADDRESS, ONCHAIN_NOTES_ABI } from "@/lib/contract";

export default function NoteComposer() {
    const { isConnected } = useAccount();
    const [content, setContent] = useState("");
    const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const isPending = isWritePending || isConfirming;

    const handlePost = () => {
        if (!content || !isConnected) return;
        writeContract({
            address: ONCHAIN_NOTES_ADDRESS,
            abi: ONCHAIN_NOTES_ABI,
            functionName: "addNote",
            args: [content],
        });
    };

    useEffect(() => {
        if (isConfirmed) {
            setContent("");
            // Ideally trigger a refetch here, but for simplicity we'll rely on page refresh or polling
        }
    }, [isConfirmed]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8 shadow-xl"
        >
            <div className="relative">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={80}
                    placeholder="Write a note onchain..."
                    className="w-full bg-transparent text-white text-lg placeholder-neutral-500 resize-none outline-none h-24"
                    disabled={!isConnected || isPending}
                />
                <div className="absolute bottom-0 right-0 text-xs text-neutral-500">
                    {content.length} / 80
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePost}
                    disabled={!isConnected || !content || isPending}
                    className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${!isConnected
                            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                            : !content || isPending
                                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                : "bg-white text-black hover:bg-neutral-200"
                        }`}
                >
                    {isPending ? "Posting..." : "Post Onchain"}
                </motion.button>
            </div>
        </motion.div>
    );
}
