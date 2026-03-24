/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TeamView from "./components/TeamView";
import TaskView from "./components/TaskView";
import MonitoringView from "./components/MonitoringView";
import TerminalView from "./components/TerminalView";
import SettingsView from "./components/SettingsView";
import HelpView from "./components/HelpView";
import { INITIAL_AGENTS, INITIAL_TASKS } from "./constants";
import { Agent, Task, Message, AgentStatus, TaskStatus } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-1", from: "SYSTEM", to: "ALL", content: "ZeroClaw Swarm Coordination Layer initialized.", timestamp: Date.now() - 5000 },
    { id: "msg-2", from: "ZeroClaw-Core", to: "ALL", content: "Scanning for active agents...", timestamp: Date.now() - 4000 },
    { id: "msg-3", from: "ZeroClaw-Dev", to: "ZeroClaw-Core", content: "Agent online. Ready for task assignment.", timestamp: Date.now() - 3000 },
    { id: "msg-4", from: "ZeroClaw-Sec", to: "ZeroClaw-Core", content: "Security protocols active. Monitoring swarm integrity.", timestamp: Date.now() - 2000 },
  ]);

  const addMessage = useCallback((from: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      from,
      to: "ALL",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev.slice(-99), newMessage]);
  }, []);

  const handleCommand = useCallback((command: string) => {
    addMessage("USER", command);
    
    const cmd = command.toLowerCase().trim();
    
    setTimeout(() => {
      if (cmd === "help") {
        addMessage("SYSTEM", "Available commands: help, status, agents, tasks, clear, ping [agent]");
      } else if (cmd === "status") {
        addMessage("SYSTEM", `Swarm Status: ONLINE. Active Agents: ${agents.filter(a => a.status !== AgentStatus.OFFLINE).length}. Pending Tasks: ${tasks.filter(t => t.status === TaskStatus.PENDING).length}.`);
      } else if (cmd === "agents") {
        addMessage("SYSTEM", `Agents: ${agents.map(a => `${a.name} (${a.status})`).join(", ")}`);
      } else if (cmd === "tasks") {
        addMessage("SYSTEM", `Active Tasks: ${tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).map(t => t.title).join(", ") || "None"}`);
      } else if (cmd === "clear") {
        setMessages([]);
      } else if (cmd.startsWith("ping ")) {
        const agentName = command.split(" ")[1];
        const agent = agents.find(a => a.name.toLowerCase() === agentName.toLowerCase());
        if (agent) {
          addMessage("SYSTEM", `Pinging ${agent.name}...`);
          setTimeout(() => addMessage(agent.name, "PONG. Connection stable."), 500);
        } else {
          addMessage("SYSTEM", `Error: Agent '${agentName}' not found.`);
        }
      } else {
        addMessage("SYSTEM", `Unknown command: '${command}'. Type 'help' for available commands.`);
      }
    }, 200);
  }, [agents, tasks, addMessage]);

  // Simulate agent activity
  useEffect(() => {
    const interval = setInterval(() => {
      const activeAgents = agents.filter(a => a.status !== AgentStatus.OFFLINE);
      if (activeAgents.length === 0) return;
      
      const randomAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
      
      const phrases = [
        "Heartbeat signal stable.",
        "Monitoring background processes.",
        "Optimizing resource allocation.",
        "Scanning for potential bottlenecks.",
        "Waiting for next task assignment.",
      ];
      
      addMessage(randomAgent.name, phrases[Math.floor(Math.random() * phrases.length)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [agents, addMessage]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard agents={agents} tasks={tasks} messages={messages} onCommand={handleCommand} />;
      case "team":
        return <TeamView agents={agents} />;
      case "tasks":
        return <TaskView tasks={tasks} />;
      case "monitoring":
        return <MonitoringView />;
      case "terminal":
        return <TerminalView messages={messages} onCommand={handleCommand} />;
      case "settings":
        return <SettingsView />;
      case "help":
        return <HelpView />;
      default:
        return <Dashboard agents={agents} tasks={tasks} messages={messages} onCommand={handleCommand} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-[#FF6321]/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 h-full relative overflow-hidden flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-[#1a1a1a] flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400">
              Swarm / <span className="text-white">{activeTab}</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Swarm Sync Active</span>
            </div>
            <div className="h-4 w-[1px] bg-[#1a1a1a]" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[10px] font-mono font-bold text-[#FF6321]">
                SG
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">sunilgenext</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer / Status Bar */}
        <footer className="h-8 border-t border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-between px-6 text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <span>Version: 2.1.0-zeroclaw</span>
            <span>Region: asia-east1</span>
            <span>Latency: 12ms</span>
          </div>
          <div className="flex items-center gap-6">
            <span>API: Connected</span>
            <span>Database: Ready</span>
            <span className="text-[#FF6321]">© 2026 ZeroClaw Labs</span>
          </div>
        </footer>
      </main>
    </div>
  );
}


