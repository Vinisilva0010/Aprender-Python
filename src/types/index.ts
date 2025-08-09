// Types for the Python Mastery application

export interface Exercise {
  id: string;
  title: string;
  description: string;
  hint?: string;
  expectedOutput?: string;
  expectedCode?: string;
  testCases?: TestCase[];
  initialCode?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: CodeExample[];
  exercise: Exercise;
  prerequisites?: string[];
  category: PythonTopic;
  order: number;
  estimatedTime: number; // in minutes
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation: string;
  output?: string;
}

export type PythonTopic = 
  | 'variables'
  | 'operators'
  | 'conditionals'
  | 'loops'
  | 'functions'
  | 'lists'
  | 'dictionaries'
  | 'strings'
  | 'files'
  | 'classes'
  | 'modules'
  | 'exceptions';

export interface UserProgress {
  completedLessons: string[];
  currentLesson?: string;
  exerciseAttempts: Record<string, ExerciseAttempt[]>;
  totalTimeSpent: number; // in minutes
  achievements: Achievement[];
  streak: number;
  lastAccessed: string;
}

export interface ExerciseAttempt {
  id: string;
  exerciseId: string;
  code: string;
  isCorrect: boolean;
  timestamp: string;
  timeSpent: number; // in seconds
  hintsUsed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'completion' | 'streak' | 'speed' | 'exploration';
}

export interface AppState {
  currentLesson: Lesson | null;
  userProgress: UserProgress;
  isLoading: boolean;
  error: string | null;
}

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
  errors?: string[];
  suggestions?: string[];
}

// Utility types
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface LessonCard {
  lesson: Lesson;
  status: LessonStatus;
  progress: number; // 0-100
}

// Constants
export const PYTHON_TOPICS: Record<PythonTopic, { title: string; icon: string; color: string }> = {
  variables: { title: 'Variáveis', icon: '📦', color: 'text-punk-purple' },
  operators: { title: 'Operadores', icon: '⚡', color: 'text-punk-blue' },
  conditionals: { title: 'Condicionais', icon: '🔀', color: 'text-punk-green' },
  loops: { title: 'Loops', icon: '🔄', color: 'text-punk-pink' },
  functions: { title: 'Funções', icon: '⚙️', color: 'text-punk-orange' },
  lists: { title: 'Listas', icon: '📋', color: 'text-punk-yellow' },
  dictionaries: { title: 'Dicionários', icon: '📚', color: 'text-punk-red' },
  strings: { title: 'Strings', icon: '🔤', color: 'text-punk-purple' },
  files: { title: 'Arquivos', icon: '📁', color: 'text-punk-blue' },
  classes: { title: 'Classes', icon: '🏗️', color: 'text-punk-green' },
  modules: { title: 'Módulos', icon: '📦', color: 'text-punk-pink' },
  exceptions: { title: 'Exceções', icon: '⚠️', color: 'text-punk-orange' },
};

export const STORAGE_KEYS = {
  USER_PROGRESS: 'python-mastery-progress',
  CURRENT_LESSON: 'python-mastery-current-lesson',
  SETTINGS: 'python-mastery-settings',
} as const;
