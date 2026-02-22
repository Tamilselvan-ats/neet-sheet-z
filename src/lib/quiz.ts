import { questionBank, Question } from '../data/questions';

export const generateMockTest = (): Question[] => {
  const biology = questionBank.filter(q => q.subject === 'Biology');
  const physics = questionBank.filter(q => q.subject === 'Physics');
  const chemistry = questionBank.filter(q => q.subject === 'Chemistry');

  const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

  const selectedBio = shuffle(biology).slice(0, 90);
  const selectedPhys = shuffle(physics).slice(0, 45);
  const selectedChem = shuffle(chemistry).slice(0, 45);

  return shuffle([...selectedBio, ...selectedPhys, ...selectedChem]);
};

export const calculateScore = (questions: Question[], answers: Record<string, number>) => {
  let score = 0;
  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;

  const subjectBreakdown = {
    Biology: { correct: 0, total: 0 },
    Physics: { correct: 0, total: 0 },
    Chemistry: { correct: 0, total: 0 }
  };

  questions.forEach(q => {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined) {
      unattempted++;
    } else if (userAnswer === q.answer) {
      score += 4;
      correct++;
      subjectBreakdown[q.subject].correct++;
    } else {
      score -= 1;
      incorrect++;
    }
    subjectBreakdown[q.subject].total++;
  });

  return {
    score,
    correct,
    incorrect,
    unattempted,
    subjectBreakdown,
    totalQuestions: questions.length,
    percentage: Math.round((score / (questions.length * 4)) * 100)
  };
};
