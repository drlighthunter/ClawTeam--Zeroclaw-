/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Settings, Shield, Globe, Terminal, Cpu, Zap } from "lucide-react";

const SettingsView: React.FC = () => {
  const settingsGroups = [
    {
      title: "Core Configuration",
      icon: Settings,
      items: [
        { label: "Swarm ID", value: "ZC-SWARM-99X", type: "text" },
        { label: "Agent Model", value: "Gemini 3.1 Pro", type: "select" },
        { label: "Max Parallel Tasks", value: "8", type: "number" },
      ],
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      items: [
        { label: "Workspace Isolation", value: "Enabled", type: "toggle" },
        { label: "Exec Approvals", value: "Required", type: "toggle" },
        { label: "Data Retention", value: "30 Days", type: "select" },
      ],
    },
    {
      title: "Network & API",
      icon: Globe,
      items: [
        { label: "API Endpoint", value: "https://api.zeroclaw.ai/v1", type: "text" },
        { label: "Tunneling", value: "Active", type: "toggle" },
        { label: "Rate Limiting", value: "1000 req/min", type: "text" },
      ],
    },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-mono font-bold text-white uppercase tracking-widest">Swarm Settings</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Configure your ZeroClaw environment</p>
        </div>
        <button className="px-4 py-2 bg-[#FF6321] text-black rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#FF8341] transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {settingsGroups.map((group) => (
          <div key={group.title} className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <group.icon size={18} className="text-[#FF6321]" />
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">{group.title}</h3>
            </div>
            <div className="space-y-4">
              {group.items.map((item) => (
                <div key={item.label} className="p-4 bg-[#111] border border-[#222] rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.label}</span>
                    {item.type === "toggle" && (
                      <div className="w-8 h-4 bg-[#FF6321]/20 rounded-full relative cursor-pointer">
                        <div className="absolute right-0 w-4 h-4 bg-[#FF6321] rounded-full shadow-lg" />
                      </div>
                    )}
                  </div>
                  {item.type !== "toggle" && (
                    <input
                      type="text"
                      defaultValue={item.value}
                      className="w-full bg-transparent border-b border-[#222] py-1 text-xs font-mono text-white focus:border-[#FF6321] outline-none transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsView;
