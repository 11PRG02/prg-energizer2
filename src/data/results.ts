export interface StudentResult {
  username: string;
  displayName: string;
  score: number;
  totalQuestions: number;
  results: boolean[];
  completedAt: string;
}

const STORAGE_KEY = "candyQuizResults";

export function saveStudentResult(result: StudentResult): void {
  const allResults = getAllResults();
  const filtered = allResults.filter((r) => r.username !== result.username);
  filtered.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getAllResults(): StudentResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function clearAllResults(): void {
  localStorage.removeItem(STORAGE_KEY);
}
