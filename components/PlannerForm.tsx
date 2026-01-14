import React, { useState } from 'react';
import { UserFormData } from '../types';
import { Rocket, Clock, Calendar, BookOpen, Target, Brain } from 'lucide-react';

interface PlannerFormProps {
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
}

const PlannerForm: React.FC<PlannerFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserFormData>({
    semester: '',
    subjects: '',
    exams: '',
    freeTime: '',
    goals: '',
    vibe: 'chill',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-2 border-black rounded-[20px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className="bg-yellow-400 p-6 border-b-2 border-black">
        <h2 className="text-3xl font-bold text-black flex items-center gap-3">
            <Rocket className="text-black" size={32} />
            Let's Fix Your Life
        </h2>
        <p className="text-black font-medium opacity-80 mt-1">Be honest, I won't judge (much).</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* Semester */}
        <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                <Calendar size={16} /> Current Semester / Year
            </label>
            <input
                type="text"
                name="semester"
                required
                placeholder="e.g. 3rd Sem, Final Year, Drop out?"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 focus:outline-none transition-colors font-medium"
            />
        </div>

        {/* Subjects */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                <BookOpen size={16} /> Subjects (The painful ones)
            </label>
            <textarea
                name="subjects"
                required
                rows={2}
                placeholder="e.g. Data Structures, OS, Networking, 3 Backlogs in Math"
                value={formData.subjects}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 focus:outline-none transition-colors font-medium resize-none"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exam Dates */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                    <Clock size={16} /> When are the exams?
                </label>
                <input
                    type="text"
                    name="exams"
                    required
                    placeholder="e.g. Next month, Tomorrow (help)"
                    value={formData.exams}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 focus:outline-none transition-colors font-medium"
                />
            </div>

             {/* Free Time */}
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                    <Clock size={16} /> Daily Free Time
                </label>
                <input
                    type="text"
                    name="freeTime"
                    required
                    placeholder="e.g. 2 hours, Only midnight"
                    value={formData.freeTime}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 focus:outline-none transition-colors font-medium"
                />
            </div>
        </div>

        {/* Goals */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                <Target size={16} /> What's the dream?
            </label>
            <textarea
                name="goals"
                required
                rows={2}
                placeholder="e.g. Crack Google interview, Build a SaaS, Just pass this semester"
                value={formData.goals}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 focus:outline-none transition-colors font-medium resize-none"
            />
        </div>

        {/* Vibe Selection */}
        <div>
             <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Brain size={16} /> Coach Personality
            </label>
            <div className="grid grid-cols-3 gap-3">
                {[
                    { id: 'chill', label: 'Chill Mentor', emoji: '😌', color: 'bg-green-100 border-green-300 text-green-800' },
                    { id: 'hardcore', label: 'Drill Sergeant', emoji: '😤', color: 'bg-red-100 border-red-300 text-red-800' },
                    { id: 'roast', label: 'Roast Me', emoji: '🔥', color: 'bg-orange-100 border-orange-300 text-orange-800' }
                ].map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, vibe: option.id as any })}
                        className={`p-3 rounded-xl border-2 font-bold text-sm transition-all flex flex-col items-center gap-1 ${
                            formData.vibe === option.id 
                            ? 'border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]' 
                            : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'
                        } ${formData.vibe === option.id ? option.color : ''}`}
                    >
                        <span className="text-xl">{option.emoji}</span>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>

        <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-4 rounded-xl font-bold text-lg text-white transition-all transform border-2 border-black
            ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed opacity-80' 
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                   Generating Miracles...
                </span>
            ) : (
                "Generate My Plan"
            )}
        </button>
      </form>
    </div>
  );
};

export default PlannerForm;
