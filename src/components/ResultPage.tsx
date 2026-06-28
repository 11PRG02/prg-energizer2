import { Account } from "../data/accounts";

interface ResultPageProps {
  account: Account;
  score: number;
  totalQuestions: number;
  results: boolean[];
  onPlayAgain: () => void;
  onLogout: () => void;
}

export default function ResultPage({ account, score, totalQuestions, results, onPlayAgain, onLogout }: ResultPageProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const getMessage = () => {
    if (percentage === 100) return { emoji: "🏆", text: "PERFECT SCORE! You're a genius!", color: "text-yellow-500" };
    if (percentage >= 80) return { emoji: "🌟", text: "Amazing job! So impressive!", color: "text-emerald-500" };
    if (percentage >= 60) return { emoji: "😊", text: "Great work! Keep it up!", color: "text-blue-500" };
    if (percentage >= 40) return { emoji: "💪", text: "Good effort! You can do better!", color: "text-orange-500" };
    return { emoji: "📚", text: "Keep studying! You'll get there!", color: "text-purple-500" };
  };
  const message = getMessage();
  const candyIcons = results.map((correct, i) => (
    <div key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black transition-all duration-300 ${correct ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg scale-100" : "bg-gray-200 opacity-40 scale-90"}`} style={{ animationDelay: `${i * 100}ms` }}>
      {correct ? "🍬" : <span className="text-gray-400 text-sm">✗</span>}
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center animate-[bounceIn_0.6s_ease-out]">
          <div className="text-7xl mb-4">{message.emoji}</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">Quiz Complete!</h1>
          <p className={`text-xl font-bold ${message.color} mb-6`}>{message.text}</p>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">{score}/{totalQuestions}</div>
            <p className="text-gray-500 font-semibold">You got {score} out of {totalQuestions} correct!</p>
            <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
            </div>
            <p className="text-sm text-gray-400 mt-1 font-medium">{percentage}%</p>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Your Candy Collection</h3>
            <div className="flex flex-wrap justify-center gap-2">{candyIcons}</div>
            <p className="text-gray-400 text-xs mt-2">{score === 0 ? "No candies this time 😢" : `${score} 🍬 = ${score} ${score === 1 ? "candy" : "candies"} earned!`}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Question Breakdown</h3>
            <div className="grid grid-cols-5 gap-2">
              {results.map((correct, i) => (
                <div key={i} className={`py-2 px-1 rounded-lg text-sm font-bold ${correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  Q{i + 1}<br />{correct ? "✓" : "✗"}
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-6">Player: <span className="font-bold text-gray-600">{account.displayName}</span></p>
          <div className="space-y-3">
            <button onClick={onPlayAgain} className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">🔄 Play Again</button>
            <button onClick={onLogout} className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">Logout</button>
          </div>
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
