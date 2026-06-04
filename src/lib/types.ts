export interface ScoringOption {
  id: string;
  label: string;
  points: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  maxPoints: number;
  options: ScoringOption[];
}

export interface CategoryScore {
  categoryId: string;
  selectedOptionId: string | null;
  points: number;
}

export interface CalculatorState {
  scores: Record<string, CategoryScore>;
  totalScore: number;
  setScore: (categoryId: string, optionId: string, points: number) => void;
  reset: () => void;
}
