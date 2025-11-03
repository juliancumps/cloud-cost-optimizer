import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                CloudOptimize
              </h1>
            </div>
            <nav className="flex gap-1">
              {['overview', 'costs', 'forecast', 'recommendations'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to CloudOptimize 🚀
          </h2>
          <p className="text-slate-600 mb-6">
            Your AI-powered cloud cost optimization platform is now running!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">$0</div>
              <div className="text-sm text-blue-800 mt-1">Total Spend (MTD)</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">$0</div>
              <div className="text-sm text-green-800 mt-1">Potential Savings</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-sm text-purple-800 mt-1">Recommendations</div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-100 rounded-lg">
            <p className="text-sm text-slate-700">
              <strong>✅ Setup Complete!</strong> Your development environment is ready. 
              Next step: Create mock data and build your first chart.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
