'use client';

import { PythonTopic, PYTHON_TOPICS, LessonStatus } from '@/types';
import { getLessonsByCategory } from '@/data/lessons';
import { isLessonCompleted } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TopicCardProps {
  topic: PythonTopic;
  status: LessonStatus;
}

export default function TopicCard({ topic, status }: TopicCardProps) {
  const [progress, setProgress] = useState(0);
  const topicInfo = PYTHON_TOPICS[topic];
  const lessons = getLessonsByCategory(topic);

  useEffect(() => {
    const completedCount = lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
    const progressPercentage = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;
    setProgress(progressPercentage);
  }, [lessons]);

  const getStatusStyles = () => {
    switch (status) {
      case 'locked':
        return 'bg-punk-gray/30 border-punk-gray text-gray-500 cursor-not-allowed';
      case 'available':
        return 'bg-punk-gray/50 border-punk-purple/50 text-white hover:border-punk-purple hover:bg-punk-gray/70 transition-all duration-300';
      case 'in-progress':
        return 'bg-punk-purple/10 border-punk-purple text-white hover:border-punk-purple-glow hover:bg-punk-purple/20 transition-all duration-300 animate-pulse-neon';
      case 'completed':
        return 'bg-punk-green/10 border-punk-green text-white hover:border-punk-green-glow hover:bg-punk-green/20 transition-all duration-300';
      default:
        return 'bg-punk-gray/50 border-punk-purple/50 text-white';
    }
  };

  const getProgressBarColor = () => {
    if (progress === 100) return 'bg-punk-green';
    if (progress > 0) return 'bg-punk-purple';
    return 'bg-punk-gray';
  };

  const CardContent = () => (
    <div className={`relative p-6 rounded-lg border-2 ${getStatusStyles()} group overflow-hidden`}>
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-punk-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{topicInfo.icon}</span>
            <h3 className={`text-xl font-cyber font-bold ${topicInfo.color}`}>
              {topicInfo.title}
            </h3>
          </div>
          
          {/* Status Badge */}
          <div className="text-right">
            {status === 'completed' && <span className="text-punk-green text-2xl">✓</span>}
            {status === 'in-progress' && <span className="text-punk-purple text-2xl animate-flicker">⚡</span>}
            {status === 'locked' && <span className="text-gray-500 text-2xl">🔒</span>}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Progresso</span>
            <span className="text-sm font-semibold text-white">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-punk-gray rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full ${getProgressBarColor()} transition-all duration-500 ease-out relative`}
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </div>
          </div>
        </div>

        {/* Lesson Count */}
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>{lessons.length} lições</span>
          {status !== 'locked' && (
            <span className="text-punk-blue group-hover:text-punk-blue-glow transition-colors">
              Iniciar →
            </span>
          )}
        </div>
      </div>

      {/* Cyber border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-punk-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );

  if (status === 'locked') {
    return <CardContent />;
  }

  return (
    <Link href={`/topic/${topic}`} className="block">
      <CardContent />
    </Link>
  );
}
