/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Agent, AgentStatus, Task, TaskStatus } from "./types";

export const INITIAL_AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "ZeroClaw-Core",
    role: "Swarm Coordinator",
    status: AgentStatus.IDLE,
    tasks: ["task-1"],
    color: "#FF6321", // ZeroClaw Orange
  },
  {
    id: "agent-2",
    name: "ZeroClaw-Dev",
    role: "Software Engineer",
    status: AgentStatus.BUSY,
    tasks: ["task-2"],
    color: "#00FF00", // Brutalist Green
  },
  {
    id: "agent-3",
    name: "ZeroClaw-Sec",
    role: "Security Auditor",
    status: AgentStatus.IDLE,
    tasks: ["task-3"],
    color: "#00CCFF", // Tech Blue
  },
  {
    id: "agent-4",
    name: "ZeroClaw-Ops",
    role: "Infrastructure",
    status: AgentStatus.OFFLINE,
    tasks: [],
    color: "#FF00FF", // Magenta
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Swarm Initialization",
    description: "Bootstrapping the multi-agent coordination layer.",
    status: TaskStatus.COMPLETED,
    assignedTo: "agent-1",
    dependencies: [],
    createdAt: Date.now() - 3600000,
  },
  {
    id: "task-2",
    title: "Refactor OpenClaw Skill",
    description: "Migrating the OpenClaw skill to ZeroClaw architecture.",
    status: TaskStatus.IN_PROGRESS,
    assignedTo: "agent-2",
    dependencies: ["task-1"],
    createdAt: Date.now() - 1800000,
  },
  {
    id: "task-3",
    title: "Security Audit (ZeroClaw)",
    description: "Auditing the new ZeroClaw-ready coordination layer.",
    status: TaskStatus.PENDING,
    assignedTo: "agent-3",
    dependencies: ["task-2"],
    createdAt: Date.now() - 900000,
  },
];
