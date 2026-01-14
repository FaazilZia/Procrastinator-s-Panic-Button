import React, { useState } from 'react';
import PlannerForm from './components/PlannerForm';
import PlanDisplay from './components/PlanDisplay';
import { generateStudyPlan } from './services/geminiService';
import { UserFormData, StudyPlanResponse } from './types';
import { Sparkles, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [plan, setPlan] = useState<StudyPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: UserFormData) => {
    setFormData(data);
    setLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateStudyPlan(data);
      setPlan(generatedPlan);
    } catch (err) {
      setError("The AI is overwhelmed by your life choices (or the API failed). Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (feedback: string) => {
    if (!formData) return;
    setLoading(true);
    try {
      const updatedPlan = await generateStudyPlan(formData, feedback);
      setPlan(updatedPlan);
    } catch (err) {
      console.error(err);
      alert("Failed to update plan. The AI is stubborn today.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-gray-900 relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="fixed bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <header className="relative z-10 pt-10 pb-6 px-4 text-center">
        <div 
          onClick={handleReset}
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 rounded-full font-mono text-sm mb-4 cursor-pointer hover:scale-105 transition-transform"
        >
          <Terminal size={14} />
          <span>v1.0.0 // CS_STUDENT_SAVER_BOT</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight">
          Panic <span className="text-indigo-600">Planner</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          For students who have 100 backlog videos and 0 motivation.
        </p>
      </header>

      <main className="relative z-10 px-4 py-8 max-w-5xl mx-auto min-h-[600px]">
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center font-bold" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {!plan ? (
          <div className="animate-slide-up">
            <PlannerForm onSubmit={handleFormSubmit} isLoading={loading} />
          </div>
        ) : (
          <PlanDisplay 
            plan={plan} 
            onRegenerate={handleRegenerate}
            isRegenerating={loading}
          />
        )}
      </main>

      <footer className="relative z-10 text-center py-8 text-gray-500 font-medium text-sm">
        <p className="flex items-center justify-center gap-2">
            Made with <Sparkles size={14} className="text-yellow-500" /> and panic.
        </p>
      </footer>
    </div>
  );
};

export default App;
