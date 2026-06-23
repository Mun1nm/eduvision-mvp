import {
  Assessment,
  ClassGroup,
  InterventionPlan,
  PedagogicalAlert,
  ReportSnapshot,
  Skill,
  Teacher
} from "../types";

export const teacher: Teacher = {
  name: "Marina Lopes",
  role: "Professora de Matemática",
  school: "Escola Municipal Paulo Freire",
  initials: "ML"
};

export const skills: Skill[] = [
  {
    id: "hab-porcentagem",
    code: "EF08MA04",
    name: "Resolver problemas com porcentagens",
    area: "Matemática",
    mastery: 58,
    vulnerability: 42,
    trend: -6
  },
  {
    id: "hab-fracao-decimal",
    code: "EF07MA08",
    name: "Converter fração em decimal",
    area: "Matemática",
    mastery: 51,
    vulnerability: 49,
    trend: -9
  },
  {
    id: "hab-proporcionalidade",
    code: "EF08MA12",
    name: "Reconhecer relações de proporcionalidade",
    area: "Matemática",
    mastery: 64,
    vulnerability: 36,
    trend: 3
  },
  {
    id: "hab-grafico",
    code: "EF08MA23",
    name: "Interpretar gráficos e tabelas",
    area: "Matemática",
    mastery: 71,
    vulnerability: 29,
    trend: 5
  },
  {
    id: "hab-argumentacao",
    code: "EF89LP15",
    name: "Justificar respostas com evidências",
    area: "Linguagens",
    mastery: 62,
    vulnerability: 38,
    trend: 1
  },
  {
    id: "hab-citologia",
    code: "EM13CNT202",
    name: "Relacionar estruturas celulares e funções",
    area: "Ciências da Natureza",
    mastery: 76,
    vulnerability: 24,
    trend: 4
  }
];

export const classGroups: ClassGroup[] = [
  {
    id: "turma-8b",
    name: "8º Ano B",
    grade: "Ensino Fundamental II",
    subjectFocus: "Matemática",
    teacher: "Profa. Marina Lopes",
    room: "Sala 08",
    color: "#2563EB",
    performanceTrend: -4,
    criticalSkillIds: ["hab-fracao-decimal", "hab-porcentagem"],
    students: [
      {
        id: "alu-ana",
        name: "Ana Clara Martins",
        avatarColor: "#2563EB",
        attendanceRate: 96,
        risk: "baixo",
        note: "Boa autonomia, precisa explicitar etapas em problemas."
      },
      {
        id: "alu-bruno",
        name: "Bruno Henrique Costa",
        avatarColor: "#F59E0B",
        attendanceRate: 89,
        risk: "alto",
        note: "Erros recorrentes em conversão de fração para decimal."
      },
      {
        id: "alu-camila",
        name: "Camila Azevedo",
        avatarColor: "#14B8A6",
        attendanceRate: 92,
        risk: "médio",
        note: "Compreende porcentagem, mas se perde em enunciados longos."
      },
      {
        id: "alu-diego",
        name: "Diego Almeida",
        avatarColor: "#8B5CF6",
        attendanceRate: 84,
        risk: "alto",
        note: "Precisa de retomada guiada em operações com decimais."
      }
    ]
  },
  {
    id: "turma-1a",
    name: "1ª Série A",
    grade: "Ensino Médio",
    subjectFocus: "Matemática",
    teacher: "Profa. Marina Lopes",
    room: "Laboratório 2",
    color: "#0F766E",
    performanceTrend: 5,
    criticalSkillIds: ["hab-grafico", "hab-proporcionalidade"],
    students: [
      {
        id: "alu-elisa",
        name: "Elisa Ramos",
        avatarColor: "#06B6D4",
        attendanceRate: 97,
        risk: "baixo",
        note: "Apresenta respostas completas e boa leitura gráfica."
      },
      {
        id: "alu-felipe",
        name: "Felipe Nascimento",
        avatarColor: "#EF4444",
        attendanceRate: 91,
        risk: "médio",
        note: "Confunde taxa de variação com valor inicial em funções."
      },
      {
        id: "alu-giovana",
        name: "Giovana Prado",
        avatarColor: "#10B981",
        attendanceRate: 88,
        risk: "baixo",
        note: "Boa evolução após feedbacks individuais."
      }
    ]
  },
  {
    id: "turma-2c",
    name: "2ª Série C",
    grade: "Ensino Médio",
    subjectFocus: "Biologia e Física",
    teacher: "Profa. Marina Lopes",
    room: "Sala Maker",
    color: "#7C3AED",
    performanceTrend: 2,
    criticalSkillIds: ["hab-citologia", "hab-argumentacao"],
    students: [
      {
        id: "alu-iris",
        name: "Íris Teixeira",
        avatarColor: "#EC4899",
        attendanceRate: 95,
        risk: "baixo",
        note: "Excelente repertório conceitual."
      },
      {
        id: "alu-joao",
        name: "João Pedro Lima",
        avatarColor: "#22C55E",
        attendanceRate: 90,
        risk: "médio",
        note: "Troca funções de núcleo e citoplasma."
      },
      {
        id: "alu-larissa",
        name: "Larissa Gomes",
        avatarColor: "#3B82F6",
        attendanceRate: 93,
        risk: "baixo",
        note: "Precisa detalhar justificativas discursivas."
      }
    ]
  }
];

