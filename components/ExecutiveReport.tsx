import React, { useState } from 'react';
import { generateExecutiveReport } from '../services/geminiService';
import { FileText, Download, Loader2, ClipboardCheck, Printer, Share2 } from 'lucide-react';

const ExecutiveReport: React.FC = () => {
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const text = await generateExecutiveReport();
    setReport(text);
    setLoading(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Control Panel */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
             <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-900">Generate Monthly Strategy Report</h2>
                <p className="text-slate-500 text-sm mt-1 max-w-md">
                    Create a formal executive summary analyzing current attrition drivers and strategic recommendations.
                </p>
            </div>
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full md:w-auto py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Drafting Document...
            </>
          ) : (
            <>
              <ClipboardCheck className="w-4 h-4" />
              Generate Report
            </>
          )}
        </button>
      </div>

      {/* Document View */}
      {report ? (
        <div className="animate-fade-in-up">
            <div className="flex justify-end gap-3 mb-4 px-4 max-w-3xl mx-auto">
                 <button className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                    <Printer className="w-4 h-4" /> Print
                 </button>
                 <button className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                    <Download className="w-4 h-4" /> PDF
                 </button>
                 <button className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                 </button>
            </div>

            {/* A4 Paper Effect */}
            <div className="bg-white max-w-3xl mx-auto min-h-[800px] shadow-2xl shadow-slate-200 border border-slate-100 rounded-sm p-12 md:p-16 relative">
                 {/* Header Decoration */}
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-900"></div>
                 
                 <div className="mb-12 border-b border-slate-200 pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Executive Summary</h1>
                        <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">Confidential • Internal Distribution</p>
                    </div>
                    <div className="text-right">
                         <p className="text-sm text-slate-400">{new Date().toLocaleDateString()}</p>
                         <p className="text-indigo-600 font-bold text-sm">HR Intelligence Hub</p>
                    </div>
                 </div>

                <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600">
                {/* Clean Markdown Rendering */}
                {report.split('\n').map((line, i) => {
                    if (line.trim() === '') return <br key={i} />;
                    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mb-4 mt-6 text-indigo-950 border-b pb-2">{line.replace('# ', '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-slate-800">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-slate-700">{line.replace('### ', '')}</h3>;
                    if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc marker:text-indigo-400 pl-1 mb-1">{line.replace('- ', '')}</li>;
                    if (line.match(/^\d\./)) return <li key={i} className="ml-4 list-decimal marker:text-indigo-600 pl-1 mb-1 font-medium">{line.replace(/^\d\.\s/, '')}</li>;
                    return <p key={i} className="mb-3 leading-relaxed text-justify">{line}</p>;
                })}
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Generated by Gemini AI Model v3.0</span>
                    <span>Page 1 of 1</span>
                </div>
            </div>
        </div>
      ) : (
          <div className="max-w-3xl mx-auto h-96 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
             <FileText className="w-16 h-16 mb-4 opacity-20" />
             <p className="font-medium">No report generated yet</p>
          </div>
      )}
    </div>
  );
};

export default ExecutiveReport;