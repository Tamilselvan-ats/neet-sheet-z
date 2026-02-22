import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { generateMockTest, calculateScore } from '../lib/quiz';
import { generateAIQuestions } from '../services/geminiService';
import { Question } from '../data/questions';
import { ChevronLeft, ChevronRight, Flag, Timer, CheckCircle2, AlertCircle, ClipboardList, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { addQuizResult } = useAppContext();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 180 minutes
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStarted]);

  const [isGenerating, setIsGenerating] = useState(false);

  const startQuiz = () => {
    setQuestions(generateMockTest());
    setTimeLeft(180 * 60);
    setIsStarted(true);
  };

  const startAIQuiz = async () => {
    setIsGenerating(true);
    try {
      const subjects = ['Biology', 'Physics', 'Chemistry'];
      const allAiQuestions: Question[] = [];
      
      for (const sub of subjects) {
        const qs = await generateAIQuestions(sub, "General NEET 2026 Pattern", 5);
        allAiQuestions.push(...qs);
      }

      if (allAiQuestions.length > 0) {
        setQuestions(allAiQuestions);
        setTimeLeft(15 * 60);
        setIsStarted(true);
      } else {
        alert("Failed to generate AI questions. Starting standard mock test instead.");
        startQuiz();
      }
    } catch (error) {
      console.error(error);
      startQuiz();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentIndex].id]: optionIndex
    }));
  };

  const toggleMarkForReview = () => {
    const id = questions[currentIndex].id;
    setMarkedForReview(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = useCallback(() => {
    if (!questions.length) return;

    try {
      const results = calculateScore(questions, answers);
      
      addQuizResult({
        type: 'Full Mock',
        date: new Date().toISOString(),
        score: results.score,
        total: results.totalQuestions * 4,
        // We don't store full questions/answers in history to save localStorage space
        // but we pass them to the results page via state
      });

      navigate('/results', { 
        state: { 
          questions, 
          answers 
        },
        replace: true // Prevent going back to the quiz
      });
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit the test. Please try again.');
    }
  }, [answers, questions, addQuizResult, navigate]);

  const handleSubmitRef = React.useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isStarted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
          <ClipboardList size={48} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">NEET Full Mock Test</h1>
          <p className="text-slate-500 mt-2">180 Questions • 180 Minutes • +4/-1 Marking</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left space-y-4">
          <h3 className="font-bold text-slate-900">Instructions:</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span>The test contains 180 questions (90 Bio, 45 Phys, 45 Chem).</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span>Each correct answer gives +4 marks.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <span>Each incorrect answer deducts -1 mark.</span>
            </li>
            <li className="flex gap-3">
              <AlertCircle size={18} className="text-amber-500 shrink-0" />
              <span>Do not refresh the page during the test.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={startQuiz}
            disabled={isGenerating}
            className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50"
          >
            Start Standard Test
          </button>
          <button 
            onClick={startAIQuiz}
            disabled={isGenerating}
            className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                AI Enhanced Mock
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Question Area */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                {currentQuestion.subject}
              </span>
              <span className="text-sm font-medium text-slate-400">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
            <button 
              onClick={toggleMarkForReview}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                markedForReview.includes(currentQuestion.id)
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              )}
            >
              <Flag size={16} />
              {markedForReview.includes(currentQuestion.id) ? 'Marked' : 'Mark for Review'}
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={cn(
                    "w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center gap-4",
                    answers[currentQuestion.id] === idx
                      ? "bg-emerald-50 border-emerald-600 text-emerald-900"
                      : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                    answers[currentQuestion.id] === idx
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-30"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar / Status Grid */}
      <aside className="w-full lg:w-80 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Timer size={20} className="text-emerald-600" />
              <span className="text-xl tabular-nums">{formatTime(timeLeft)}</span>
            </div>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to submit the test?')) {
                  handleSubmit();
                }
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700"
            >
              Submit
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Question Status</span>
              <span>{Object.keys(answers).length}/{questions.length}</span>
            </div>
            <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isMarked = markedForReview.includes(q.id);
                const isCurrent = currentIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all border-2",
                      isCurrent ? "border-slate-900" : "border-transparent",
                      isAnswered && isMarked ? "bg-amber-500 text-white" :
                      isAnswered ? "bg-emerald-500 text-white" :
                      isMarked ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm" /> Answered
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
              <div className="w-3 h-3 bg-amber-500 rounded-sm" /> Marked
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
              <div className="w-3 h-3 bg-slate-100 rounded-sm" /> Unvisited
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};


