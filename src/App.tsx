import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import PresenterPage from "./components/PresenterPage";
import { Account } from "./data/accounts";

type AppScreen = "login" | "quiz" | "results" | "presenter";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("login");
  const [account, setAccount] = useState<Account | null>(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("quizAccount");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Account;
        setAccount(parsed);
        if (parsed.role === "presenter") {
          setScreen("presenter");
        } else {
          setScreen("quiz");
        }
      } catch {
        sessionStorage.removeItem("quizAccount");
      }
    }
  }, []);

  const handleLogin = (acc: Account) => {
    setAccount(acc);
    setScore(0);
    setResults([]);
    sessionStorage.setItem("quizAccount", JSON.stringify(acc));
    if (acc.role === "presenter") {
      setScreen("presenter");
    } else {
      setScreen("quiz");
    }
  };

  const handleFinish = (finalScore: number, finalResults: boolean[]) => {
    setScore(finalScore);
    setResults(finalResults);
    setScreen("results");
  };

  const handlePlayAgain = () => {
    setScore(0);
    setResults([]);
    setScreen("quiz");
  };

  const handleLogout = () => {
    setAccount(null);
    setScore(0);
    setResults([]);
    setScreen("login");
    sessionStorage.removeItem("quizAccount");
  };

  switch (screen) {
    case "login":
      return <LoginPage onLogin={handleLogin} />;
    case "presenter":
      return account ? (
        <PresenterPage account={account} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      );
    case "quiz":
      return account ? (
        <QuizPage account={account} onFinish={handleFinish} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      );
    case "results":
      return account ? (
        <ResultPage account={account} score={score} totalQuestions={10} results={results} onPlayAgain={handlePlayAgain} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      );
    default:
      return <LoginPage onLogin={handleLogin} />;
  }
}
