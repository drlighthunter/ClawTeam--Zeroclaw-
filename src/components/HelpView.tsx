/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { HelpCircle, Book, MessageSquare, Github, ExternalLink } from "lucide-react";

const HelpView: React.FC = () => {
  const resources = [
    { title: "Documentation", description: "Learn how to use ZeroClaw Swarm.", icon: Book, link: "https://docs.zeroclaw.ai" },
    { title: "Community Forum", description: "Join the discussion with other users.", icon: MessageSquare, link: "https://forum.zeroclaw.ai" },
    { title: "GitHub Repository", description: "Contribute to the ZeroClaw project.", icon: Github, link: "https://github.com/zeroclaw-labs/zeroclaw" },
    { title: "API Reference", description: "Explore the ZeroClaw API.", icon: ExternalLink, link: "https://api.zeroclaw.ai/docs" },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-mono font-bold text-white uppercase tracking-widest">Help & Resources</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Everything you need to master ZeroClaw</p>
        </div>
        <button className="px-4 py-2 bg-[#111] border border-[#222] text-gray-400 rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:text-white hover:border-[#333] transition-colors">
          Contact Support
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource) => (
          <motion.a
            key={resource.title}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 bg-[#111] border border-[#222] rounded-lg flex items-center gap-6 hover:border-[#FF6321] transition-all"
          >
            <div className="w-12 h-12 bg-[#FF6321]/10 rounded-lg flex items-center justify-center text-[#FF6321]">
              <resource.icon size={24} />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">{resource.title}</h3>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{resource.description}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-12 p-8 bg-[#111] border border-[#222] rounded-lg">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-4">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-[#FF6321] uppercase tracking-widest">How do I add a new agent?</h4>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
              Navigate to the Team tab and click "Deploy New Agent". You can choose from pre-defined roles or create a custom one.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-[#FF6321] uppercase tracking-widest">What is the difference between OpenClaw and ZeroClaw?</h4>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
              ZeroClaw is a more lightweight, zero-config version of OpenClaw designed for faster deployment and lower resource usage.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-[#FF6321] uppercase tracking-widest">Can I use custom models?</h4>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
              Yes, you can configure custom models in the Settings tab under "Agent Model".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpView;
