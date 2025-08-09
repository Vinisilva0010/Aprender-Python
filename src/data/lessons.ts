import { Lesson, PythonTopic } from '@/types';

export const lessons: Lesson[] = [
  {
    id: 'variables-01',
    title: 'Introdução às Variáveis',
    description: 'Aprenda como criar e usar variáveis em Python',
    content: `
# Variáveis em Python

Em Python, uma **variável** é como uma caixa onde você pode guardar informações. Você pode dar um nome para essa caixa e colocar diferentes tipos de dados dentro dela.

## Como criar uma variável

Para criar uma variável em Python, você simplesmente escreve o nome da variável, seguido do sinal de igual (\`=\`) e o valor que você quer guardar:

\`\`\`python
nome = "Alice"
idade = 25
altura = 1.70
\`\`\`

## Regras para nomes de variáveis

- Use apenas letras, números e underscore (_)
- Não pode começar com número
- Não use palavras reservadas do Python
- Use nomes descritivos

## Tipos de dados básicos

- **String (texto)**: "Olá mundo"
- **Integer (número inteiro)**: 42
- **Float (número decimal)**: 3.14
- **Boolean (verdadeiro/falso)**: True ou False
    `,
    examples: [
      {
        id: 'var-example-1',
        title: 'Criando variáveis simples',
        code: `# Criando diferentes tipos de variáveis
nome = "Python"
versao = 3.11
eh_gratuito = True

print(nome)
print(versao)
print(eh_gratuito)`,
        explanation: 'Este exemplo mostra como criar variáveis de diferentes tipos e exibi-las na tela.',
        output: `Python
3.11
True`
      },
      {
        id: 'var-example-2',
        title: 'Modificando variáveis',
        code: `# Variáveis podem ser modificadas
contador = 0
print("Contador inicial:", contador)

contador = contador + 1
print("Contador depois:", contador)

contador += 5  # Forma abreviada
print("Contador final:", contador)`,
        explanation: 'As variáveis podem ter seus valores alterados durante a execução do programa.',
        output: `Contador inicial: 0
Contador depois: 1
Contador final: 6`
      }
    ],
    exercise: {
      id: 'variables-exercise-01',
      title: 'Primeira Variável',
      description: 'Crie uma variável chamada "meu_nome" e atribua seu nome a ela. Em seguida, exiba o valor da variável usando print().',
      hint: 'Use aspas para criar uma string e a função print() para exibir o valor.',
      expectedCode: 'meu_nome = "',
      expectedOutput: undefined,
      testCases: [
        {
          description: 'Deve criar uma variável chamada meu_nome',
          expectedOutput: 'variável criada'
        }
      ],
      initialCode: '# Crie uma variável chamada meu_nome e atribua seu nome a ela\n# Em seguida, use print() para exibir o valor\n\n',
      difficulty: 'easy'
    },
    prerequisites: [],
    category: 'variables' as PythonTopic,
    order: 1,
    estimatedTime: 10
  },
  {
    id: 'variables-02',
    title: 'Operações com Variáveis',
    description: 'Aprenda a realizar operações matemáticas com variáveis',
    content: `
# Operações com Variáveis

Você pode usar variáveis em operações matemáticas e manipular seus valores de diversas formas.

## Operações básicas

\`\`\`python
a = 10
b = 3

soma = a + b        # 13
subtracao = a - b   # 7
multiplicacao = a * b  # 30
divisao = a / b     # 3.333...
\`\`\`

## Operações de atribuição

Python oferece formas abreviadas para modificar variáveis:

\`\`\`python
x = 5
x += 3  # x = x + 3 → x = 8
x -= 2  # x = x - 2 → x = 6
x *= 2  # x = x * 2 → x = 12
x /= 4  # x = x / 4 → x = 3.0
\`\`\`
    `,
    examples: [
      {
        id: 'var-ops-example-1',
        title: 'Calculadora simples',
        code: `# Calculadora com variáveis
num1 = 15
num2 = 4

print("Números:", num1, "e", num2)
print("Soma:", num1 + num2)
print("Subtração:", num1 - num2)
print("Multiplicação:", num1 * num2)
print("Divisão:", num1 / num2)`,
        explanation: 'Exemplo de operações matemáticas básicas com variáveis.',
        output: `Números: 15 e 4
Soma: 19
Subtração: 11
Multiplicação: 60
Divisão: 3.75`
      }
    ],
    exercise: {
      id: 'variables-exercise-02',
      title: 'Calculadora de Área',
      description: 'Crie variáveis para largura e altura de um retângulo. Calcule e exiba a área (largura × altura).',
      hint: 'Crie duas variáveis numéricas e multiplique-as para obter a área.',
      expectedCode: 'area =',
      testCases: [
        {
          description: 'Deve calcular a área corretamente',
          expectedOutput: 'área calculada'
        }
      ],
      initialCode: '# Crie variáveis para largura e altura\n# Calcule a área (largura * altura)\n# Exiba o resultado\n\n',
      difficulty: 'easy'
    },
    prerequisites: ['variables-01'],
    category: 'variables' as PythonTopic,
    order: 2,
    estimatedTime: 12
  }
];

// Função para buscar lição por ID
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

// Função para buscar lições por categoria
export function getLessonsByCategory(category: PythonTopic): Lesson[] {
  return lessons.filter(lesson => lesson.category === category).sort((a, b) => a.order - b.order);
}

// Função para obter a próxima lição
export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return undefined;
  }
  return lessons[currentIndex + 1];
}

// Função para obter a lição anterior
export function getPreviousLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return lessons[currentIndex - 1];
}
