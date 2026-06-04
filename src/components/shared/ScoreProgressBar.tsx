"use client";

import { useCalculatorStore } from "@/hooks/useCalculatorStore";
import { PASSING_THRESHOLD, MAX_SCORE } from "@/data/scoring-rules";

export default function ScoreProgressBar() {
  const totalScore = useCalculatorStore((s) => s.totalScore);
  const percentage = Math.min((totalScore / MAX_SCORE) * 100, 100);
  const thresholdPercentage = (PASSING_THRESHOLD / MAX_SCORE) * 100;

  const isPassing = totalScore >= PASSING_THRESHOLD;
  const isClose = totalScore >= 60 && totalScore < PASSING_THRESHOLD;

  const barColor = isPassing
    ? "bg-success"
    : isClose
      ? "bg-warning"
      : "bg-danger";

  const statusText = isPassing
    ? "已達門檻"
    : `距離門檻還差 ${PASSING_THRESHOLD - totalScore} 分`;

  return (
    <>
      {/* Desktop: top sticky panel */}
      <div className="hidden lg:block sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono font-bold text-primary">
                {totalScore}
              </span>
              <span className="text-sm text-gray-500">/ {MAX_SCORE} 分</span>
            </div>
            <span
              className={`text-sm font-medium ${isPassing ? "text-success" : isClose ? "text-warning" : "text-danger"}`}
            >
              {statusText}
            </span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${percentage}%` }}
            />
            <div
              className="absolute top-0 w-0.5 h-full bg-gray-400"
              style={{ left: `${thresholdPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">0</span>
            <span
              className="text-xs text-gray-500 font-medium"
              style={{ marginLeft: `${thresholdPercentage - 5}%` }}
            >
              門檻 {PASSING_THRESHOLD}
            </span>
            <span className="text-xs text-gray-400">{MAX_SCORE}</span>
          </div>
        </div>
      </div>

      {/* Mobile: fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono font-bold text-primary">
                {totalScore}
              </span>
              <span className="text-xs text-gray-500">/ {MAX_SCORE}</span>
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isPassing
                  ? "bg-green-50 text-success"
                  : isClose
                    ? "bg-amber-50 text-warning"
                    : "bg-red-50 text-danger"
              }`}
            >
              {statusText}
            </span>
          </div>
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${percentage}%` }}
            />
            <div
              className="absolute top-0 w-0.5 h-full bg-gray-400"
              style={{ left: `${thresholdPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
