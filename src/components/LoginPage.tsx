import { useState } from "react";
import { authenticate, Account } from "../data/accounts";

interface LoginPageProps {
  onLogin: (account: Account) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const account = authenticate(username.trim(), password.trim());
    if (account) {
      onLogin(account);
    } else {
      setError("Wrong username or password. Try again!");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-pink-400 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '2.5s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-red-400 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3.5s' }} />
      </div>
      <div className={`bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md relative z-10 transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">PRG Energiser!</h1>
          <p className="text-gray-500 mt-2 font-medium">Log in to start the quiz</p>
        </div>
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-600 rounded-xl p-3 mb-6 text-center font-semibold text-sm">
            ❌ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-700 font-medium placeholder:text-gray-300" autoFocus />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-700 font-medium placeholder:text-gray-300" />
          </div>
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            🚀 Start Quiz!
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">Don't have your login? Ask your teacher!</p>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
