/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Agent, AgentStatus } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface SwarmVisualizationProps {
  agents: Agent[];
}

const SwarmVisualization: React.FC<SwarmVisualizationProps> = ({ agents }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove();

    // Create links for a mesh-like network
    const links: any[] = [];
    agents.forEach((agent, i) => {
      // Connect to next agent
      links.push({
        source: agent.id,
        target: agents[(i + 1) % agents.length].id,
      });
      // Connect to agent across the circle
      if (agents.length > 3) {
        links.push({
          source: agent.id,
          target: agents[(i + Math.floor(agents.length / 2)) % agents.length].id,
        });
      }
    });

    // Force simulation
    const simulation = d3.forceSimulation(agents as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(60));

    // Links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#1a1a1a")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1);

    // Nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(agents)
      .enter().append("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => setSelectedAgent(d))
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Node Glow
    node.append("circle")
      .attr("r", 20)
      .attr("fill", d => d.color)
      .attr("opacity", 0.1)
      .attr("class", "pulse-glow");

    // Node Circle
    node.append("circle")
      .attr("r", 12)
      .attr("fill", d => d.status === AgentStatus.OFFLINE ? "#333" : d.color)
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 2);

    // Node Label
    node.append("text")
      .attr("dx", 18)
      .attr("dy", 4)
      .attr("fill", d => d.status === AgentStatus.OFFLINE ? "#555" : "#fff")
      .style("font-size", "10px")
      .style("font-family", "JetBrains Mono, monospace")
      .style("font-weight", "bold")
      .style("text-transform", "uppercase")
      .style("letter-spacing", "1px")
      .text(d => d.name);

    // Status Indicator
    node.append("circle")
      .attr("r", 3)
      .attr("cx", 0)
      .attr("cy", -18)
      .attr("fill", d => d.status === AgentStatus.IDLE ? "#4ade80" : d.status === AgentStatus.BUSY ? "#f87171" : "#555");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [agents]);

  return (
    <div className="w-full h-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden relative group">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">Swarm Topology</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[9px] font-mono text-gray-600 uppercase">Idle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-[9px] font-mono text-gray-600 uppercase">Busy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            <span className="text-[9px] font-mono text-gray-600 uppercase">Offline</span>
          </div>
        </div>
      </div>

      <svg ref={svgRef} className="w-full h-full" />

      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 w-48 bg-[#111]/90 backdrop-blur-md border border-[#222] p-4 rounded-lg z-20"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-[#FF6321] uppercase tracking-widest">Agent Info</span>
              <button onClick={() => setSelectedAgent(null)} className="text-gray-600 hover:text-white">×</button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[9px] font-mono text-gray-600 uppercase">Name</div>
                <div className="text-xs font-mono font-bold text-white uppercase">{selectedAgent.name}</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-gray-600 uppercase">Role</div>
                <div className="text-xs font-mono text-white uppercase">{selectedAgent.role}</div>
              </div>
              <div>
                <div className="text-[9px] font-mono text-gray-600 uppercase">Status</div>
                <div className={`text-xs font-mono uppercase ${selectedAgent.status === AgentStatus.IDLE ? "text-green-400" : "text-red-400"}`}>
                  {selectedAgent.status}
                </div>
              </div>
              <button className="w-full py-1.5 bg-[#FF6321] text-black text-[9px] font-mono font-bold uppercase tracking-widest rounded hover:bg-[#FF8341] transition-colors">
                Ping Agent
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div className="text-[9px] font-mono text-gray-700 uppercase tracking-[0.2em]">
          Mesh Network: Active / Nodes: {agents.length}
        </div>
      </div>
      
      <style>{`
        .pulse-glow {
          animation: pulse 3s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.5); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default SwarmVisualization;

