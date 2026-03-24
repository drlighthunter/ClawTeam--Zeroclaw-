/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "00:00", cpu: 42, mem: 28, net: 2400 },
  { name: "02:00", cpu: 35, mem: 32, net: 2100 },
  { name: "04:00", cpu: 30, mem: 35, net: 2210 },
  { name: "06:00", cpu: 45, mem: 40, net: 2300 },
  { name: "08:00", cpu: 55, mem: 45, net: 2290 },
  { name: "10:00", cpu: 65, mem: 50, net: 2100 },
  { name: "12:00", cpu: 50, mem: 48, net: 2000 },
  { name: "14:00", cpu: 40, mem: 42, net: 2150 },
  { name: "16:00", cpu: 38, mem: 38, net: 2181 },
  { name: "18:00", cpu: 45, mem: 40, net: 2300 },
  { name: "20:00", cpu: 52, mem: 44, net: 2500 },
  { name: "22:00", cpu: 48, mem: 42, net: 2300 },
  { name: "24:00", cpu: 40, mem: 40, net: 2100 },
];

const MonitoringChart: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 relative group">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Resource Utilization</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6321]" />
            <span className="text-[9px] font-mono text-gray-600 uppercase">CPU</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[9px] font-mono text-gray-600 uppercase">MEM</span>
          </div>
        </div>
      </div>

      <div className="w-full h-full pt-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6321" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#222" 
              fontSize={8} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#444', fontFamily: 'JetBrains Mono' }}
            />
            <YAxis 
              stroke="#222" 
              fontSize={8} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#444', fontFamily: 'JetBrains Mono' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "#0a0a0a", 
                border: "1px solid #222", 
                fontSize: "10px", 
                fontFamily: "JetBrains Mono",
                borderRadius: "4px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
              }}
              itemStyle={{ color: "#FF6321" }}
              cursor={{ stroke: '#333', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="cpu" 
              stroke="#FF6321" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorCpu)" 
              animationDuration={2000}
            />
            <Area 
              type="monotone" 
              dataKey="mem" 
              stroke="#60a5fa" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorMem)" 
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="scanline pointer-events-none" />
    </div>
  );
};

export default MonitoringChart;

