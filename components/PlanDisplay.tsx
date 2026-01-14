import React, { useState } from 'react';
import { StudyPlanResponse, DayPlan, Resource } from '../types';
import { RefreshCw, Save, ArrowRight, ExternalLink, Zap, Coffee, Code, AlertTriangle } from 'lucide-react';

interface PlanDisplayProps {
  plan: StudyPlanResponse;
  onRegenerate: (feedback: string) => void;
  isRegenerating: boolean;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onRegenerate, isRegenerating }) => {
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRegenerate = () => {
    if (!feedback.trim()) return;
    onRegenerate(feedback);
    setShowFeedback(false);
    setFeedback('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Roast Header */}
      <div className="bg-red-100 border-2 border-red-500 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] transform rotate-1 hover:rotate-0 transition-transform duration-300">
         <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white p-2 rounded-lg">
                <AlertTriangle size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-red-800 uppercase tracking-wider">Reality Check</h2>
                <p className="text-lg text-red-900 mt-2 font-medium italic">"{plan.roast}"</p>
            </div>
         </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-yellow-100 border-2 border-yellow-500 rounded-xl p-4 text-center shadow-sm">
        <p className="text-yellow-800 font-medium">✨ {plan.motivationalQuote} ✨</p>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Coffee className="text-indigo-600" />
            The "Get Your Life Together" Schedule
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plan.weeklySchedule.map((day: DayPlan, idx) => (
            <div key={idx} className="bg-white border-2 border-indigo-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center group-hover:bg-indigo-100 transition-colors">
                <h4 className="font-bold text-lg text-indigo-900">{day.day}</h4>
                <span className="text-xs font-bold px-2 py-1 bg-white rounded-full text-indigo-600 border border-indigo-200">
                    {day.theme}
                </span>
              </div>
              <div className="p-4 space-y-4">
                {day.tasks.map((task, tIdx) => (
                  <div key={tIdx} className="flex gap-3 items-start">
                    <div className="min-w-[60px] text-xs font-bold text-gray-400 mt-1">{task.time}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{task.activity}</div>
                      <div className="text-sm text-gray-600 leading-snug">{task.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Advice & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Career Section */}
        <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-6 shadow-md">
            <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Zap className="text-purple-600" />
                Career Cheat Codes
            </h3>
            <p className="text-purple-950 leading-relaxed whitespace-pre-wrap">{plan.careerAdvice}</p>
        </div>

        {/* Resources Section */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Code className="text-green-600" />
                Loot Box
            </h3>
            <ul className="space-y-4">
                {plan.resources.map((res: Resource, idx) => (
                    <li key={idx} className="block group cursor-pointer">
                         <div className="flex items-center justify-between text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                            {res.title}
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                         </div>
                         <div className="text-xs text-gray-500 mt-1">{res.description}</div>
                         <div className="mt-2 inline-block px-2 py-0.5 bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-600 rounded">
                            {res.type}
                         </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>

      {/* Modification Area */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
         {showFeedback && (
             <div className="bg-white border-2 border-gray-800 p-4 rounded-xl shadow-xl w-80 mb-2 animate-slide-up">
                 <label className="block text-sm font-bold text-gray-700 mb-2">What do you want to change?</label>
                 <textarea 
                    className="w-full border-2 border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 resize-none h-24"
                    placeholder="e.g. 'I actually don't study on weekends' or 'I want more React practice'"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                 />
                 <div className="flex justify-end gap-2 mt-2">
                     <button 
                        onClick={() => setShowFeedback(false)}
                        className="text-xs text-gray-500 font-bold hover:text-gray-800 px-2 py-1"
                     >
                        Cancel
                     </button>
                     <button 
                        onClick={handleRegenerate}
                        disabled={isRegenerating || !feedback.trim()}
                        className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                     >
                        {isRegenerating ? 'Tweaking...' : 'Apply Changes'}
                     </button>
                 </div>
             </div>
         )}
         
         <div className="flex gap-2">
            {!showFeedback && (
                <button 
                onClick={() => setShowFeedback(true)}
                className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 hover:scale-110 transition-all flex items-center gap-2 font-bold px-5"
                >
                <RefreshCw size={18} />
                Tweak Plan
                </button>
            )}
            <button 
                onClick={() => window.print()}
                className="bg-white text-gray-800 border-2 border-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-50 hover:scale-110 transition-all"
                title="Save PDF"
            >
                <Save size={18} />
            </button>
         </div>
      </div>

    </div>
  );
};

export default PlanDisplay;
