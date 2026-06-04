"use client";

import ScoreProgressBar from "@/components/shared/ScoreProgressBar";
import CategoryCard from "@/components/calculator/CategoryCard";
import { categories } from "@/data/scoring-rules";
import { useCalculatorStore } from "@/hooks/useCalculatorStore";

export default function CalculatorPage() {
  const reset = useCalculatorStore((s) => s.reset);

  return (
    <div className="min-h-screen pb-24 lg:pb-8">
      <ScoreProgressBar />

      <main className="max-w-4xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-neutral">
              評點計算
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              請逐項選擇最符合您情況的選項
            </p>
          </div>
          <button
            onClick={reset}
            className="text-sm text-gray-500 hover:text-danger px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-colors"
          >
            重設
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
}
