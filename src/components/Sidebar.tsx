/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { LayoutDashboard, Users, ListTodo, Activity, Settings, HelpCircle, Terminal as TerminalIcon } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "team", label: "Team", icon: Users },
    { id: "tasks", label: "Tasks", icon: ListTodo },
    { id: "monitoring", label: "Monitoring", icon: Activity },
    { id: "terminal", label: "Terminal", icon: TerminalIcon },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  return (
    <div className="w-64 h-full bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col p-4 relative">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-[#FF6321] rounded-lg flex items-center justify-center text-black font-bold text-xl">
          🦀
        </div>
        <div>
          <h1 className="text-sm font-mono font-bold text-white uppercase tracking-widest">ZeroClaw</h1>
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Swarm Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${
              activeTab === item.id
                ? "bg-[#FF6321]/10 text-[#FF6321] border border-[#FF6321]/20"
                : "text-gray-500 hover:text-white hover:bg-[#111]"
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                layoutId="active-nav"
                className="ml-auto w-1 h-4 bg-[#FF6321] rounded-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="space-y-1 pt-4 border-t border-[#1a1a1a]">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white hover:bg-[#111] transition-all"
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 p-3 bg-[#111] border border-[#222] rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-gray-600 uppercase">System Status</span>
          <span className="text-[10px] font-mono text-green-400 uppercase">Online</span>
        </div>
        <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full w-full bg-green-400/50" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
