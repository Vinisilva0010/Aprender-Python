'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { PythonTopic, PYTHON_TOPICS, Lesson, LessonStatus } from '@/types';
import { getLessonsByCategory } from '@/data/lessons';
import { isLessonCompleted, loadUserProgress } from '@/utils/localStorage';

export default function TopicPage() {
  const params = useParams();
  const topic = params.topic as PythonTopic;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, LessonStatus>>({});

  useEffect(() => {
    if (!topic) return;

    const topicLessons = getLessonsByCategory(topic);
    setLessons(topicLessons);

    // Determinar status de cada lição
    const progress = loadUserProgress();
    const statuses: Record<string, LessonStatus> = {};

    topicLessons.forEach((lesson, index) => {
      if (index === 0) {
        // Primeira lição sempre disponível
        statuses[lesson.id] = isLessonCompleted(lesson.id) ? 'completed' : 'available';
      } else {
        const previousLesson = topicLessons[index - 1];
        const previousCompleted = isLessonCompleted(previousLesson.id);
        
        if (previousCompleted) {
          statuses[lesson.id] = isLessonCompleted(lesson.id) ? 'completed' : 'available';
        } else {
          statuses[lesson.id] = 'locked';
        }
      }
    });

    setLessonStatuses(statuses);
  }, [topic]);

  if (!topic || !PYTHON_TOPICS[topic]) {
    return (
      <div className="min-h-screen bg-punk-dark">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl text-white">Tópico não encontrado</h1>
          <Link href="/" className="text-punk-blue hover:text-punk-blue-glow">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const topicInfo = PYTHON_TOPICS[topic];

  return (
    <div className="min-h-screen bg-punk-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/" className="text-punk-blue hover:text-punk-blue-glow flex items-center mb-4">
            ← Voltar aos tópicos
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-6xl">{topicInfo.icon}</span>
            <div>
              <h1 className={`text-4xl font-cyber font-bold ${topicInfo.color} text-glow-sm`}>
                {topicInfo.title}
              </h1>
              <p className="text-gray-400 text-lg">
                {lessons.length} lições disponíveis
              </p>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4 max-w-4xl">
          {lessons.map((lesson, index) => {
            const status = lessonStatuses[lesson.id] || 'locked';
            const isLocked = status === 'locked';
            
            const statusStyles = {
              locked: 'bg-punk-gray/30 border-punk-gray text-gray-500 cursor-not-allowed',
              available: 'bg-punk-gray/50 border-punk-purple/50 text-white hover:border-punk-purple hover:bg-punk-gray/70',
              'in-progress': 'bg-punk-blue/10 border-punk-blue text-white hover:border-punk-blue-glow hover:bg-punk-blue/20',
              completed: 'bg-punk-green/10 border-punk-green text-white hover:border-punk-green-glow hover:bg-punk-green/20'
            };

            const LessonCard = () => (
              <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${statusStyles[status]}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-punk-purple">
                      {index + 1}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-punk-blue">
                          ⏱️ {lesson.estimatedTime} min
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          lesson.exercise.difficulty === 'easy' ? 'bg-punk-green/20 text-punk-green' :
                          lesson.exercise.difficulty === 'medium' ? 'bg-punk-orange/20 text-punk-orange' :
                          'bg-punk-red/20 text-punk-red'
                        }`}>
                          {lesson.exercise.difficulty === 'easy' ? 'Fácil' :
                           lesson.exercise.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {status === 'completed' && (
                      <span className="text-punk-green text-2xl">✓</span>
                    )}
                    {status === 'locked' && (
                      <span className="text-gray-500 text-2xl">🔒</span>
                    )}
                    {!isLocked && (
                      <span className="text-punk-blue">
                        Iniciar →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            if (isLocked) {
              return <LessonCard key={lesson.id} />;
            }

            return (
              <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                <LessonCard />
              </Link>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 max-w-4xl">
          <div className="bg-punk-gray/30 rounded-lg p-6 border border-punk-purple/30">
            <h3 className="text-xl font-semibold text-white mb-4">Progresso do Tópico</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Lições Completadas</span>
                <span className="text-punk-green font-semibold">
                  {Object.values(lessonStatuses).filter(s => s === 'completed').length} / {lessons.length}
                </span>
              </div>
              
              <div className="w-full bg-punk-gray rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-punk-purple to-punk-green h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(Object.values(lessonStatuses).filter(s => s === 'completed').length / lessons.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

