/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Task, TaskStatus } from "../types";
import TaskItem from "./TaskItem";
import { Plus, Filter, Search } from "lucide-react";

interface TaskViewProps {
  tasks: Task[];
}

const TaskView: React.FC<TaskViewProps> = ({ tasks }) => {
  const statuses = [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED, TaskStatus.FAILED];

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-mono font-bold text-white uppercase tracking-widest">Task Coordination</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Manage your swarm's task queue</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 bg-[#111] border border-[#222] rounded-lg text-xs font-mono text-white focus:border-[#FF6321] outline-none transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6321] text-black rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#FF8341] transition-colors">
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statuses.map((status) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">{status}</h3>
              <span className="text-[10px] font-mono text-gray-600 bg-[#111] px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === status).length}
              </span>
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status === status).map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
              <button className="w-full py-2 border border-dashed border-[#222] rounded-lg flex items-center justify-center gap-2 text-gray-600 hover:border-[#FF6321] hover:text-[#FF6321] transition-all">
                <Plus size={12} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Add Task</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskView;
