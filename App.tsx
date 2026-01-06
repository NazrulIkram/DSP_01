import React, { useState } from 'react';
import { LayoutDashboard, MessageSquareText, FileBarChart, Users, Sparkles } from 'lucide-react';
import PredictionDashboard from './components/PredictionDashboard';
import AiAssistant from './components/AiAssistant';
import ExecutiveReport from './components/ExecutiveReport';

type Tab = 'dashboard' | 'chat' | 'report';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                <Users className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
                HR Intelligence <span className="font-light text-slate-400">Hub</span>
              </h1>
            </div>
            
            <div className="flex space-x-1 items-center">
              {[
                { id: 'dashboard', label: 'Risk Analysis', icon: LayoutDashboard },
                { id: 'chat', label: 'AI Partner', icon: MessageSquareText },
                { id: 'report', label: 'Reports', icon: FileBarChart },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${activeTab === item.id 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
                  `}
                >
                  <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="animate-fade-in transition-all duration-500 ease-in-out">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Retention Risk Calculator</h2>
                  <p className="text-slate-500 mt-2 max-w-2xl">
                    Utilize ML models to analyze employee parameters and generate real-time attrition probability scores with actionable AI advice.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full font-medium">
                  <Sparkles className="w-4 h-4" />
                  Model Accuracy: 89.4%
                </div>
              </div>
              <PredictionDashboard />
            </div>
          )}
          
          {activeTab === 'chat' && (
            <div className="max-w-5xl mx-auto h-[calc(100vh-140px)]">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-slate-900">AI HR Partner</h2>
                <p className="text-slate-500 mt-2">Your intelligent assistant for workforce trends, policies, and data insights.</p>
              </div>
              <div className="h-[calc(100%-100px)]">
                <AiAssistant />
              </div>
            </div>
          )}
          
          {activeTab === 'report' && (
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Executive Reporting</h2>
                <p className="text-slate-500 mt-2">Generate professional, formatted summaries tailored for C-suite presentations.</p>
              </div>
              <ExecutiveReport />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;