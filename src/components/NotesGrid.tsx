"use client";

import { useEffect, useState } from "react";
import { useReadContract, usePublicClient } from "wagmi";
import { motion } from "framer-motion";
import { ONCHAIN_NOTES_ADDRESS, ONCHAIN_NOTES_ABI } from "@/lib/contract";

interface Note {
    author: string;
    content: string;
    timestamp: number;
    index: number;
}

export default function NotesGrid() {
    const [notes, setNotes] = useState<Note[]>([]);
    const publicClient = usePublicClient();

    const { data: count } = useReadContract({
        address: ONCHAIN_NOTES_ADDRESS,
        abi: ONCHAIN_NOTES_ABI,
        functionName: "getNotesCount",
    });

    useEffect(() => {
        const fetchNotes = async () => {
            if (!count || !publicClient) return;
            const total = Number(count);
            const promises = [];

            // Fetch in reverse order to show newest first
            for (let i = total - 1; i >= 0; i--) {
                promises.push(
                    publicClient.readContract({
                        address: ONCHAIN_NOTES_ADDRESS,
                        abi: ONCHAIN_NOTES_ABI,
                        functionName: "getNote",
                        args: [BigInt(i)],
                    }).then((note) => ({
                        ...note,
                        index: i,
                        timestamp: Number(note.timestamp),
                    }))
                );
            }

            const results = await Promise.all(promises);
            setNotes(results);
        };

        fetchNotes();
        // Poll every 5 seconds
        const interval = setInterval(fetchNotes, 5000);
        return () => clearInterval(interval);
    }, [count, publicClient]);

    if (!notes.length) {
        return (
            <div className="text-neutral-500 text-center mt-10">
                No notes yet. Be the first!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            {notes.map((note, i) => (
                <NoteCard key={note.index} note={note} index={i} />
            ))}
        </div>
    );
}

function NoteCard({ note, index }: { note: Note; index: number }) {
    // Random rotation between -2 and 2 degrees based on index
    const rotation = (index % 5) - 2;

    // Format timestamp
    const timeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() / 1000) - timestamp);
        if (seconds < 60) return "just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            style={{ rotate: `${rotation}deg` }}
            className="bg-[#fef9c3] text-black p-4 shadow-md min-h-[140px] flex flex-col justify-between"
        >
            <p className="font-handwriting text-lg leading-snug break-words">
                {note.content}
            </p>
            <div className="mt-4 flex justify-between items-end text-xs text-neutral-600/70 font-mono">
                <span>
                    {note.author.slice(0, 6)}...{note.author.slice(-4)}
                </span>
                <span>{timeAgo(note.timestamp)}</span>
            </div>
        </motion.div>
    );
}
