/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import MonitoringChart from "./MonitoringChart";
import { Activity, Cpu, Database, Globe, Shield, Zap } from "lucide-react";

const MonitoringView: React.FC = () => {
  const stats = [
    { label: "CPU Usage", value: "24%", icon: Cpu, color: "text-blue-400" },
    { label: "Memory", value: "4.2 GB", icon: Database, color: "text-green-400" },
    { label: "Network", value: "1.2 GB/s", icon: Globe, color: "text-purple-400" },
    { label: "Security", value: "Active", icon: Shield, color: "text-red-400" },
    { label: "Swarm Latency", value: "12ms", icon: Zap, color: "text-yellow-400" },
    { label: "Active Nodes", value: "12", icon: Activity, color: "text-[#FF6321]" },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-mono font-bold text-white uppercase tracking-widest">Swarm Monitoring</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Real-time performance metrics for ZeroClaw</p>
        </div>
        <button className="px-4 py-2 bg-[#111] border border-[#222] text-gray-400 rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:text-white hover:border-[#333] transition-colors">
          Export Metrics
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="p-4 bg-[#111] border border-[#222] rounded-lg flex flex-col items-center justify-center gap-2 text-center"
          >
            <stat.icon size={24} className={stat.color} />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</span>
            <span className="text-lg font-mono font-bold text-white">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <MonitoringChart />
        <div className="bg-[#111] border border-[#222] rounded-lg p-6 flex flex-col gap-6">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">System Health Logs</h3>
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[11px] text-gray-500">
            <div className="flex gap-2">
              <span className="text-gray-700">[12:44:01]</span>
              <span className="text-green-400">INFO:</span>
              <span>Swarm node 0x12a connected successfully.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-700">[12:44:05]</span>
              <span className="text-blue-400">DEBUG:</span>
              <span>Rebalancing task load across 4 agents.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-700">[12:44:12]</span>
              <span className="text-yellow-400">WARN:</span>
              <span>Latency spike detected in region us-east-1.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-700">[12:44:15]</span>
              <span className="text-green-400">INFO:</span>
              <span>ZeroClaw-Sec completed audit of task-3.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringView;
