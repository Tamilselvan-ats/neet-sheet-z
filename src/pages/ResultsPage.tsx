import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { calculateScore } from '../lib/quiz';
import { ProgressBar } from '../components/ProgressBar';
import { CheckCircle2, XCircle, HelpCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { questions, answers } = location.state || { questions: [], answers: {} };

  if (!questions.length) {
    return (
      <div className="text-center py-20">
        <p>No results found.</p>
        <Link to="/" className="text-emerald-600 font-bold">Back to Dashboard</Link>
      </div>
    );
  }

  const results = calculateScore(questions, answers);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Test Results</h1>
          <p className="text-slate-500 mt-1">Detailed analysis of your performance.</p>
        </div>
        <Link 
          to="/" 
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={18} /> Dashboard
        </Link>
      </header>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Score</p>
          <p className="text-4xl font-black text-emerald-600">{results.score}</p>
          <p className="text-xs text-slate-400 mt-1">out of {results.totalQuestions * 4}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Accuracy</p>
          <p className="text-4xl font-black text-blue-600">{results.percentage}%</p>
          <p className="text-xs text-slate-400 mt-1">Correct / Attempted</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Correct</p>
          <p className="text-4xl font-black text-emerald-500">{results.correct}</p>
          <div className="flex items-center justify-center gap-1 text-emerald-500 mt-1">
            <CheckCircle2 size={12} />
            <span className="text-[10px] font-bold">+{results.correct * 4}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Incorrect</p>
          <p className="text-4xl font-black text-red-500">{results.incorrect}</p>
          <div className="flex items-center justify-center gap-1 text-red-500 mt-1">
            <XCircle size={12} />
            <span className="text-[10px] font-bold">-{results.incorrect}</span>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Subject-wise Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(results.subjectBreakdown).map(([subject, data]) => {
            const percentage = Math.round((data.correct / data.total) * 100) || 0;
            return (
              <div key={subject} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-slate-900">{subject}</h4>
                    <p className="text-xs text-slate-500">{data.correct} correct of {data.total}</p>
                  </div>
                  <span className="text-2xl font-black text-slate-900">{percentage}%</span>
                </div>
                <ProgressBar 
                  progress={percentage} 
                  color={subject === 'Biology' ? 'emerald' : subject === 'Physics' ? 'blue' : 'purple'} 
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Review */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900">Question Review</h3>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.answer;
            const isUnattempted = userAnswer === undefined;

            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 leading-relaxed">{q.question}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{q.subject}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">•</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{q.chapter}</span>
                      </div>
                    </div>
                  </div>
                  {isUnattempted ? (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">Unattempted</span>
                  ) : isCorrect ? (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold uppercase">Correct</span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-bold uppercase">Incorrect</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {q.options.map((opt, oIdx) => (
                    <div 
                      key={oIdx}
                      className={cn(
                        "p-3 rounded-xl text-sm font-medium border-2",
                        oIdx === q.answer ? "bg-emerald-50 border-emerald-500 text-emerald-900" :
                        oIdx === userAnswer ? "bg-red-50 border-red-500 text-red-900" :
                        "bg-white border-slate-50 text-slate-600"
                      )}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </div>
                  ))}
                </div>

                {q.explanation && (
                  <div className="ml-12 p-4 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-900 mb-1">Explanation:</p>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
