"use client";

import { Category } from "@/lib/types";
import { useCalculatorStore } from "@/hooks/useCalculatorStore";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const scores = useCalculatorStore((s) => s.scores);
  const setScore = useCalculatorStore((s) => s.setScore);
  const selectedOptionId = scores[category.id]?.selectedOptionId ?? null;
  const currentPoints = scores[category.id]?.points ?? 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <h3 className="font-medium text-neutral">{category.name}</h3>
        <span className="text-sm font-mono text-primary font-semibold">
          {currentPoints} / {category.maxPoints}
        </span>
      </div>
      <div className="p-4 space-y-2">
        {category.options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedOptionId === option.id
                ? "border-primary bg-blue-50"
                : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name={category.id}
              value={option.id}
              checked={selectedOptionId === option.id}
              onChange={() => setScore(category.id, option.id, option.points)}
              className="w-4 h-4 text-primary accent-primary"
            />
            <span className="flex-1 text-sm">{option.label}</span>
            <span
              className={`text-sm font-mono font-medium ${
                selectedOptionId === option.id
                  ? "text-primary"
                  : "text-gray-400"
              }`}
            >
              +{option.points}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
