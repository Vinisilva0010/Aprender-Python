'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TopicCard from '@/components/TopicCard';
import { PythonTopic, PYTHON_TOPICS, LessonStatus } from '@/types';
import { loadUserProgress } from '@/utils/localStorage';

export default function Home() {
  const [topicStatuses, setTopicStatuses] = useState<Record<PythonTopic, LessonStatus>>({} as Record<PythonTopic, LessonStatus>);

  useEffect(() => {
    const progress = loadUserProgress();
    const statuses: Record<PythonTopic, LessonStatus> = {} as Record<PythonTopic, LessonStatus>;

    // Determinar status de cada tópico
    const topics = Object.keys(PYTHON_TOPICS) as PythonTopic[];
    
    topics.forEach((topic, index) => {
      if (index === 0) {
        // Primeiro tópico (variáveis) sempre disponível
        statuses[topic] = progress.completedLessons.some(id => id.startsWith('variables')) ? 'completed' : 'available';
      } else {
        const previousTopic = topics[index - 1];
        const previousCompleted = progress.completedLessons.some(id => id.startsWith(previousTopic));
        
        if (previousCompleted) {
          const currentCompleted = progress.completedLessons.some(id => id.startsWith(topic));
          statuses[topic] = currentCompleted ? 'completed' : 'available';
        } else {
          statuses[topic] = 'locked';
        }
      }
    });

    setTopicStatuses(statuses);
  }, []);

  return (
    <div className="min-h-screen bg-punk-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Hero />
        
        {/* Topics Grid */}
        <section className="mt-16">
          <h2 className="text-3xl font-cyber font-bold text-center mb-12">
            <span className="text-white">Escolha seu </span>
            <span className="text-punk-purple text-glow-sm">Tópico</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.entries(PYTHON_TOPICS).map(([topic, _]) => (
              <TopicCard
                key={topic}
                topic={topic as PythonTopic}
                status={topicStatuses[topic as PythonTopic] || 'locked'}
              />
            ))}
          </div>
        </section>

        {/* Getting Started Guide */}
        <section className="mt-16 max-w-4xl mx-auto">
          <div className="bg-punk-gray/30 rounded-lg p-8 border border-punk-purple/30">
            <h3 className="text-2xl font-cyber font-bold text-punk-green mb-6 text-center">
              🚀 Como Começar
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h4 className="text-lg font-semibold text-punk-purple mb-2">Escolha um Tópico</h4>
                <p className="text-gray-400 text-sm">Comece com "Variáveis" e avance progressivamente</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h4 className="text-lg font-semibold text-punk-blue mb-2">Aprenda & Pratique</h4>
                <p className="text-gray-400 text-sm">Leia as lições e resolva os exercícios interativos</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h4 className="text-lg font-semibold text-punk-green mb-2">Evolua</h4>
                <p className="text-gray-400 text-sm">Complete tópicos para desbloquear novos desafios</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-punk-purple/30 bg-punk-darker/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Feito com <span className="text-punk-pink">❤️</span> para desenvolvedores Python
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Seu progresso é salvo automaticamente no navegador
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