export const assessments: Assessment[] = [
  {
    id: "av-8b-fracoes",
    title: "Frações e porcentagem",
    subject: "Matemática",
    date: "2026-06-14",
    classId: "turma-8b",
    average: 6.4,
    correctionProgress: 75,
    pendingValidations: 3,
    corePattern: "Dificuldade em converter fração para decimal antes de calcular porcentagens.",
    questions: [
      {
        id: "q-8b-1",
        number: 1,
        type: "objetiva",
        statement: "Qual alternativa representa 3/4 em forma decimal?",
        correctAnswer: "0,75",
        acceptanceCriteria: ["Reconhece 3 dividido por 4", "Seleciona 0,75 sem arredondamento"],
        expectedKeywords: ["0,75", "três quartos", "decimal"],
        skillIds: ["hab-fracao-decimal"],
        points: 2,
        weight: 1,
        rigor: "Essencial",
        rubric: [
          {
            id: "r-8b-1a",
            label: "Conversão correta",
            description: "Identifica que 3/4 corresponde a 0,75.",
            points: 2
          }
        ]
      },
      {
        id: "q-8b-2",
        number: 2,
        type: "discursiva",
        statement: "Uma camiseta de R$ 80 recebeu desconto de 25%. Explique o cálculo e encontre o novo preço.",
        correctAnswer: "25% de 80 é 20; o novo preço é R$ 60.",
        acceptanceCriteria: [
          "Calcula corretamente 25% de 80",
          "Subtrai o desconto do preço inicial",
          "Apresenta a resposta em reais"
        ],
        expectedKeywords: ["25%", "20", "60", "desconto"],
        skillIds: ["hab-porcentagem", "hab-proporcionalidade"],
        points: 4,
        weight: 2,
        rigor: "Adequado",
        rubric: [
          {
            id: "r-8b-2a",
            label: "Cálculo do percentual",
            description: "Determina que 25% de R$ 80 equivale a R$ 20.",
            points: 2
          },
          {
            id: "r-8b-2b",
            label: "Interpretação do desconto",
            description: "Subtrai o desconto e conclui o preço final de R$ 60.",
            points: 2
          }
        ]
      },
      {
        id: "q-8b-3",
        number: 3,
        type: "discursiva",
        statement: "Explique por que 1/5 pode ser usado para calcular 20% de uma quantidade.",
        correctAnswer: "Porque 20% equivale a 20/100, que simplifica para 1/5.",
        acceptanceCriteria: [
          "Relaciona porcentagem a fração de denominador 100",
          "Simplifica 20/100 para 1/5",
          "Usa linguagem matemática clara"
        ],
        expectedKeywords: ["20/100", "1/5", "equivale", "simplifica"],
        skillIds: ["hab-fracao-decimal", "hab-porcentagem"],
        points: 4,
        weight: 2,
        rigor: "Avançado",
        rubric: [
          {
            id: "r-8b-3a",
            label: "Equivalência",
            description: "Mostra que 20% e 20/100 representam a mesma parte.",
            points: 2
          },
          {
            id: "r-8b-3b",
            label: "Justificativa",
            description: "Simplifica a fração e explica a relação com 1/5.",
            points: 2
          }
        ]
      }
    ],
    results: [
      {
        studentId: "alu-ana",
        status: "validado",
        grade: 8.4,
        maxGrade: 10,
        correctedAt: "2026-06-14T15:41:00",
        decision: "aprovar",
        summary: "Boa compreensão de porcentagens e justificativa quase completa na equivalência com frações.",
        finalFeedback:
          "Ana, você demonstrou domínio do cálculo de desconto e organizou bem as etapas. Para avançar, explique com mais detalhe por que duas representações são equivalentes.",
        recommendedPlan: ["Resolver problemas com descontos sucessivos", "Justificar equivalências usando 100 como referência"],
        questionCorrections: [
          {
            questionId: "q-8b-1",
            answer: "0,75",
            score: 2,
            maxScore: 2,
            isCorrect: true,
            confidence: 99,
            aiFeedback: "Conversão correta e sem indícios de marcação ambígua.",
            handwritingSignal: "Marcação objetiva limpa",
            attentionPoint: "Sem ponto crítico."
          },
          {
            questionId: "q-8b-2",
            answer: "25% de 80 é 20. Então 80 - 20 = 60 reais.",
            score: 4,
            maxScore: 4,
            isCorrect: true,
            confidence: 96,
            aiFeedback: "Resposta completa: calcula o desconto e interpreta o novo preço.",
            handwritingSignal: "Escrita regular, OCR estável",
            attentionPoint: "Manter registro das unidades monetárias."
          },
          {
            questionId: "q-8b-3",
            answer: "Porque 20% é parecido com dividir por 5, então dá 1/5.",
            score: 2.4,
            maxScore: 4,
            isCorrect: true,
            confidence: 87,
            aiFeedback:
              "A ideia central aparece, mas faltou explicitar que 20% = 20/100 e simplificar a fração.",
            handwritingSignal: "Trecho curto com boa legibilidade",
            attentionPoint: "Pedir justificativa formal da equivalência."
          }
        ]
      },
      {
        studentId: "alu-bruno",
        status: "corrigido",
        grade: 5.2,
        maxGrade: 10,
        correctedAt: "2026-06-14T15:44:00",
        decision: "ajustar",
        summary: "Acerta parcialmente procedimentos, mas troca fração equivalente por aproximação decimal incorreta.",
        finalFeedback:
          "Bruno, você iniciou bem os cálculos, mas precisa conferir a conversão entre fração, decimal e porcentagem antes de concluir. Refaça as etapas com calma e registre cada transformação.",
        recommendedPlan: [
          "Retomada guiada com frações equivalentes",
          "Exercícios progressivos de fração para decimal",
          "Tabela de referência: 1/2, 1/4, 1/5, 3/4"
        ],
        questionCorrections: [
          {
            questionId: "q-8b-1",
            answer: "0,34",
            score: 0,
            maxScore: 2,
            isCorrect: false,
            confidence: 94,
            aiFeedback: "A resposta sugere leitura de 3/4 como 0,34, erro recorrente de notação.",
            handwritingSignal: "Dígitos nítidos, sem rasura",
            attentionPoint: "Confusão entre numerador/denominador e escrita decimal."
          },
          {
            questionId: "q-8b-2",
            answer: "25 de 80 fica 55 reais.",
            score: 1.8,
            maxScore: 4,
            isCorrect: false,
            confidence: 82,
            aiFeedback: "Identifica que há desconto, mas calcula 25 como valor absoluto em vez de 25%.",
            handwritingSignal: "OCR com confiança moderada em um número",
            attentionPoint: "Distinguir percentual de valor absoluto."
          },
          {
            questionId: "q-8b-3",
            answer: "Porque 1 dividido por 5 dá 0,5.",
            score: 1.4,
            maxScore: 4,
            isCorrect: false,
            confidence: 79,
            aiFeedback: "Há erro conceitual: 1/5 equivale a 0,2, não 0,5.",
            handwritingSignal: "Escrita comprimida, mas legível",
            attentionPoint: "Retomar frações unitárias com material visual."
          }
        ]
      },
      {
        studentId: "alu-camila",
        status: "corrigido",
        grade: 7.1,
        maxGrade: 10,
        correctedAt: "2026-06-14T15:49:00",
        decision: "aprovar",
        summary: "Resolve os cálculos principais, mas precisa melhorar a clareza da explicação discursiva.",
        finalFeedback:
          "Camila, seus cálculos mostram boa compreensão. Na próxima resposta, escreva a regra usada antes de apresentar o resultado para deixar seu raciocínio mais claro.",
        recommendedPlan: ["Treinar respostas com frase inicial de estratégia", "Resolver problemas de porcentagem em dupla"],
        questionCorrections: [
          {
            questionId: "q-8b-1",
            answer: "0,75",
            score: 2,
            maxScore: 2,
            isCorrect: true,
            confidence: 98,
            aiFeedback: "Resposta correta.",
            handwritingSignal: "Marcação sem ruído",
            attentionPoint: "Sem ponto crítico."
          },
          {
            questionId: "q-8b-2",
            answer: "80 dividido por 4 é 20, paga 60.",
            score: 3.4,
            maxScore: 4,
            isCorrect: true,
            confidence: 91,
            aiFeedback: "Estratégia correta para 25%, mas faltou nomear o desconto no texto.",
            handwritingSignal: "Letra clara",
            attentionPoint: "Explicitar por que dividir por 4 representa 25%."
          },
          {
            questionId: "q-8b-3",
            answer: "20 por cento é uma parte de cinco partes.",
            score: 1.7,
            maxScore: 4,
            isCorrect: true,
            confidence: 83,
            aiFeedback: "A intuição está correta, mas faltou usar 20/100 e simplificação.",
            handwritingSignal: "Resposta curta",
            attentionPoint: "Converter a ideia verbal em representação matemática."
          }
        ]
      },
      {
        studentId: "alu-diego",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        decision: "rejeitar",
        summary: "Correção ainda não validada pelo professor.",
        finalFeedback: "",
        recommendedPlan: [],
        questionCorrections: []
      }
    ]
  },
  {
    id: "av-8b-graficos",
    title: "Leitura de gráficos",
    subject: "Matemática",
    date: "2026-06-03",
    classId: "turma-8b",
    average: 7.0,
    correctionProgress: 100,
    pendingValidations: 0,
    corePattern: "A turma interpreta eixos, mas ainda confunde variação absoluta com variação percentual.",
    questions: [
      {
        id: "q-8b-g1",
        number: 1,
        type: "mista",
        statement: "Leia o gráfico de barras e identifique o maior crescimento entre os meses.",
        correctAnswer: "De março para abril, com aumento de 12 unidades.",
        acceptanceCriteria: ["Compara meses consecutivos", "Calcula a diferença corretamente"],
        expectedKeywords: ["março", "abril", "12"],
        skillIds: ["hab-grafico"],
        points: 5,
        weight: 1,
        rigor: "Adequado",
        rubric: [
          {
            id: "r-8b-g1a",
            label: "Leitura de eixo",
            description: "Localiza corretamente valores no gráfico.",
            points: 2
          },
          {
            id: "r-8b-g1b",
            label: "Comparação",
            description: "Compara variações entre meses consecutivos.",
            points: 3
          }
        ]
      }
    ],
    results: [
      {
        studentId: "alu-ana",
        status: "validado",
        grade: 8.1,
        maxGrade: 10,
        correctedAt: "2026-06-03T10:20:00",
        decision: "aprovar",
        summary: "Boa leitura dos eixos e comparação de valores.",
        finalFeedback: "Sua leitura do gráfico foi precisa. Continue justificando as comparações com números.",
        recommendedPlan: ["Comparar dois gráficos da mesma situação"],
        questionCorrections: []
      },
      {
        studentId: "alu-bruno",
        status: "validado",
        grade: 6.4,
        maxGrade: 10,
        correctedAt: "2026-06-03T10:25:00",
        decision: "aprovar",
        summary: "Localiza valores, mas calcula variação com inconsistência.",
        finalFeedback: "Você encontrou os meses corretos, mas precisa revisar a diferença entre os valores.",
        recommendedPlan: ["Treinar subtrações a partir de gráficos"],
        questionCorrections: []
      },
      {
        studentId: "alu-camila",
        status: "validado",
        grade: 7.5,
        maxGrade: 10,
        correctedAt: "2026-06-03T10:30:00",
        decision: "aprovar",
        summary: "Boa interpretação visual.",
        finalFeedback: "Você interpretou bem a tendência do gráfico. Procure sempre citar os valores usados.",
        recommendedPlan: ["Registrar valores antes de comparar"],
        questionCorrections: []
      },
      {
        studentId: "alu-diego",
        status: "validado",
        grade: 6.1,
        maxGrade: 10,
        correctedAt: "2026-06-03T10:35:00",
        decision: "aprovar",
        summary: "Precisa fortalecer leitura de escala.",
        finalFeedback: "Você percebeu o crescimento, mas precisa conferir a escala do eixo antes de calcular.",
        recommendedPlan: ["Atividade de escala em gráficos"],
        questionCorrections: []
      }
    ]
  },
  {
    id: "av-1a-funcao",
    title: "Função afim aplicada",
    subject: "Matemática",
    date: "2026-06-10",
    classId: "turma-1a",
    average: 7.3,
    correctionProgress: 100,
    pendingValidations: 1,
    corePattern: "Confusão entre coeficiente angular e taxa fixa em problemas contextualizados.",
    questions: [
      {
        id: "q-1a-1",
        number: 1,
        type: "discursiva",
        statement: "Explique o significado do coeficiente linear em uma tarifa de transporte.",
        correctAnswer: "Representa o valor inicial cobrado antes da variação por distância.",
        acceptanceCriteria: ["Relaciona coeficiente linear ao valor inicial", "Aplica ao contexto de tarifa"],
        expectedKeywords: ["valor inicial", "tarifa", "fixo"],
        skillIds: ["hab-proporcionalidade", "hab-grafico"],
        points: 10,
        weight: 1,
        rigor: "Adequado",
        rubric: [
          {
            id: "r-1a-1",
            label: "Contextualização",
            description: "Explica o coeficiente no contexto do problema.",
            points: 10
          }
        ]
      }
    ],
    results: [
      {
        studentId: "alu-elisa",
        status: "validado",
        grade: 8.7,
        maxGrade: 10,
        correctedAt: "2026-06-10T09:30:00",
        decision: "aprovar",
        summary: "Resposta clara e bem contextualizada.",
        finalFeedback: "Ótima explicação. Você conectou a fórmula à situação real.",
        recommendedPlan: ["Avançar para comparação de tarifas"],
        questionCorrections: []
      },
      {
        studentId: "alu-felipe",
        status: "corrigido",
        grade: 6.2,
        maxGrade: 10,
        correctedAt: "2026-06-10T09:37:00",
        decision: "ajustar",
        summary: "Troca valor fixo por taxa de variação.",
        finalFeedback: "Você explicou a taxa de crescimento, mas a questão pedia o valor inicial.",
        recommendedPlan: ["Mapa visual entre fórmula, gráfico e contexto"],
        questionCorrections: []
      },
      {
        studentId: "alu-giovana",
        status: "validado",
        grade: 7.9,
        maxGrade: 10,
        correctedAt: "2026-06-10T09:44:00",
        decision: "aprovar",
        summary: "Boa leitura contextual.",
        finalFeedback: "Sua resposta está correta. Inclua exemplos numéricos quando possível.",
        recommendedPlan: ["Resolver dois contextos com mesma função"],
        questionCorrections: []
      }
    ]
  },
  {
    id: "av-2c-citologia",
    title: "Diagnóstico de citologia",
    subject: "Biologia",
    date: "2026-06-06",
    classId: "turma-2c",
    average: 7.8,
    correctionProgress: 100,
    pendingValidations: 0,
    corePattern: "Erros concentrados na função do núcleo e na comparação entre células animal e vegetal.",
    questions: [
      {
        id: "q-2c-1",
        number: 1,
        type: "discursiva",
        statement: "Explique a relação entre núcleo, DNA e controle celular.",
        correctAnswer: "O núcleo abriga o DNA e coordena atividades celulares por meio da expressão genética.",
        acceptanceCriteria: ["Cita DNA", "Relaciona núcleo ao controle celular", "Evita confundir com citoplasma"],
        expectedKeywords: ["núcleo", "DNA", "controle"],
        skillIds: ["hab-citologia", "hab-argumentacao"],
        points: 10,
        weight: 1,
        rigor: "Adequado",
        rubric: [
          {
            id: "r-2c-1",
            label: "Precisão conceitual",
            description: "Relaciona estrutura e função sem confundir organelas.",
            points: 10
          }
        ]
      }
    ],
    results: [
      {
        studentId: "alu-iris",
        status: "validado",
        grade: 9.1,
        maxGrade: 10,
        correctedAt: "2026-06-06T14:02:00",
        decision: "aprovar",
        summary: "Excelente precisão conceitual.",
        finalFeedback: "Sua resposta conectou núcleo, DNA e controle celular com clareza.",
        recommendedPlan: ["Avançar para expressão gênica"],
        questionCorrections: []
      },
      {
        studentId: "alu-joao",
        status: "validado",
        grade: 6.6,
        maxGrade: 10,
        correctedAt: "2026-06-06T14:08:00",
        decision: "aprovar",
        summary: "Confunde funções de núcleo e citoplasma.",
        finalFeedback: "Você reconheceu o núcleo, mas misturou funções de outras organelas. Revise a tabela de funções.",
        recommendedPlan: ["Flashcards de organelas e funções"],
        questionCorrections: []
      },
      {
        studentId: "alu-larissa",
        status: "validado",
        grade: 8,
        maxGrade: 10,
        correctedAt: "2026-06-06T14:15:00",
        decision: "aprovar",
        summary: "Boa precisão, com oportunidade de aprofundar justificativas.",
        finalFeedback: "A resposta está correta. Acrescente exemplos para deixar a explicação mais forte.",
        recommendedPlan: ["Treinar respostas com termos científicos obrigatórios"],
        questionCorrections: []
      }
    ]
  }
];

