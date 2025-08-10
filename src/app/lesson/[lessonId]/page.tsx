'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import { Lesson, ExerciseAttempt, ValidationResult } from '@/types';
import { getLessonById, getNextLesson, getPreviousLesson } from '@/data/lessons';
import { 
  markLessonAsCompleted, 
  saveExerciseAttempt, 
  isExerciseSolved,
  setCurrentLesson 
} from '@/utils/localStorage';
import { validatePythonCode, simulatePythonExecution } from '@/utils/codeValidation';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string>('');
  const [isExerciseCompleted, setIsExerciseCompleted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (!lessonId) return;

    const foundLesson = getLessonById(lessonId);
    if (foundLesson) {
      setLesson(foundLesson);
      setUserCode(foundLesson.exercise.initialCode || '');
      setCurrentLesson(lessonId);
      setIsExerciseCompleted(isExerciseSolved(foundLesson.exercise.id));
    }
  }, [lessonId]);

  const handleCodeChange = (code: string) => {
    setUserCode(code);
    setValidationResult(null);
    setExecutionOutput('');
  };

  const handleRunCode = () => {
    if (!lesson) return;

    const result = simulatePythonExecution(userCode);
    if (result.error) {
      setExecutionOutput(`❌ Erro: ${result.error}`);
    } else {
      setExecutionOutput(`✅ Saída:\n${result.output}`);
    }
  };

  const handleValidateCode = async () => {
    if (!lesson) return;

    setIsValidating(true);
    
    // Simular delay da validação
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = validatePythonCode(userCode, lesson.exercise);
    setValidationResult(result);
    
    // Salvar tentativa
    const attempt: ExerciseAttempt = {
      id: Date.now().toString(),
      exerciseId: lesson.exercise.id,
      code: userCode,
      isCorrect: result.isCorrect,
      timestamp: new Date().toISOString(),
      timeSpent: 0, // Simplificado
      hintsUsed: showHint ? 1 : 0
    };
    
    saveExerciseAttempt(attempt);
    setAttemptCount(prev => prev + 1);
    
    if (result.isCorrect) {
      setIsExerciseCompleted(true);
      markLessonAsCompleted(lessonId);
    }
    
    setIsValidating(false);
  };

  const handleNextLesson = () => {
    if (!lesson) return;
    
    const nextLesson = getNextLesson(lesson.id);
    if (nextLesson) {
      router.push(`/lesson/${nextLesson.id}`);
    } else {
      router.push(`/topic/${lesson.category}`);
    }
  };

  const handlePreviousLesson = () => {
    if (!lesson) return;
    
    const previousLesson = getPreviousLesson(lesson.id);
    if (previousLesson) {
      router.push(`/lesson/${previousLesson.id}`);
    } else {
      router.push(`/topic/${lesson.category}`);
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-punk-dark">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl text-white">Lição não encontrada</h1>
          <Link href="/" className="text-punk-blue hover:text-punk-blue-glow">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-punk-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href={`/topic/${lesson.category}`} 
            className="text-punk-blue hover:text-punk-blue-glow flex items-center"
          >
            ← Voltar ao tópico
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousLesson}
              className="text-punk-purple hover:text-punk-purple-glow"
            >
              ← Anterior
            </button>
            <button
              onClick={handleNextLesson}
              className="text-punk-green hover:text-punk-green-glow"
              disabled={!isExerciseCompleted}
            >
              Próxima →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Panel */}
          <div className="space-y-6">
            {/* Lesson Header */}
            <div className="bg-punk-gray/30 rounded-lg p-6 border border-punk-purple/30">
              <h1 className="text-3xl font-cyber font-bold text-punk-green mb-2">
                {lesson.title}
              </h1>
              <p className="text-gray-400 mb-4">{lesson.description}</p>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-punk-blue">
                  ⏱️ {lesson.estimatedTime} min
                </span>
                <span className={`px-2 py-1 rounded ${
                  lesson.exercise.difficulty === 'easy' ? 'bg-punk-green/20 text-punk-green' :
                  lesson.exercise.difficulty === 'medium' ? 'bg-punk-orange/20 text-punk-orange' :
                  'bg-punk-red/20 text-punk-red'
                }`}>
                  {lesson.exercise.difficulty === 'easy' ? 'Fácil' :
                   lesson.exercise.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                </span>
                {isExerciseCompleted && (
                  <span className="text-punk-green">✓ Completo</span>
                )}
              </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-punk-gray/30 rounded-lg p-6 border border-punk-purple/30">
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: lesson.content.replace(/\n/g, '<br />').replace(/`([^`]+)`/g, '<code class="bg-punk-gray px-1 py-0.5 rounded text-punk-green">$1</code>')
                }}
              />
            </div>

            {/* Examples */}
            {lesson.examples.map((example) => (
              <div key={example.id} className="bg-punk-gray/30 rounded-lg p-6 border border-punk-blue/30">
                <h3 className="text-xl font-semibold text-punk-blue mb-3">
                  📝 {example.title}
                </h3>
                <p className="text-gray-400 mb-4">{example.explanation}</p>
                
                <CodeEditor
                  initialCode={example.code}
                  onChange={() => {}}
                  height="200px"
                  readOnly={true}
                />
                
                {example.output && (
                  <div className="mt-4 bg-punk-dark/50 rounded p-3 border border-punk-green/30">
                    <div className="text-punk-green text-sm font-mono">
                      📤 Saída:
                    </div>
                    <pre className="text-white font-mono text-sm mt-1">
                      {example.output}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Exercise Panel */}
          <div className="space-y-6">
            {/* Exercise */}
            <div className="bg-punk-gray/30 rounded-lg p-6 border border-punk-orange/30">
              <h2 className="text-2xl font-cyber font-bold text-punk-orange mb-3">
                🎯 {lesson.exercise.title}
              </h2>
              <p className="text-gray-300 mb-4">{lesson.exercise.description}</p>
              
              {/* Hint */}
              {lesson.exercise.hint && (
                <div className="mb-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-punk-yellow hover:text-punk-yellow/80 text-sm"
                  >
                    💡 {showHint ? 'Ocultar dica' : 'Mostrar dica'}
                  </button>
                  
                  {showHint && (
                    <div className="mt-2 bg-punk-yellow/10 border border-punk-yellow/30 rounded p-3">
                      <p className="text-punk-yellow text-sm">{lesson.exercise.hint}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Code Editor */}
              <div className="mb-4">
                <CodeEditor
                  initialCode={userCode}
                  onChange={handleCodeChange}
                  height="250px"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={handleRunCode}
                  className="bg-punk-blue/20 border border-punk-blue hover:bg-punk-blue/30 text-punk-blue px-4 py-2 rounded transition-colors"
                >
                  ▶️ Executar
                </button>
                
                <button
                  onClick={handleValidateCode}
                  disabled={isValidating}
                  className="bg-punk-green/20 border border-punk-green hover:bg-punk-green/30 text-punk-green px-4 py-2 rounded transition-colors disabled:opacity-50"
                >
                  {isValidating ? '⏳ Validando...' : '✅ Verificar'}
                </button>
              </div>

              {/* Output */}
              {executionOutput && (
                <div className="mb-4 bg-punk-dark/50 rounded p-3 border border-punk-gray">
                  <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                    {executionOutput}
                  </pre>
                </div>
              )}

              {/* Validation Result */}
              {validationResult && (
                <div className={`rounded p-4 border ${
                  validationResult.isCorrect 
                    ? 'bg-punk-green/10 border-punk-green text-punk-green'
                    : 'bg-punk-red/10 border-punk-red text-punk-red'
                }`}>
                  <div className="font-semibold mb-2">
                    {validationResult.message}
                  </div>
                  
                  {validationResult.errors && validationResult.errors.length > 0 && (
                    <div className="mb-2">
                      <div className="text-sm font-medium mb-1">Problemas encontrados:</div>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {validationResult.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {validationResult.suggestions && validationResult.suggestions.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Sugestões:</div>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {validationResult.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="mt-4 text-sm text-gray-400">
                Tentativas: {attemptCount}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

