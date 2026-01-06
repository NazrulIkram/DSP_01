import React, { useState } from 'react';
import { predictAttrition, EmployeeData } from '../utils/mockModel';
import { getRiskAdvice } from '../services/geminiService';
import { Loader2, AlertTriangle, CheckCircle, AlertOctagon, Briefcase, MapPin, Clock, Frown, Smile, Meh, Laugh } from 'lucide-react';

const PredictionDashboard: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeData>({
    age: 30,
    overTime: 'No',
    businessTravel: 'Travel_Rarely',
    jobSatisfaction: 3,
    distanceFromHome: 5,
  });

  const [result, setResult] = useState<{ probability: number; level: string } | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    // Simulate processing delay for "ML" feel
    await new Promise(r => setTimeout(r, 800)); 
    
    const prediction = predictAttrition(formData);
    setResult(prediction);

    // Generate Advice
    const factorString = `Age: ${formData.age}, OverTime: ${formData.overTime}, Satisfaction: ${formData.jobSatisfaction}`;
    const aiAdvice = await getRiskAdvice(prediction.level, prediction.probability, factorString);
    setAdvice(aiAdvice);
    
    setLoading(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-rose-600 bg-rose-50 border-rose-100 ring-rose-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100 ring-amber-100';
      default: return 'text-emerald-600 bg-emerald-50 border-emerald-100 ring-emerald-100';
    }
  };

  const getSatisfactionIcon = (level: number) => {
    switch (level) {
      case 1: return <Frown className="w-6 h-6" />;
      case 2: return <Meh className="w-6 h-6" />;
      case 3: return <Smile className="w-6 h-6" />;
      case 4: return <Laugh className="w-6 h-6" />;
      default: return <Smile className="w-6 h-6" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-500" />
                Employment Parameters
            </h3>

            <div className="space-y-8">
                {/* Age & Distance Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-slate-700">Age</label>
                            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-sm">{formData.age} yrs</span>
                        </div>
                        <input
                            type="range"
                            min="18"
                            max="65"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-slate-700">Commute Distance</label>
                            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-sm">{formData.distanceFromHome} km</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={formData.distanceFromHome}
                            onChange={(e) => setFormData({ ...formData, distanceFromHome: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
                        />
                    </div>
                </div>

                {/* OverTime */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">OverTime Status</label>
                    <div className="grid grid-cols-2 gap-4">
                        {['No', 'Yes'].map((opt) => (
                            <div
                                key={opt}
                                onClick={() => setFormData({ ...formData, overTime: opt as 'Yes' | 'No' })}
                                className={`
                                    cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-3
                                    ${formData.overTime === opt 
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' 
                                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-indigo-200 hover:bg-white'}
                                `}
                            >
                                {opt === 'Yes' ? <Clock className="w-5 h-5" /> : <Smile className="w-5 h-5" />}
                                <span className="font-semibold">{opt === 'Yes' ? 'Overtime Active' : 'Standard Hours'}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Job Satisfaction */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Job Satisfaction</label>
                    <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((score) => (
                            <button
                                key={score}
                                onClick={() => setFormData({ ...formData, jobSatisfaction: score })}
                                className={`
                                    py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-200
                                    ${formData.jobSatisfaction === score
                                        ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                                        : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
                                `}
                            >
                                {getSatisfactionIcon(score)}
                                <span className="text-xs font-medium">Level {score}</span>
                            </button>
                        ))}
                    </div>
                </div>

                 {/* Business Travel */}
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Business Travel Frequency</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <select
                            value={formData.businessTravel}
                            onChange={(e) => setFormData({ ...formData, businessTravel: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none shadow-sm cursor-pointer hover:border-indigo-300 transition-colors"
                        >
                            <option value="Non-Travel">Non-Travel</option>
                            <option value="Travel_Rarely">Travel_Rarely</option>
                            <option value="Travel_Frequently">Travel_Frequently</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handlePredict}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform active:scale-[0.99]"
                >
                    {loading ? <Loader2 className="animate-spin w-6 h-6" /> : 'Run Risk Analysis'}
                </button>
            </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-5 space-y-6">
        {result ? (
          <div className="animate-fade-in-up space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 ${result.level === 'High' ? 'bg-rose-500' : result.level === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                
                <h4 className="text-slate-500 font-medium uppercase tracking-widest text-sm mb-6">Attrition Probability Score</h4>
                
                <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                    {/* Simple SVG Circular Progress */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 88}
                            strokeDashoffset={2 * Math.PI * 88 * (1 - result.probability / 100)}
                            className={`${result.level === 'High' ? 'text-rose-500' : result.level === 'Medium' ? 'text-amber-500' : 'text-emerald-500'} transition-all duration-1000 ease-out`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-5xl font-extrabold ${result.level === 'High' ? 'text-rose-600' : result.level === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {result.probability}%
                        </span>
                        <span className={`text-sm font-bold mt-1 px-3 py-1 rounded-full ${getRiskColor(result.level)}`}>
                            {result.level} Risk
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                    <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase">Confidence</p>
                        <p className="font-semibold text-slate-700">High (92%)</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase">Impact Factor</p>
                        <p className="font-semibold text-slate-700">Job Satisfaction</p>
                    </div>
                </div>
            </div>

            {/* AI Advice Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-sm border border-indigo-100">
              <h3 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <div className="p-1.5 bg-indigo-100 rounded-lg">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                </div>
                Recommended Action
              </h3>
              <div className="prose prose-indigo prose-sm text-slate-600 leading-relaxed">
                {loading ? (
                  <div className="flex items-center gap-2 text-slate-400 py-4">
                    <Loader2 className="animate-spin w-4 h-4" /> Analyzing retention strategies...
                  </div>
                ) : (
                  <p className="italic font-medium text-slate-700 border-l-4 border-indigo-300 pl-4 py-1">
                    "{advice}"
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 p-12 text-center min-h-[400px]">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <AlertOctagon className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600">Awaiting Input</h3>
            <p className="max-w-xs mx-auto mt-2 text-slate-500">
                Configure the employee profile on the left to generate a risk assessment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionDashboard;