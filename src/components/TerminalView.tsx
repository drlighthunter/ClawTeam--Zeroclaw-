/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Terminal from "./Terminal";
import { Message } from "../types";

interface TerminalViewProps {
  messages: Message[];
  onCommand?: (command: string) => void;
}

const TerminalView: React.FC<TerminalViewProps> = ({ messages, onCommand }) => {
  return (
    <div className="p-6 h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-mono font-bold text-white uppercase tracking-widest">Swarm Terminal</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Direct communication log with ZeroClaw agents</p>
        </div>
        <button className="px-4 py-2 bg-[#111] border border-[#222] text-gray-400 rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:text-white hover:border-[#333] transition-colors">
          Clear Logs
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <Terminal messages={messages} onCommand={onCommand} />
      </div>
    </div>
  );
};

export default TerminalView;
