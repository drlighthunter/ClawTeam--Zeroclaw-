/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Message } from "../types";

interface TerminalProps {
  messages: Message[];
  onCommand?: (command: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ messages, onCommand }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand?.(input);
    setInput("");
  };

  return (
    <div className="w-full h-full bg-[#050505] border border-[#1a1a1a] rounded-lg p-4 font-mono text-[11px] overflow-hidden flex flex-col relative group">
      <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6321] animate-pulse" />
        Swarm Communication Log
      </div>
      
      <div ref={terminalRef} className="flex-1 overflow-y-auto space-y-1 mt-6 mb-2 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2 group/msg">
            <span className="text-gray-700 shrink-0">[{new Date(msg.timestamp).toLocaleTimeString([], { hour12: false })}]</span>
            <span className={`shrink-0 ${msg.from === "SYSTEM" ? "text-red-400" : msg.from === "USER" ? "text-blue-400" : "text-[#FF6321]"}`}>
              {msg.from}:
            </span>
            <span className="text-gray-400 group-hover/msg:text-gray-200 transition-colors">{msg.content}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-[#1a1a1a]">
        <span className="text-[#FF6321] font-bold">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter swarm command..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-800"
          autoFocus
        />
      </form>

      <div className="scanline pointer-events-none" />
    </div>
  );
};

export default Terminal;

