import { useState, useEffect, useCallback } from "react";
import { Account } from "../data/accounts";
import { getAllResults, StudentResult, clearAllResults } from "../data/results";

interface PresenterPageProps {
  account: Account;
  onLogout: () => void;
}

export default function PresenterPage({ account, onLogout }: PresenterPageProps) {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [showReset, setShowReset] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const refreshResults = useCallback(() => { setResults(getAllResults()); }, []);
  useEffect(() => { refreshResults(); const interval = setInterval(refreshResults, 3000); return () => clearInterval(interval); }, [refreshResults]);

  const sorted = [...results].sort((a, b) => { if (b.score !== a.score) return b.score - a.score; return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime(); });
  const completedCount = results.length;
  const averageScore = completedCount > 0 ? (results.reduce((sum, r) => sum + r.score, 0) / completedCount).toFixed(1) : "0";
  const topScore = sorted.length > 0 ? sorted[0].score : 0;

  const handleReset = () => { clearAllResults(); setResults([]); setShowReset(false); };
  const getMedalEmoji = (rank: number) => { if (rank === 0) return "🥇"; if (rank === 1) return "🥈"; if (rank === 2) return "🥉"; return ""; };
  const getRankStyle = (rank: number) => {
    if (rank === 0) return "bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 shadow-amber-200 shadow-lg";
    if (rank === 1) return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-gray-200 shadow-lg";
    if (rank === 2) return "bg-gradient-to-r from-orange-300 to-orange-400 text-orange-900 shadow-orange-200 shadow-lg";
    return "bg-white text-gray-700";
  };
  const selectedResult = results.find((r) => r.username === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
      <div className="bg-black/30 backdrop-blur-sm px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎤</span>
          <div><h1 className="text-lg font-black tracking-tight">PRESENTER DASHBOARD</h1><p className="text-xs text-white/50">{account.displayName}</p></div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refreshResults} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">🔄 Refresh</button>
          <button onClick={onLogout} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">Logout</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-black text-white">{completedCount}</p><p className="text-xs text-white/60 font-semibold mt-1">Students Done</p></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-black text-amber-400">{topScore}</p><p className="text-xs text-white/60 font-semibold mt-1">Top Score</p></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-black text-emerald-400">{averageScore}</p><p className="text-xs text-white/60 font-semibold mt-1">Avg Score</p></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-black text-pink-400">{topScore}</p><p className="text-xs text-white/60 font-semibold mt-1">🍬 Candies Given</p></div>
        </div>
        {completedCount === 0 ? (
          <div className="text-center py-20"><div className="text-7xl mb-4">📊</div><h2 className="text-2xl font-black text-white/80 mb-2">No Results Yet</h2><p className="text-white/50 font-medium">Students haven't finished the quiz yet. This page auto-refreshes every 3 seconds.</p></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between"><h2 className="font-black text-lg flex items-center gap-2">🏆 Leaderboard</h2><span className="text-xs text-white/40 font-medium">{completedCount} / 38 students</span></div>
                <div className="grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] px-5 py-2 bg-white/5 text-xs text-white/40 font-bold uppercase tracking-wider"><span>#</span><span>Student</span><span className="text-center">Score</span><span className="text-center">Candies</span></div>
                <div className="max-h-[60vh] overflow-y-auto">
                  {sorted.map((result, index) => (
                    <div key={result.username} onClick={() => setSelectedStudent(result.username)} className={`grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] px-5 py-3 items-center cursor-pointer transition-colors hover:bg-white/5 ${index < sorted.length - 1 ? "border-b border-white/5" : ""} ${selectedStudent === result.username ? "bg-white/10" : ""}`}>
                      <span className="text-sm font-black text-white/50">{getMedalEmoji(index) || `${index + 1}`}</span>
                      <span className="font-bold text-sm truncate">{result.displayName}</span>
                      <span className="text-center"><span className={`inline-block px-3 py-1 rounded-full text-xs font-black ${getRankStyle(index)}`}>{result.score}/{result.totalQuestions}</span></span>
                      <span className="text-center text-lg">{"🍬".repeat(result.score)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              {selectedResult ? (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
                  <h3 className="font-black text-lg mb-1">📋 Answer Detail</h3>
                  <p className="text-sm text-white/60 mb-4">{selectedResult.displayName}</p>
                  <div className="flex items-center justify-between mb-4 bg-white/10 rounded-xl p-3"><span className="text-sm font-bold text-white/70">Total Score</span><span className="text-xl font-black text-amber-400">{selectedResult.score}/{selectedResult.totalQuestions}</span></div>
                  <div className="space-y-2">
                    {selectedResult.results.map((correct, i) => (
                      <div key={i} className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold ${correct ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}><span>Question {i + 1}</span><span>{correct ? "✅ Correct" : "❌ Wrong"}</span></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center"><div className="text-4xl mb-3">👆</div><p className="text-white/50 font-medium text-sm">Click a student on the leaderboard to see their answer details</p></div>
              )}
            </div>
          </div>
        )}
        <div className="mt-8 text-center">
          {!showReset ? (
            <button onClick={() => setShowReset(true)} className="text-white/30 hover:text-white/60 text-sm font-medium transition-colors">🗑️ Reset All Scores</button>
          ) : (
            <div className="inline-flex items-center gap-3 bg-red-500/20 border border-red-500/30 rounded-xl px-6 py-3">
              <span className="text-red-300 text-sm font-bold">Are you sure? This clears all student scores.</span>
              <button onClick={handleReset} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm transition-colors">Yes, Reset</button>
              <button onClick={() => setShowReset(false)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-sm transition-colors">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
