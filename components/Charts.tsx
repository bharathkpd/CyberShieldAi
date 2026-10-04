"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

interface CategoryData {
  name: string;
  count: number;
}

interface TrendData {
  date: string;
  scans: number;
  threats: number;
}

interface StateData {
  state: string;
  reports: number;
  topScam: string;
}

const FORENSIC_PALETTE = [
  "#D62828", // Danger Red
  "#D98E04", // Amber
  "#2F7D4F", // Green
  "#5B6B4A", // Olive
  "#8C7051", // Kraft Paper Brown
  "#44403C", // Deep Ink Soft
];

export const CategoryDonutChart: React.FC<{ data: CategoryData[] }> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="count"
            stroke="#1B1B1B"
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={FORENSIC_PALETTE[index % FORENSIC_PALETTE.length]}
              />
            ))}
          </Pie>
          <RechartsTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0];
                return (
                  <div className="bg-card border-2 border-line p-2.5 shadow-hard-sm font-mono text-12">
                    <p className="font-bold text-ink">{item.name}</p>
                    <p className="text-accent-red font-bold">{item.value} verified cases</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ThreatTrendLineChart: React.FC<{ data: TrendData[] }> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D9D0BC" />
          <XAxis
            dataKey="date"
            stroke="#1B1B1B"
            tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#1B1B1B" }}
          />
          <YAxis
            stroke="#1B1B1B"
            tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#1B1B1B" }}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border-2 border-line p-2.5 shadow-hard-sm font-mono text-12">
                    <p className="font-bold text-ink mb-1">{label}</p>
                    <p className="text-ink">Total Scans: {payload[0]?.value}</p>
                    <p className="text-accent-red font-bold">Threats Blocked: {payload[1]?.value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="scans"
            stroke="#1B1B1B"
            strokeWidth={2}
            dot={{ stroke: "#1B1B1B", strokeWidth: 2, r: 3, fill: "#FFFDF8" }}
          />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="#D62828"
            strokeWidth={2.5}
            dot={{ stroke: "#D62828", strokeWidth: 2, r: 4, fill: "#D62828" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const IndiaStateThreatChart: React.FC<{ data: StateData[] }> = ({ data }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 65, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#D9D0BC" />
          <XAxis
            type="number"
            stroke="#1B1B1B"
            tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#1B1B1B" }}
          />
          <YAxis
            type="category"
            dataKey="state"
            stroke="#1B1B1B"
            tick={{ fontFamily: "IBM Plex Mono", fontSize: 11, fill: "#1B1B1B" }}
          />
          <RechartsTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as StateData;
                return (
                  <div className="bg-card border-2 border-line p-3 shadow-hard-sm font-mono text-12 max-w-xs">
                    <p className="font-bold text-ink">{item.state}</p>
                    <p className="text-accent-red font-bold">{item.reports} Incidents Logged</p>
                    <p className="text-ink-soft text-11 mt-1 font-sans">
                      Top Modus Operandi: <strong>{item.topScam}</strong>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="reports"
            fill="#D62828"
            stroke="#1B1B1B"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
