/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Agent, AgentStatus } from "../types";
import { Activity, Terminal, Shield, Cpu, AlertCircle, Fingerprint, Zap } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.IDLE: return "text-blue-400 border-blue-400/20 bg-blue-400/5";
      case AgentStatus.BUSY: return "text-green-400 border-green-400/20 bg-green-400/5";
      case AgentStatus.OFFLINE: return "text-gray-500 border-gray-500/20 bg-gray-500/5";
      case AgentStatus.ERROR: return "text-red-400 border-red-400/20 bg-red-400/5";
      default: return "text-gray-400 border-gray-400/20 bg-gray-400/5";
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes("Coordinator")) return <Activity size={12} />;
    if (role.includes("Engineer")) return <Terminal size={12} />;
    if (role.includes("Security")) return <Shield size={12} />;
    if (role.includes("Infrastructure")) return <Cpu size={12} />;
    return <AlertCircle size={12} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: agent.color + "40" }}
      className="p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg transition-all group relative overflow-hidden"
    >
      {/* Background ID accent */}
      <div className="absolute -right-2 -bottom-2 text-[40px] font-mono font-bold text-white/[0.02] pointer-events-none select-none uppercase">
        {agent.id.split("-")[1]}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center text-[#FF6321] group-hover:border-[#FF6321]/30 transition-colors">
              {getRoleIcon(agent.role)}
            </div>
            <div 
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0a0a]"
              style={{ backgroundColor: agent.status === AgentStatus.OFFLINE ? "#333" : agent.color }}
            />
          </div>
          <div>
            <h3 className="text-sm font-mono font-bold text-white group-hover:text-[#FF6321] transition-colors uppercase tracking-tight">
              {agent.name}
            </h3>
            <div className="flex items-center gap-1.5 text-[9px] text-gray-600 font-mono uppercase tracking-widest">
              <Fingerprint size={8} />
              <span>{agent.id}</span>
            </div>
          </div>
        </div>
        <div className={`px-2 py-0.5 border rounded text-[9px] font-mono uppercase tracking-widest ${getStatusColor(agent.status)}`}>
          {agent.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Role</div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">{agent.role}</div>
        </div>
        <div className="space-y-1">
          <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Load</div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">{agent.tasks.length} Active Tasks</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[8px] text-gray-700 font-mono uppercase tracking-widest">
          <span>Resource Allocation</span>
          <span>{agent.status === AgentStatus.BUSY ? "78%" : agent.status === AgentStatus.IDLE ? "12%" : "0%"}</span>
        </div>
        <div className="w-full h-1 bg-[#111] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: agent.status === AgentStatus.BUSY ? "78%" : agent.status === AgentStatus.IDLE ? "12%" : "0%" }}
            className="h-full shadow-[0_0_8px_rgba(255,99,33,0.3)]"
            style={{ backgroundColor: agent.color }}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#1a1a1a] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-[9px] font-mono font-bold text-gray-500 hover:text-[#FF6321] uppercase tracking-widest transition-colors">
          View Logs
        </button>
        <button className="flex items-center gap-1 text-[9px] font-mono font-bold text-gray-500 hover:text-[#FF6321] uppercase tracking-widest transition-colors">
          <Zap size={10} />
          <span>Sync</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AgentCard;

