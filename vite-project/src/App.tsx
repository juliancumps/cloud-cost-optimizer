// src/App.tsx - COMPLETE UPDATED VERSION

import { useState, useMemo } from "react";
import {
  TrendingDown,
  DollarSign,
  Zap,
  BarChart3,
  Bell,
  Settings,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";
import "./App.css";
import {
  getDailyCosts,
  getServiceSummaries,
  getTotalCosts,
  getSavingsOpportunities,
  getCostsByRegion,
} from "./data/mockCostData";

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

  // Get data from mock data
  const totalCosts = useMemo(() => getTotalCosts(), []);
  const serviceSummaries = useMemo(() => getServiceSummaries(), []);
  const savingsOpportunities = useMemo(() => getSavingsOpportunities(), []);
  const regionCosts = useMemo(() => getCostsByRegion(), []);

  const dailyCosts = useMemo(() => {
    const allDailyCosts = getDailyCosts();
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    return allDailyCosts.slice(-days);
  }, [dateRange]);

  // Format chart data
  const chartData = useMemo(() => {
    return dailyCosts.map((item) => ({
      date: format(new Date(item.date), "MMM dd"),
      cost: Math.round(item.totalCost * 100) / 100,
      fullDate: item.date,
    }));
  }, [dailyCosts]);

  // Colors for pie chart
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLS45LTItMi0yaC04Yy0xLjEgMC0yIC45LTIgMnY4YzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMnYtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 transform hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CloudOptimize</h1>
                <p className="text-xs text-blue-200">AI-Powered FinOps</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex gap-2">
              {[
                { id: "overview", icon: BarChart3, label: "Overview" },
                { id: "costs", icon: DollarSign, label: "Costs" },
                { id: "forecast", icon: Zap, label: "Forecast" },
                { id: "recommendations", icon: Bell, label: "Savings" },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-blue-600 shadow-lg"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Settings */}
            <button className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Card 1 - Total Spend */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-blue-400" />
                <span className="text-xs text-blue-300 font-medium">MTD</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                ${totalCosts.currentMonth.toLocaleString()}
              </div>
              <div className="text-sm text-blue-200">Total Cloud Spend</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                {totalCosts.percentChange < 0 ? (
                  <>
                    <span className="text-green-400">
                      ↓ {Math.abs(totalCosts.percentChange)}%
                    </span>
                    <span className="text-blue-300">vs last month</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-400">
                      ↑ {totalCosts.percentChange}%
                    </span>
                    <span className="text-blue-300">vs last month</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card 2 - Savings */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="w-8 h-8 text-green-400" />
                <span className="text-xs text-green-300 font-medium">
                  Potential
                </span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                ${totalCosts.totalSavings.toLocaleString()}
              </div>
              <div className="text-sm text-green-200">Monthly Savings</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-green-400">
                  {totalCosts.savingsPercent}%
                </span>
                <span className="text-green-300">of total spend</span>
              </div>
            </div>
          </div>

          {/* Card 3 - Recommendations */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-purple-400" />
                <span className="text-xs text-purple-300 font-medium">
                  Active
                </span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {savingsOpportunities.length}
              </div>
              <div className="text-sm text-purple-200">Optimization Tips</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-purple-400">
                  {
                    savingsOpportunities.filter((o) => o.priority === "high")
                      .length
                  }{" "}
                  high-priority
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Trends Chart */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Cost Trends
              </h2>
              <p className="text-blue-200 text-sm">
                Daily cloud spending over time
              </p>
            </div>

            {/* Date Range Selector */}
            <div className="flex gap-2">
              {(["7d", "30d", "90d"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    dateRange === range
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {range === "7d"
                    ? "7 Days"
                    : range === "30d"
                    ? "30 Days"
                    : "90 Days"}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.6)"
                tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.6)"
                tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Cost",
                ]}
              />
              <Legend wrapperStyle={{ color: "rgba(255,255,255,0.8)" }} />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 3 }}
                activeDot={{ r: 6, fill: "#60a5fa" }}
                name="Daily Cost"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Breakdown and Savings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Service Breakdown */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Top Services (Last 30 Days)
            </h3>
            <div className="space-y-3">
              {serviceSummaries.slice(0, 5).map((service, index) => (
                <div
                  key={service.service}
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-white font-medium">
                        {service.service}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-red-400" />
                      )}
                      {service.trend === "down" && (
                        <TrendingDown className="w-4 h-4 text-green-400" />
                      )}
                      <span className="text-white/60 text-sm">
                        {service.trendPercent}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-white">
                      ${service.totalCost.toLocaleString()}
                    </span>
                    <span className="text-sm text-white/60">
                      {service.percentOfTotal}% of total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Opportunities */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Savings Opportunities
            </h3>
            <div className="space-y-3">
              {savingsOpportunities.slice(0, 5).map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium">
                          {opportunity.title}
                        </h4>
                        {opportunity.priority === "high" && (
                          <span className="px-2 py-0.5 bg-red-500/20 border border-red-400/30 rounded text-xs text-red-300">
                            High
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/60">
                        {opportunity.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-green-400">
                      ${opportunity.potentialSavings}/mo
                    </span>
                    <span className="text-xs text-white/50 capitalize">
                      {opportunity.effort} effort
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm">
            Built with React, TypeScript, and Tailwind CSS • Using Mock Data
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
