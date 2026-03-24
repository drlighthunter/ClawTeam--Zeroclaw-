/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Agent, Task, Message } from "../types";
import AgentCard from "./AgentCard";
import TaskItem from "./TaskItem";
import SwarmVisualization from "./SwarmVisualization";
import MonitoringChart from "./MonitoringChart";
import Terminal from "./Terminal";

interface DashboardProps {
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  onCommand?: (command: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ agents, tasks, messages, onCommand }) => {
  return (
    <div className="grid grid-cols-12 gap-6 p-6 h-full overflow-y-auto scrollbar-hide">
      {/* Top Row: Stats & Visualization */}
      <div className="col-span-12 lg:col-span-8 h-[400px]">
        <SwarmVisualization agents={agents} />
      </div>
      <div className="col-span-12 lg:col-span-4 h-[400px]">
        <MonitoringChart />
      </div>

      {/* Middle Row: Agents & Tasks */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Active Agents</h2>
          <button className="text-[10px] font-mono text-[#FF6321] uppercase tracking-widest hover:underline">View All Agents</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Task Queue</h2>
          <button className="text-[10px] font-mono text-[#FF6321] uppercase tracking-widest hover:underline">View All Tasks</button>
        </div>
        <div className="space-y-1">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Bottom Row: Terminal */}
      <div className="col-span-12 h-[300px]">
        <Terminal messages={messages} onCommand={onCommand} />
      </div>
    </div>
  );
};

export default Dashboard;
