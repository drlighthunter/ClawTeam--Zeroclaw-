/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AgentStatus {
  IDLE = "IDLE",
  BUSY = "BUSY",
  OFFLINE = "OFFLINE",
  ERROR = "ERROR",
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  lastMessage?: string;
  tasks: string[]; // Task IDs
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string; // Agent ID
  dependencies: string[]; // Task IDs
  createdAt: number;
}

export interface Message {
  id: string;
  from: string; // Agent ID or "SYSTEM"
  to: string; // Agent ID or "ALL"
  content: string;
  timestamp: number;
}
