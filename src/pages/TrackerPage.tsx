import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { neetSyllabus } from '../data/syllabus';
import { ProgressBar } from '../components/ProgressBar';
import { ChevronDown, ChevronRight, CheckCircle2, Youtube, Book, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const TrackerPage: React.FC = () => {
  const { state, toggleTopic, getProgress } = useAppContext();
  const [activeSubject, setActiveSubject] = useState<'physics' | 'chemistry' | 'biology'>('biology');
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
    );
  };

  const currentSyllabus = neetSyllabus[activeSubject];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Syllabus Tracker</h1>
          <p className="text-slate-500 mt-1">Track your NCERT progress topic by topic.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
          {(['biology', 'physics', 'chemistry'] as const).map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                activeSubject === sub 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {sub}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <ProgressBar 
            progress={getProgress(activeSubject)} 
            label={`${activeSubject.charAt(0).toUpperCase() + activeSubject.slice(1)} Overall`}
            size="lg"
            color={activeSubject === 'biology' ? 'emerald' : activeSubject === 'physics' ? 'blue' : 'purple'}
          />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Topics Completed</p>
            <p className="text-2xl font-bold text-slate-900">
              {state.completedTopics.filter(id => id.startsWith(activeSubject.charAt(0))).length} Topics
            </p>
          </div>
          <CheckCircle2 className="text-emerald-500" size={32} />
        </div>
      </div>

      <div className="space-y-12">
        {/* Class 11 Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-emerald-500 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">Class 11 Syllabus</h2>
          </div>
          <div className="space-y-4">
            {currentSyllabus.class11.map(chapter => (
              <ChapterCard 
                key={chapter.id} 
                chapter={chapter} 
                isExpanded={expandedChapters.includes(chapter.id)}
                onToggle={() => toggleChapter(chapter.id)}
                completedTopics={state.completedTopics}
                onTopicToggle={toggleTopic}
                progress={getProgress(activeSubject, chapter.id)}
              />
            ))}
          </div>
        </section>

        {/* Class 12 Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-blue-500 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">Class 12 Syllabus</h2>
          </div>
          <div className="space-y-4">
            {currentSyllabus.class12.map(chapter => (
              <ChapterCard 
                key={chapter.id} 
                chapter={chapter} 
                isExpanded={expandedChapters.includes(chapter.id)}
                onToggle={() => toggleChapter(chapter.id)}
                completedTopics={state.completedTopics}
                onTopicToggle={toggleTopic}
                progress={getProgress(activeSubject, chapter.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const ChapterCard: React.FC<{
  chapter: any;
  isExpanded: boolean;
  onToggle: () => void;
  completedTopics: string[];
  onTopicToggle: (id: string) => void;
  progress: number;
}> = ({ chapter, isExpanded, onToggle, completedTopics, onTopicToggle, progress }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
            progress === 100 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
          )}>
            {progress}%
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{chapter.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{chapter.topics.length} Topics</p>
          </div>
        </div>
        {isExpanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="p-4 space-y-2">
              {chapter.topics.map((topic: any) => {
                const isCompleted = completedTopics.includes(topic.id);
                return (
                  <div 
                    key={topic.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-all",
                      isCompleted ? "bg-emerald-50/50" : "hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onTopicToggle(topic.id)}
                        className={cn(
                          "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                          isCompleted 
                            ? "bg-emerald-600 border-emerald-600 text-white" 
                            : "border-slate-300 hover:border-emerald-500"
                        )}
                      >
                        {isCompleted && <CheckCircle2 size={14} />}
                      </button>
                      <span className={cn(
                        "text-sm font-medium",
                        isCompleted ? "text-emerald-900" : "text-slate-700"
                      )}>
                        {topic.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <a 
                        href={`https://www.youtube.com/results?search_query=NEET+${topic.name}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Watch on YouTube"
                      >
                        <Youtube size={18} />
                      </a>
                      <a 
                        href="#" 
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Read NCERT"
                      >
                        <Book size={18} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
