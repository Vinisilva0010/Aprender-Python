'use client';

import { useEffect, useState } from 'react';
import { loadUserProgress } from '@/utils/localStorage';
import { UserProgress } from '@/types';

export default function Header() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const userProgress = loadUserProgress();
    setProgress(userProgress);
  }, []);

  return (
    <header className="bg-punk-darker/90 backdrop-blur-sm border-b border-punk-purple/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl font-cyber font-bold text-punk-green text-glow animate-glow">
              &lt;/&gt;
            </div>
            <h1 className="text-2xl font-cyber font-bold text-white">
              Python <span className="text-punk-purple text-glow-sm">Mastery</span>
            </h1>
          </div>

          {/* Progress Info */}
          {progress && (
            <div className="flex items-center space-x-6">
              {/* Streak */}
              <div className="flex items-center space-x-2">
                <span className="text-punk-orange text-xl">🔥</span>
                <span className="text-punk-orange font-semibold">
                  {progress.streak} dias
                </span>
              </div>

              {/* Completed Lessons */}
              <div className="flex items-center space-x-2">
                <span className="text-punk-green text-xl">✅</span>
                <span className="text-punk-green font-semibold">
                  {progress.completedLessons.length} lições
                </span>
              </div>

              {/* Time Spent */}
              <div className="flex items-center space-x-2">
                <span className="text-punk-blue text-xl">⏱️</span>
                <span className="text-punk-blue font-semibold">
                  {progress.totalTimeSpent}min
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
