import React, { useState } from 'react';
import { 
  BookOpen, 
  Tag, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  ArrowRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { LearningModule } from '../types';

interface MarketingLearningHubProps {
  modules: LearningModule[];
}

export const MarketingLearningHub: React.FC<MarketingLearningHubProps> = ({ modules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0]?.id || 'mod_pricing');
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const activeModule = modules.find((m) => m.id === selectedModuleId) || modules[0];

  const handleAnswerSelect = (qIndex: number, optionIdx: number) => {
    setActiveQuizAnswers({
      ...activeQuizAnswers,
      [qIndex]: optionIdx,
    });
  };

  const handleResetQuiz = () => {
    setActiveQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-400/20 text-purple-300 text-xs font-bold border border-purple-400/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Commerce Learning Hub ⭐⭐⭐⭐⭐</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Commerce Marketing Lessons & Flashcard Quizzes
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Master real marketing concepts (Pricing Strategy, STP Marketing, Conversion Funnels) taught in polytechnic syllabus and immediately apply them to your Campus Corner store!
        </p>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
        {modules.map((mod) => {
          const isActive = mod.id === selectedModuleId;
          return (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModuleId(mod.id);
                handleResetQuiz();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{mod.title}</span>
              <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-1.5 py-0.2 rounded">
                {mod.duration}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Module Detail */}
      {activeModule && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Lessons Content (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            {activeModule.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Module Lesson</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900">{lesson.title}</h2>

                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {lesson.content}
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Key Takeaways for Campus Sellers:
                  </h3>
                  <div className="space-y-1.5">
                    {lesson.keyTakeaways.map((takeaway, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700 bg-purple-50/50 p-2.5 rounded-lg border border-purple-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Quiz (1 col) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Knowledge Check Quiz</span>
                </h3>

                <button
                  onClick={handleResetQuiz}
                  className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {activeModule.quiz.map((q, qIdx) => {
                const selected = activeQuizAnswers[qIdx];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={qIdx} className="space-y-2 text-xs border-b pb-4 border-slate-100 last:border-none">
                    <p className="font-bold text-slate-900">
                      Q{qIdx + 1}. {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                          } else if (isThisSelected && !isCorrect) {
                            optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                          }
                        } else if (isThisSelected) {
                          optionStyle = 'bg-purple-50 border-purple-400 text-purple-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswerSelect(qIdx, optIdx)}
                            disabled={quizSubmitted}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${optionStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <p className="text-[11px] text-slate-600 bg-slate-100 p-2 rounded-lg mt-1">
                        💡 <span className="font-bold">Explanation:</span> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={quizSubmitted}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              {quizSubmitted ? 'Quiz Completed!' : 'Submit Quiz Answers'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
