'use client';

import { useEffect, useState } from 'react';
import { loadUserProgress } from '@/utils/localStorage';

export default function Hero() {
  const [userName, setUserName] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const progress = loadUserProgress();
    // Simular nome do usuário baseado no progresso
    if (progress.completedLessons.length > 0) {
      setUserName('Pythonista');
    } else {
      setUserName('Futuro Pythonista');
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-punk-gray rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-punk-gray rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="text-center py-12 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-cyber-gradient opacity-10"></div>
      
      <div className="relative z-10">
        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl font-cyber font-bold mb-4">
          <span className="text-white">Bem-vindo ao </span>
          <span className="text-punk-green text-glow animate-glow">Python</span>
          <br />
          <span className="text-punk-purple text-glow animate-glow">Mastery</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-2 font-medium">
          Olá, <span className="text-punk-blue text-glow-sm">{userName}</span>! 👋
        </p>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Domine Python através de lições interativas, exercícios práticos e 
          feedback instantâneo. Sua jornada para se tornar um expert em Python 
          começa aqui!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-punk-gray/30 rounded-lg p-6 border border-punk-purple/30 hover:border-punk-purple/60 transition-all duration-300">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-punk-purple font-semibold text-lg mb-1">Focado</h3>
            <p className="text-gray-400 text-sm">Aprenda conceitos específicos com exercícios direcionados</p>
          </div>

          <div className="bg-punk-gray/30 rounded-lg p-6 border border-punk-green/30 hover:border-punk-green/60 transition-all duration-300">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-punk-green font-semibold text-lg mb-1">Interativo</h3>
            <p className="text-gray-400 text-sm">Pratique com editor de código e feedback imediato</p>
          </div>

          <div className="bg-punk-gray/30 rounded-lg p-6 border border-punk-blue/30 hover:border-punk-blue/60 transition-all duration-300">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-punk-blue font-semibold text-lg mb-1">Progressivo</h3>
            <p className="text-gray-400 text-sm">Avance no seu ritmo com sistema de progressão</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <p className="text-punk-yellow text-lg font-semibold animate-pulse">
            ↓ Escolha um tópico para começar ↓
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-punk-purple/20 text-6xl animate-bounce delay-1000">
        &lt;/&gt;
      </div>
      <div className="absolute bottom-20 right-10 text-punk-green/20 text-4xl animate-bounce delay-2000">
        🐍
      </div>
    </section>
  );
}
