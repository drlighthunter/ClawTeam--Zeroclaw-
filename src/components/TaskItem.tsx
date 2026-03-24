/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Task, TaskStatus } from "../types";
import { CheckCircle, Clock, AlertCircle, Play, Layers, User } from "lucide-react";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return <CheckCircle size={12} className="text-green-400" />;
      case TaskStatus.IN_PROGRESS: return <Play size={12} className="text-[#FF6321] fill-[#FF6321]/20 animate-pulse" />;
      case TaskStatus.PENDING: return <Clock size={12} className="text-gray-600" />;
      case TaskStatus.FAILED: return <AlertCircle size={12} className="text-red-400" />;
      default: return <Clock size={12} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return "border-green-400/30 bg-green-400/5";
      case TaskStatus.IN_PROGRESS: return "border-[#FF6321]/30 bg-[#FF6321]/5";
      case TaskStatus.FAILED: return "border-red-400/30 bg-red-400/5";
      default: return "border-[#1a1a1a] bg-[#0a0a0a]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, borderColor: "#FF632140" }}
      className={`p-3 border rounded-lg transition-all group mb-3 relative overflow-hidden ${getStatusColor(task.status)}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#111] border border-[#222]">
            {getStatusIcon(task.status)}
          </div>
          <h4 className="text-[11px] font-mono font-bold text-white group-hover:text-[#FF6321] transition-colors uppercase tracking-tight">
            {task.title}
          </h4>
        </div>
        <div className="text-[8px] font-mono text-gray-700 uppercase tracking-widest bg-[#111] px-1.5 py-0.5 rounded">
          {task.id}
        </div>
      </div>

      <p className="text-[10px] text-gray-500 font-mono mb-3 line-clamp-2 leading-relaxed uppercase tracking-tight">
        {task.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-[8px] text-gray-600 font-mono uppercase tracking-widest">
          <User size={8} className="text-gray-700" />
          <span className={task.assignedTo ? "text-gray-400" : "text-red-400/50"}>
            {task.assignedTo || "UNASSIGNED"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] text-gray-600 font-mono uppercase tracking-widest">
          <Layers size={8} className="text-gray-700" />
          <span>Deps: {task.dependencies.length}</span>
        </div>
      </div>

      {task.status === TaskStatus.IN_PROGRESS && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-[8px] text-gray-700 font-mono uppercase tracking-widest">
            <span>Execution Progress</span>
            <span>45%</span>
          </div>
          <div className="w-full h-0.5 bg-[#111] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              className="h-full bg-[#FF6321] shadow-[0_0_8px_rgba(255,99,33,0.5)]"
            />
          </div>
        </div>
      )}

      {task.status === TaskStatus.COMPLETED && (
        <div className="text-[8px] font-mono text-green-400/50 uppercase tracking-widest flex items-center gap-1">
          <CheckCircle size={8} />
          <span>Verification Complete</span>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;

