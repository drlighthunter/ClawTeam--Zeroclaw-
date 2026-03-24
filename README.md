# ZeroClaw Swarm Dashboard

> **Note:** This repository is a specialized fork of the original swarm coordination dashboard, extensively optimized and hardened for the **ZeroClaw** ecosystem.

## Overview

The ZeroClaw Swarm Dashboard is a high-performance, low-latency coordination layer designed for managing distributed autonomous agent swarms. It provides real-time visibility into swarm topology, task execution, and resource utilization.

## ZeroClaw Optimizations

This fork introduces several critical enhancements tailored for ZeroClaw operations:

- **Topology Mesh Engine**: Re-engineered D3.js visualization to support complex mesh network topologies with interactive node inspection.
- **Hardened Command Layer**: A functional terminal interface for direct swarm interaction, supporting a custom command set (`ping`, `status`, `agents`, etc.).
- **Resource Fingerprinting**: Enhanced agent metadata including unique hardware-linked fingerprints and granular resource allocation tracking.
- **High-Density UI**: A refined "Technical Dashboard" aesthetic (Recipe 1) optimized for information density and long-term monitoring without eye strain.
- **Reactive State Management**: Optimized React hooks and memoization patterns to handle high-frequency heartbeat signals from 50+ concurrent agents.

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS (Utility-first)
- **Animations**: Motion (formerly Framer Motion)
- **Data Visualization**: D3.js (Swarm Topology)
- **Analytics**: Recharts (Performance Metrics)
- **Icons**: Lucide React

## Getting Started

1. **Initialize Swarm**:
   ```bash
   npm install
   npm run dev
   ```
2. **Access Dashboard**: Open `http://localhost:3000`
3. **Connect Agents**: Use the `ping` command in the terminal to verify agent connectivity.

## License

SPDX-License-Identifier: Apache-2.0
© 2026 ZeroClaw Labs
