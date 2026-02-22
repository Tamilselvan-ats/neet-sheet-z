import React, { createContext, useContext, useState, useEffect } from 'react';
import { neetSyllabus } from '../data/syllabus';

interface AppState {
  completedTopics: string[];
  quizHistory: any[];
  mockProgress: any;
  lastSync: number;
}

interface AppContextType {
  state: AppState;
  toggleTopic: (topicId: string) => void;
  addQuizResult: (result: any) => void;
  saveMockProgress: (progress: any) => void;
  getProgress: (subject?: string, chapterId?: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'neet_2026_master_tracker_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      completedTopics: [],
      quizHistory: [],
      mockProgress: null,
      lastSync: Date.now()
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleTopic = (topicId: string) => {
    setState(prev => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId],
      lastSync: Date.now()
    }));
  };

  const addQuizResult = (result: any) => {
    setState(prev => ({
      ...prev,
      quizHistory: [result, ...prev.quizHistory].slice(0, 10),
      lastSync: Date.now()
    }));
  };

  const saveMockProgress = (progress: any) => {
    setState(prev => ({
      ...prev,
      mockProgress: progress,
      lastSync: Date.now()
    }));
  };

  const getProgress = (subject?: string, chapterId?: string) => {
    let totalTopics = 0;
    let completedCount = 0;

    const processChapter = (chapter: any) => {
      chapter.topics.forEach((topic: any) => {
        totalTopics++;
        if (state.completedTopics.includes(topic.id)) {
          completedCount++;
        }
      });
    };

    if (subject) {
      const subSyllabus = neetSyllabus[subject.toLowerCase()];
      if (chapterId) {
        const chapter = [...subSyllabus.class11, ...subSyllabus.class12].find(c => c.id === chapterId);
        if (chapter) processChapter(chapter);
      } else {
        subSyllabus.class11.forEach(processChapter);
        subSyllabus.class12.forEach(processChapter);
      }
    } else {
      Object.values(neetSyllabus).forEach(sub => {
        sub.class11.forEach(processChapter);
        sub.class12.forEach(processChapter);
      });
    }

    return totalTopics === 0 ? 0 : Math.round((completedCount / totalTopics) * 100);
  };

  return (
    <AppContext.Provider value={{ state, toggleTopic, addQuizResult, saveMockProgress, getProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
