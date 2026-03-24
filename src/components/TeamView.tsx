/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Agent } from "../types";
import AgentCard from "./AgentCard";
import { Plus } from "lucide-react";

interface TeamViewProps {
  agents: Agent[];
}

const TeamView: React.FC<TeamViewProps> = ({ agents }) => {
  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-mono font-bold text-white uppercase tracking-widest">Team Management</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Manage your ZeroClaw swarm agents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6321] text-black rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#FF8341] transition-colors">
          <Plus size={16} />
          <span>Deploy New Agent</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-8 border-2 border-dashed border-[#222] rounded-lg flex flex-col items-center justify-center gap-4 text-gray-600 hover:border-[#FF6321] hover:text-[#FF6321] transition-all"
        >
          <Plus size={32} />
          <span className="text-xs font-mono font-bold uppercase tracking-widest">Add Agent</span>
        </motion.button>
      </div>
    </div>
  );
};

export default TeamView;