export const pedagogicalAlerts: PedagogicalAlert[] = [
  {
    id: "alerta-fracao",
    title: "Padrão de erro recorrente",
    body: "A IA encontrou dificuldade em converter fração para decimal em 49% das respostas do 8º Ano B.",
    tone: "warning"
  },
  {
    id: "alerta-validacao",
    title: "Validação docente pendente",
    body: "Há 3 sugestões de correção aguardando decisão final do professor.",
    tone: "info"
  },
  {
    id: "alerta-feedback",
    title: "Feedbacks prontos para revisão",
    body: "12 devolutivas foram geradas com linguagem pedagógica e podem ser editadas antes do envio.",
    tone: "success"
  }
];

export const interventionPlans: InterventionPlan[] = [
  {
    id: "int-fracao-decimal",
    classId: "turma-8b",
    assessmentId: "av-8b-fracoes",
    title: "Retomada guiada: fração, decimal e porcentagem",
    priority: "Alta",
    dueDate: "2026-06-24",
    skillId: "hab-fracao-decimal",
    students: ["alu-bruno", "alu-diego", "alu-camila"],
    evidence: "Erros frequentes ao transformar 3/4 em decimal e ao interpretar 25% como valor absoluto.",
    steps: [
      "Usar régua de frações para comparar 1/2, 1/4, 1/5 e 3/4.",
      "Resolver exercícios progressivos com conversão fração -> decimal -> porcentagem.",
      "Fechar com problema contextualizado de desconto e validação em duplas."
    ]
  },
  {
    id: "int-grafico",
    classId: "turma-8b",
    assessmentId: "av-8b-graficos",
    title: "Oficina rápida: leitura de escala em gráficos",
    priority: "Média",
    dueDate: "2026-06-27",
    skillId: "hab-grafico",
    students: ["alu-bruno", "alu-diego"],
    evidence: "Respostas indicam leitura correta da tendência, mas cálculo impreciso da variação.",
    steps: [
      "Marcar valores do eixo antes de comparar barras.",
      "Calcular variação absoluta com apoio visual.",
      "Registrar uma frase de conclusão com os números usados."
    ]
  }
];

export const reportSnapshots: ReportSnapshot[] = [
  {
    id: "rep-1",
    title: "Correções concluídas",
    value: "86%",
    delta: "+18 p.p.",
    description: "Progresso em relação à semana anterior."
  },
  {
    id: "rep-2",
    title: "Tempo economizado",
    value: "6h40",
    delta: "estimado",
    description: "Com leitura por foto e pré-correção por rubrica."
  },
  {
    id: "rep-3",
    title: "Habilidade crítica",
    value: "EF07MA08",
    delta: "49% vulnerabilidade",
    description: "Converter fração em decimal aparece como principal foco."
  }
];
