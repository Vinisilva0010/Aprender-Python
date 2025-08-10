import { UserProgress, ExerciseAttempt, Achievement, STORAGE_KEYS } from '@/types';

// Progresso padrão do usuário
const defaultUserProgress: UserProgress = {
  completedLessons: [],
  currentLesson: undefined,
  exerciseAttempts: {},
  totalTimeSpent: 0,
  achievements: [],
  streak: 0,
  lastAccessed: new Date().toISOString(),
};

// Função para verificar se estamos no browser
const isBrowser = typeof window !== 'undefined';

// Carregar progresso do usuário
export function loadUserProgress(): UserProgress {
  if (!isBrowser) return defaultUserProgress;
  
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (saved) {
      const progress = JSON.parse(saved) as UserProgress;
      // Atualizar última vez acessado
      progress.lastAccessed = new Date().toISOString();
      return progress;
    }
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
  }
  
  return defaultUserProgress;
}

// Salvar progresso do usuário
export function saveUserProgress(progress: UserProgress): void {
  if (!isBrowser) return;
  
  try {
    const updatedProgress = {
      ...progress,
      lastAccessed: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(updatedProgress));
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
  }
}

// Marcar lição como completa
export function markLessonAsCompleted(lessonId: string): void {
  const progress = loadUserProgress();
  
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveUserProgress(progress);
  }
}

// Verificar se lição está completa
export function isLessonCompleted(lessonId: string): boolean {
  const progress = loadUserProgress();
  return progress.completedLessons.includes(lessonId);
}

// Salvar tentativa de exercício
export function saveExerciseAttempt(attempt: ExerciseAttempt): void {
  const progress = loadUserProgress();
  
  if (!progress.exerciseAttempts[attempt.exerciseId]) {
    progress.exerciseAttempts[attempt.exerciseId] = [];
  }
  
  progress.exerciseAttempts[attempt.exerciseId].push(attempt);
  
  // Manter apenas as últimas 10 tentativas por exercício
  if (progress.exerciseAttempts[attempt.exerciseId].length > 10) {
    progress.exerciseAttempts[attempt.exerciseId] = 
      progress.exerciseAttempts[attempt.exerciseId].slice(-10);
  }
  
  saveUserProgress(progress);
}

// Obter tentativas de exercício
export function getExerciseAttempts(exerciseId: string): ExerciseAttempt[] {
  const progress = loadUserProgress();
  return progress.exerciseAttempts[exerciseId] || [];
}

// Verificar se exercício foi resolvido
export function isExerciseSolved(exerciseId: string): boolean {
  const attempts = getExerciseAttempts(exerciseId);
  return attempts.some(attempt => attempt.isCorrect);
}

// Adicionar conquista
export function addAchievement(achievement: Achievement): void {
  const progress = loadUserProgress();
  
  // Verificar se já possui esta conquista
  if (!progress.achievements.find(a => a.id === achievement.id)) {
    progress.achievements.push(achievement);
    saveUserProgress(progress);
  }
}

// Atualizar tempo gasto
export function updateTimeSpent(timeInMinutes: number): void {
  const progress = loadUserProgress();
  progress.totalTimeSpent += timeInMinutes;
  saveUserProgress(progress);
}

// Atualizar sequência (streak)
export function updateStreak(): void {
  const progress = loadUserProgress();
  const lastAccessed = new Date(progress.lastAccessed);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastAccessed.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    // Usuário acessou ontem, incrementar streak
    progress.streak += 1;
  } else if (diffDays > 1) {
    // Usuário perdeu o streak
    progress.streak = 1;
  }
  // Se diffDays === 0, usuário já acessou hoje, manter streak
  
  saveUserProgress(progress);
}

// Definir lição atual
export function setCurrentLesson(lessonId: string): void {
  const progress = loadUserProgress();
  progress.currentLesson = lessonId;
  saveUserProgress(progress);
}

// Obter lição atual
export function getCurrentLesson(): string | undefined {
  const progress = loadUserProgress();
  return progress.currentLesson;
}

// Resetar progresso (para desenvolvimento/teste)
export function resetProgress(): void {
  if (!isBrowser) return;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_LESSON);
  } catch (error) {
    console.error('Erro ao resetar progresso:', error);
  }
}

// Exportar dados (backup)
export function exportProgress(): string {
  const progress = loadUserProgress();
  return JSON.stringify(progress, null, 2);
}

// Importar dados (restore)
export function importProgress(data: string): boolean {
  try {
    const progress = JSON.parse(data) as UserProgress;
    saveUserProgress(progress);
    return true;
  } catch (error) {
    console.error('Erro ao importar progresso:', error);
    return false;
  }
}

