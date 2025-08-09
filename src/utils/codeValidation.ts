import { Exercise, ValidationResult } from '@/types';

// Simular execução de código Python (simplificado para demo)
export function validatePythonCode(code: string, exercise: Exercise): ValidationResult {
  const trimmedCode = code.trim();
  
  if (!trimmedCode) {
    return {
      isCorrect: false,
      message: 'Escreva algum código para continuar!',
      errors: ['Código vazio'],
      suggestions: ['Tente escrever uma linha de código Python']
    };
  }

  // Validações específicas baseadas no exercício
  switch (exercise.id) {
    case 'variables-exercise-01':
      return validateVariablesExercise01(trimmedCode);
    case 'variables-exercise-02':
      return validateVariablesExercise02(trimmedCode);
    default:
      return validateGenericPython(trimmedCode, exercise);
  }
}

function validateVariablesExercise01(code: string): ValidationResult {
  const lines = code.split('\n').map(line => line.trim()).filter(line => line);
  
  // Verificar se tem variável meu_nome
  const hasVariable = lines.some(line => 
    line.includes('meu_nome') && line.includes('=') && !line.startsWith('#')
  );
  
  if (!hasVariable) {
    return {
      isCorrect: false,
      message: 'Você precisa criar uma variável chamada "meu_nome"',
      errors: ['Variável meu_nome não encontrada'],
      suggestions: ['Use: meu_nome = "Seu Nome"']
    };
  }

  // Verificar se tem print
  const hasPrint = lines.some(line => 
    line.includes('print') && line.includes('meu_nome')
  );
  
  if (!hasPrint) {
    return {
      isCorrect: false,
      message: 'Você precisa usar print() para exibir o valor da variável',
      errors: ['Comando print não encontrado'],
      suggestions: ['Use: print(meu_nome)']
    };
  }

  // Verificar se usou aspas
  const hasQuotes = lines.some(line => 
    line.includes('"') || line.includes("'")
  );
  
  if (!hasQuotes) {
    return {
      isCorrect: false,
      message: 'Lembre-se de usar aspas para criar uma string',
      errors: ['String sem aspas'],
      suggestions: ['Use aspas: "seu nome" ou \'seu nome\'']
    };
  }

  return {
    isCorrect: true,
    message: '🎉 Perfeito! Você criou sua primeira variável e a exibiu na tela!',
  };
}

function validateVariablesExercise02(code: string): ValidationResult {
  const lines = code.split('\n').map(line => line.trim()).filter(line => line);
  
  // Verificar se tem variáveis largura e altura
  const hasLargura = lines.some(line => 
    line.includes('largura') && line.includes('=') && !line.startsWith('#')
  );
  
  const hasAltura = lines.some(line => 
    line.includes('altura') && line.includes('=') && !line.startsWith('#')
  );
  
  if (!hasLargura || !hasAltura) {
    return {
      isCorrect: false,
      message: 'Você precisa criar variáveis para largura e altura',
      errors: ['Variáveis largura e/ou altura não encontradas'],
      suggestions: ['Use: largura = 10 e altura = 5']
    };
  }

  // Verificar se tem cálculo da área
  const hasArea = lines.some(line => 
    line.includes('area') && line.includes('=') && 
    (line.includes('largura') || line.includes('altura')) &&
    line.includes('*')
  );
  
  if (!hasArea) {
    return {
      isCorrect: false,
      message: 'Você precisa calcular a área multiplicando largura * altura',
      errors: ['Cálculo da área não encontrado'],
      suggestions: ['Use: area = largura * altura']
    };
  }

  // Verificar se tem print da área
  const hasPrint = lines.some(line => 
    line.includes('print') && line.includes('area')
  );
  
  if (!hasPrint) {
    return {
      isCorrect: false,
      message: 'Você precisa exibir o resultado da área',
      errors: ['Print da área não encontrado'],
      suggestions: ['Use: print(area) ou print("Área:", area)']
    };
  }

  return {
    isCorrect: true,
    message: '🎉 Excelente! Você calculou a área corretamente usando variáveis!',
  };
}

function validateGenericPython(code: string, exercise: Exercise): ValidationResult {
  // Validações básicas de sintaxe Python
  const errors: string[] = [];
  const suggestions: string[] = [];

  // Verificar parênteses balanceados
  let parenthesesCount = 0;
  for (const char of code) {
    if (char === '(') parenthesesCount++;
    if (char === ')') parenthesesCount--;
    if (parenthesesCount < 0) {
      errors.push('Parênteses não balanceados');
      suggestions.push('Verifique se todos os parênteses estão fechados corretamente');
      break;
    }
  }
  
  if (parenthesesCount > 0) {
    errors.push('Parênteses não fechados');
    suggestions.push('Feche todos os parênteses abertos');
  }

  // Verificar indentação básica
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() && line.startsWith(' ') && !line.startsWith('    ')) {
      errors.push(`Linha ${i + 1}: Indentação incorreta`);
      suggestions.push('Use 4 espaços para indentação em Python');
      break;
    }
  }

  // Se tem código esperado, verificar se contém
  if (exercise.expectedCode) {
    const hasExpectedCode = code.toLowerCase().includes(exercise.expectedCode.toLowerCase());
    if (!hasExpectedCode) {
      errors.push('Código não contém elementos esperados');
      suggestions.push(`Tente incluir: ${exercise.expectedCode}`);
    }
  }

  if (errors.length > 0) {
    return {
      isCorrect: false,
      message: 'Há alguns problemas no seu código',
      errors,
      suggestions
    };
  }

  return {
    isCorrect: true,
    message: '✅ Código válido! Parabéns!',
  };
}

// Executar código Python simulado (apenas para demonstração)
export function simulatePythonExecution(code: string): { output: string; error?: string } {
  try {
    // Esta é uma simulação muito básica
    // Em um ambiente real, você usaria um interpretador Python real
    
    const lines = code.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
    const output: string[] = [];
    const variables: Record<string, any> = {};
    
    for (const line of lines) {
      if (line.includes('=') && !line.includes('==') && !line.includes('print')) {
        // Atribuição de variável (simulação simples)
        const parts = line.split('=');
        if (parts.length === 2) {
          const varName = parts[0].trim();
          const value = parts[1].trim();
          
          // Avaliar valor simples
          if (value.startsWith('"') && value.endsWith('"')) {
            variables[varName] = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            variables[varName] = value.slice(1, -1);
          } else if (!isNaN(Number(value))) {
            variables[varName] = Number(value);
          } else if (value.includes('*')) {
            // Operação simples
            const operands = value.split('*').map(op => op.trim());
            if (operands.length === 2) {
              const val1 = variables[operands[0]] || Number(operands[0]) || 0;
              const val2 = variables[operands[1]] || Number(operands[1]) || 0;
              variables[varName] = val1 * val2;
            }
          }
        }
      } else if (line.includes('print(')) {
        // Comando print (simulação simples)
        const match = line.match(/print\(([^)]+)\)/);
        if (match) {
          const content = match[1].trim();
          if (variables[content] !== undefined) {
            output.push(String(variables[content]));
          } else if (content.startsWith('"') && content.endsWith('"')) {
            output.push(content.slice(1, -1));
          } else if (content.startsWith("'") && content.endsWith("'")) {
            output.push(content.slice(1, -1));
          } else {
            output.push(content);
          }
        }
      }
    }
    
    return { output: output.join('\n') || 'Código executado com sucesso!' };
  } catch (error) {
    return { 
      output: '', 
      error: 'Erro na execução: ' + (error instanceof Error ? error.message : 'Erro desconhecido')
    };
  }
}
