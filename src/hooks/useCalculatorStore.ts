import { create } from "zustand";
import { CalculatorState, CategoryScore } from "@/lib/types";

export const useCalculatorStore = create<CalculatorState>((set) => ({
  scores: {},
  totalScore: 0,
  setScore: (categoryId: string, optionId: string, points: number) =>
    set((state) => {
      const newScores = {
        ...state.scores,
        [categoryId]: {
          categoryId,
          selectedOptionId: optionId,
          points,
        } as CategoryScore,
      };
      const totalScore = Object.values(newScores).reduce(
        (sum, s) => sum + s.points,
        0
      );
      return { scores: newScores, totalScore };
    }),
  reset: () => set({ scores: {}, totalScore: 0 }),
}));
