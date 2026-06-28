import { useState, useEffect } from "react";
import { questions } from "../data/questions";
import { Account } from "../data/accounts";
import { saveStudentResult } from "../data/results";

interface QuizPageProps {
  account: Account;
  onFinish: (score: number, results: boolean[]) => void;
  onLogout: () => void;
}

type AnswerState = "unanswered" | "correct" | "wrong";

export default function QuizPage({ account, onFinish, onLogout }: QuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [animateIn, setAnimateIn] = useState(true);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  useEffect(() => { setAnimateIn(true); }, [currentIndex]);

  const handleAnswer = (label: string) => {
    if (answerState !== "unanswered") return;
    setSelectedAnswer(label);
    const isCorrect = label === currentQuestion.correctAnswer;
    if (isCorrect) {
      setAnswerState("correct");
      setScore((s) => s + 1);
      setResults((r) => [...r, true]);
    } else {
      setAnswerState("wrong");
      setResults((r) => [...r, false]);
    }
  };

  const handleContinue = () => {
    const newResults = [...results];
    const isLastQuestion = currentIndex + 1 >= totalQuestions;
    if (isLastQuestion) {
      const finalScore = score;
      saveStudentResult({ username: account.username, displayName: account.displayName, score: finalScore, totalQuestions, results: newResults, completedAt: new Date().toISOString() });
      onFinish(finalScore, newResults);
    } else {
      setAnimateIn(false);
      setTimeout(() => { setCurrentIndex((i) => i + 1); setSelectedAnswer(null); setAnswerState("unanswered"); }, 300);
    }
  };

  const choiceColors: Record<string, { bg: string; hover: string; active: string; border: string; ring: string }> = {
    A: { bg: "bg-red-500", hover: "hover:bg-red-600", active: "active:bg-red-700", border: "border-red-400", ring: "ring-red-300" },
    B: { bg: "bg-blue-500", hover: "hover:bg-blue-600", active: "active:bg-blue-700", border: "border-blue-400", ring: "ring-blue-300" },
    C: { bg: "bg-yellow-500", hover: "hover:bg-yellow-600", active: "active:bg-yellow-700", border: "border-yellow-400", ring: "ring-yellow-300" },
    D: { bg: "bg-green-500", hover: "hover:bg-green-600", active: "active:bg-green-700", border: "border-green-400", ring: "ring-green-300" },
  };

  const getBgClass = () => {
    if (answerState === "correct") return "bg-gradient-to-br from-green-400 to-emerald-600";
    if (answerState === "wrong") return "bg-gradient-to-br from-red-400 to-rose-600";
    return "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700";
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className={`min-h-screen ${getBgClass()} transition-colors duration-500 flex flex-col`}>
      <div className="bg-black/20 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg">⚡ PRG Energiser</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full px-4 py-1.5 text-white font-bold text-sm">🍭 {score} {score === 1 ? "candy" : "candies"}</div>
          <span className="text-white/80 font-medium text-sm hidden sm:inline">{account.displayName}</span>
          <button onClick={onLogout} className="text-white/60 hover:text-white text-xs underline transition-colors">Logout</button>
        </div>
      </div>
      <div className="h-2 bg-black/10">
        <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-300 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        {answerState === "correct" && (
          <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="animate-[bounceIn_0.6s_ease-out] text-center"><div className="text-8xl sm:text-9xl mb-4">🎉</div></div>
          </div>
        )}
        {answerState === "wrong" && (
          <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="animate-[bounceIn_0.6s_ease-out] text-center"><div className="text-8xl sm:text-9xl mb-4">😞</div></div>
          </div>
        )}
        <div className={`w-full max-w-lg transition-all duration-300 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-8">
            <span className="bg-white/20 backdrop-blur-sm text-white font-black text-2xl sm:text-3xl px-8 py-3 rounded-full shadow-lg inline-block">Question {currentIndex + 1} / {totalQuestions}</span>
          </div>
          {answerState === "unanswered" ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {["A", "B", "C", "D"].map((label) => {
                const colors = choiceColors[label];
                return (
                  <button key={label} onClick={() => handleAnswer(label)} className={`${colors.bg} ${colors.hover} ${colors.active} text-white rounded-3xl aspect-square flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-150 group border-4 ${colors.border}/30`}>
                    <span className="font-black text-6xl sm:text-8xl drop-shadow-lg group-hover:scale-110 transition-transform">{label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {["A", "B", "C", "D"].map((label) => {
                  const isCorrect = label === currentQuestion.correctAnswer;
                  const isSelected = label === selectedAnswer;
                  const colors = choiceColors[label];
                  let choiceClass = "";
                  if (isCorrect) { choiceClass = "bg-emerald-500 ring-4 ring-emerald-300 scale-105 shadow-emerald-300/50 shadow-xl"; }
                  else if (isSelected && !isCorrect) { choiceClass = "bg-red-600 ring-4 ring-red-300 opacity-80 shadow-red-300/50 shadow-xl"; }
                  else { choiceClass = `${colors.bg} opacity-30`; }
                  return (
                    <div key={label} className={`${choiceClass} text-white rounded-3xl aspect-square flex items-center justify-center transition-all duration-300 relative`}>
                      <span className="font-black text-5xl sm:text-7xl">{label}</span>
                      {isCorrect && <span className="absolute top-2 right-3 text-2xl">✅</span>}
                      {isSelected && !isCorrect && <span className="absolute top-2 right-3 text-2xl">❌</span>}
                    </div>
                  );
                })}
              </div>
              <div className={`rounded-2xl p-6 text-center shadow-lg animate-[bounceIn_0.5s_ease-out] ${answerState === "correct" ? "bg-white text-green-600" : "bg-white text-red-600"}`}>
                {answerState === "correct" ? (
                  <div>
                    <p className="text-2xl sm:text-3xl font-black mb-1">🎉 That's correct!</p>
                    <p className="text-lg sm:text-xl font-bold text-green-500">Come and get your candy! 🍬</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl sm:text-3xl font-black mb-1">😔 Sorry, Wrong Answer!</p>
                    <p className="text-lg sm:text-xl font-bold text-red-400 mb-3">Try again next time!</p>
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-left">
                      <p className="text-sm font-bold text-red-500 mb-1">💡 Explanation:</p>
                      <p className="text-sm text-red-600 font-medium leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={handleContinue} className="w-full py-4 bg-white text-gray-800 font-black text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                {currentIndex + 1 >= totalQuestions ? "🏆 See Results" : "Continue →"}
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
