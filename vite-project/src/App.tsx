import { useState } from 'react'
import { TrendingDown, DollarSign, Zap, BarChart3, Bell, Settings } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

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
                <h1 className="text-xl font-bold text-white">
                  CloudOptimize
                </h1>
                <p className="text-xs text-blue-200">AI-Powered FinOps</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex gap-2">
              {[
                { id: 'overview', icon: BarChart3, label: 'Overview' },
                { id: 'costs', icon: DollarSign, label: 'Costs' },
                { id: 'forecast', icon: Zap, label: 'Forecast' },
                { id: 'recommendations', icon: Bell, label: 'Savings' }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
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
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-6 shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                Welcome to CloudOptimize
                <span className="inline-block animate-bounce">🚀</span>
              </h2>
              <p className="text-blue-200 text-lg">
                Your AI-powered cloud cost optimization platform is ready to save you money
              </p>
            </div>
            <div className="hidden sm:block px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
              <span className="flex items-center gap-2 text-green-300 text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                System Active
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Card 1 */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-blue-400" />
                  <span className="text-xs text-blue-300 font-medium">MTD</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">$12,847</div>
                <div className="text-sm text-blue-200">Total Cloud Spend</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-green-400">↓ 8.2%</span>
                  <span className="text-blue-300">vs last month</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <TrendingDown className="w-8 h-8 text-green-400" />
                  <span className="text-xs text-green-300 font-medium">Potential</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">$3,421</div>
                <div className="text-sm text-green-200">Monthly Savings</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-green-400">26.6%</span>
                  <span className="text-green-300">of total spend</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-8 h-8 text-purple-400" />
                  <span className="text-xs text-purple-300 font-medium">Active</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">23</div>
                <div className="text-sm text-purple-200">Optimization Tips</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-purple-400">12 high-priority</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: '📊', label: 'View Reports', color: 'blue' },
              { icon: '🎯', label: 'Set Budgets', color: 'green' },
              { icon: '⚡', label: 'Quick Wins', color: 'yellow' },
              { icon: '🔔', label: 'Alerts', color: 'red' }
            ].map((action) => (
              <button
                key={action.label}
                className={`bg-white/5 hover:bg-white/10 border border-white/10 hover:border-${action.color}-400/50 rounded-lg p-4 transition-all group`}
              >
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform">{action.icon}</div>
                <div className="text-sm text-white/80 group-hover:text-white font-medium">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-green-400/20 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">
                Setup Complete!
              </h3>
              <p className="text-blue-200 text-sm mb-3">
                Your development environment is configured and ready. Next step: Connect to AWS Cost Explorer API and start tracking real cloud spending data.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                  ✓ React + TypeScript
                </span>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                  ✓ Tailwind CSS
                </span>
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300">
                  ✓ Recharts
                </span>
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-xs text-yellow-300">
                  → AWS Integration Next
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coming Soon - Charts */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Cost Analytics
            </h3>
            <div className="bg-white/5 border border-dashed border-white/20 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-white/60 text-sm">Interactive charts coming soon</p>
              </div>
            </div>
          </div>

          {/* Coming Soon - Recommendations */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              AI Recommendations
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-white/5 rounded w-1/2"></div>
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
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
