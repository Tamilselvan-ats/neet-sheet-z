import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { BookOpen, CheckCircle2, Clock, Trophy, ArrowRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const DashboardPage: React.FC = () => {
  const { getProgress, state } = useAppContext();

  const subjects = [
    { name: 'Biology', color: 'emerald', icon: BookOpen },
    { name: 'Physics', color: 'blue', icon: Clock },
    { name: 'Chemistry', color: 'purple', icon: Trophy },
  ];

  const overallProgress = getProgress();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, Future Doctor!</h1>
        <p className="text-slate-500 mt-1">Here's your preparation overview for NEET 2026.</p>
      </header>

      {/* Overall Progress Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * overallProgress) / 100}
              className="text-emerald-600 transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-slate-900">{overallProgress}%</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Overall</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Syllabus Completion</h2>
          <p className="text-slate-600 leading-relaxed">
            You have completed <span className="font-bold text-emerald-600">{state.completedTopics.length}</span> topics out of the total NEET syllabus. 
            Keep going, you're building a strong foundation!
          </p>
          <Link 
            to="/tracker" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            Continue Learning <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* Subject Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((sub, idx) => {
          const progress = getProgress(sub.name);
          return (
            <motion.div
              key={sub.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  sub.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                  sub.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                )}>
                  <sub.icon size={24} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{sub.name}</span>
              </div>
              <div>
                <ProgressBar progress={progress} color={sub.color as any} label="Progress" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Quizzes</h3>
          {state.quizHistory.length > 0 ? (
            <div className="space-y-4">
              {state.quizHistory.map((quiz, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-slate-900">{quiz.type} Mock Test</p>
                    <p className="text-xs text-slate-500">{new Date(quiz.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{quiz.score}/{quiz.total}</p>
                    <p className="text-xs text-slate-400">Score</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <ClipboardList size={48} className="mx-auto mb-2 opacity-20" />
              <p>No quiz history yet. Take your first mock test!</p>
            </div>
          )}
        </div>

        <div className="bg-emerald-600 rounded-2xl p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready for a Mock Test?</h3>
            <p className="opacity-90 mb-6">Challenge yourself with a full 180-question mock test or try our new AI-generated mock based on the latest 2026 patterns.</p>
          </div>
          <Link 
            to="/quiz" 
            className="w-full py-4 bg-white text-emerald-700 rounded-xl font-bold text-center hover:bg-emerald-50 transition-colors"
          >
            Start Mock Test
          </Link>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
