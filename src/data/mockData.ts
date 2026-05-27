import { Assessment, ClassGroup, Skill } from "../types";

export const skills: Skill[] = [
  {
    id: "hab-texto-01",
    name: "Interpretação de Texto",
    area: "Linguagens",
    mastery: 78,
    vulnerability: 22
  },
  {
    id: "hab-argumentacao-02",
    name: "Argumentação Escrita",
    area: "Linguagens",
    mastery: 61,
    vulnerability: 39
  },
  {
    id: "hab-equacao-03",
    name: "Equações de 2º Grau",
    area: "Matemática",
    mastery: 54,
    vulnerability: 46
  },
  {
    id: "hab-funcao-04",
    name: "Funções Afins",
    area: "Matemática",
    mastery: 69,
    vulnerability: 31
  },
  {
    id: "hab-grafico-05",
    name: "Leitura de Gráficos",
    area: "Matemática",
    mastery: 73,
    vulnerability: 27
  },
  {
    id: "hab-historia-06",
    name: "Contextualização Histórica",
    area: "Ciências Humanas",
    mastery: 66,
    vulnerability: 34
  },
  {
    id: "hab-citologia-07",
    name: "Organização Celular",
    area: "Ciências da Natureza",
    mastery: 58,
    vulnerability: 42
  },
  {
    id: "hab-energia-08",
    name: "Transformações de Energia",
    area: "Ciências da Natureza",
    mastery: 71,
    vulnerability: 29
  }
];

export const classGroups: ClassGroup[] = [
  {
    id: "turma-9a",
    name: "9º Ano A",
    grade: "Ensino Fundamental II",
    subjectFocus: "Língua Portuguesa e Matemática",
    teacher: "Profa. Marina Lopes",
    room: "Sala 12",
    color: "#0F766E",
    students: [
      { id: "alu-ana", name: "Ana Clara Martins", avatarColor: "#14B8A6", attendanceRate: 96 },
      { id: "alu-bruno", name: "Bruno Henrique Costa", avatarColor: "#F59E0B", attendanceRate: 89 },
      { id: "alu-camila", name: "Camila Azevedo", avatarColor: "#6366F1", attendanceRate: 92 },
      { id: "alu-diego", name: "Diego Almeida", avatarColor: "#EF4444", attendanceRate: 84 }
    ]
  },
  {
    id: "turma-1b",
    name: "1ª Série B",
    grade: "Ensino Médio",
    subjectFocus: "Matemática",
    teacher: "Profa. Marina Lopes",
    room: "Laboratório 2",
    color: "#2563EB",
    students: [
      { id: "alu-elisa", name: "Elisa Ramos", avatarColor: "#06B6D4", attendanceRate: 97 },
      { id: "alu-felipe", name: "Felipe Nascimento", avatarColor: "#8B5CF6", attendanceRate: 91 },
      { id: "alu-giovana", name: "Giovana Prado", avatarColor: "#10B981", attendanceRate: 88 },
      { id: "alu-hugo", name: "Hugo Carvalho", avatarColor: "#F97316", attendanceRate: 82 }
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
    students: [
      { id: "alu-iris", name: "Íris Teixeira", avatarColor: "#EC4899", attendanceRate: 95 },
      { id: "alu-joao", name: "João Pedro Lima", avatarColor: "#22C55E", attendanceRate: 90 },
      { id: "alu-larissa", name: "Larissa Gomes", avatarColor: "#3B82F6", attendanceRate: 93 },
      { id: "alu-matheus", name: "Matheus Rocha", avatarColor: "#64748B", attendanceRate: 86 }
    ]
  }
];

export const assessments: Assessment[] = [
  {
    id: "av-9a-port-01",
    title: "Simulado Diagnóstico de Leitura",
    subject: "Língua Portuguesa",
    date: "2026-05-18",
    classId: "turma-9a",
    average: 7.4,
    correctionProgress: 100,
    questions: [
      {
        id: "q-9a-p1",
        number: 1,
        type: "objetiva",
        statement: "Identificar a tese central de uma crônica argumentativa.",
        correctAnswer: "C",
        acceptanceCriteria: ["Marcação única da alternativa C"],
        skillIds: ["hab-texto-01"],
        points: 1
      },
      {
        id: "q-9a-p2",
        number: 2,
        type: "objetiva",
        statement: "Reconhecer relação de causa e consequência no texto.",
        correctAnswer: "A",
        acceptanceCriteria: ["Marcação única da alternativa A"],
        skillIds: ["hab-texto-01"],
        points: 1
      },
      {
        id: "q-9a-p3",
        number: 3,
        type: "discursiva",
        statement: "Explique como o narrador constrói uma crítica social no último parágrafo.",
        correctAnswer: "A resposta deve articular ironia, escolha lexical e crítica ao consumo excessivo.",
        acceptanceCriteria: ["Cita o recurso de ironia", "Relaciona o recurso ao comportamento social criticado", "Usa evidência textual"],
        skillIds: ["hab-texto-01", "hab-argumentacao-02"],
        points: 4
      },
      {
        id: "q-9a-p4",
        number: 4,
        type: "discursiva",
        statement: "Produza um parágrafo defendendo uma intervenção possível para o problema apresentado.",
        correctAnswer: "A resposta deve apresentar proposta, agente, ação e justificativa coerente.",
        acceptanceCriteria: ["Apresenta proposta objetiva", "Define agente responsável", "Justifica a intervenção"],
        skillIds: ["hab-argumentacao-02"],
        points: 4
      }
    ],
    results: [
      {
        studentId: "alu-ana",
        status: "corrigido",
        grade: 8.6,
        maxGrade: 10,
        correctedAt: "2026-05-18T15:41:00",
        summary: "Excelente compreensão global, com pequenas lacunas na justificativa da proposta de intervenção.",
        recommendedPlan: ["Revisar conectivos argumentativos", "Praticar parágrafos com agente, ação e consequência"],
        questionCorrections: [
          { questionId: "q-9a-p1", answer: "C", score: 1, maxScore: 1, isCorrect: true, confidence: 99, aiFeedback: "Alternativa marcada com alta nitidez e alinhada ao gabarito.", handwritingSignal: "Marcação objetiva limpa" },
          { questionId: "q-9a-p2", answer: "A", score: 1, maxScore: 1, isCorrect: true, confidence: 98, aiFeedback: "Reconheceu corretamente a relação causal solicitada.", handwritingSignal: "Marcação sem rasuras" },
          { questionId: "q-9a-p3", answer: "O narrador usa ironia ao mostrar o consumo como algo normal, mas deixa claro que há exagero e crítica aos hábitos da sociedade.", score: 3.7, maxScore: 4, isCorrect: true, confidence: 93, aiFeedback: "Resposta interpreta adequadamente a ironia e conecta o recurso à crítica social. Poderia citar um trecho mais específico.", handwritingSignal: "Letra cursiva regular, baixa ambiguidade" },
          { questionId: "q-9a-p4", answer: "A escola pode organizar debates e campanhas para orientar as famílias sobre consumo consciente.", score: 2.9, maxScore: 4, isCorrect: true, confidence: 88, aiFeedback: "A proposta é coerente, mas faltou detalhar melhor a justificativa e o impacto esperado.", handwritingSignal: "Trechos inclinados, OCR exigiu validação semântica" }
        ]
      },
      {
        studentId: "alu-bruno",
        status: "corrigido",
        grade: 6.2,
        maxGrade: 10,
        correctedAt: "2026-05-18T15:44:00",
        summary: "Boa localização de informações, mas dificuldade em transformar interpretação em argumento escrito.",
        recommendedPlan: ["Retomar estrutura de tópico frasal", "Resolver questões discursivas com evidência textual"],
        questionCorrections: [
          { questionId: "q-9a-p1", answer: "C", score: 1, maxScore: 1, isCorrect: true, confidence: 98, aiFeedback: "Alternativa correta.", handwritingSignal: "Marcação objetiva limpa" },
          { questionId: "q-9a-p2", answer: "D", score: 0, maxScore: 1, isCorrect: false, confidence: 96, aiFeedback: "A alternativa marcada não expressa a relação causal dominante do trecho.", handwritingSignal: "Marcação com leve sombra apagada" },
          { questionId: "q-9a-p3", answer: "Ele fala que as pessoas compram muito e isso é ruim.", score: 2.2, maxScore: 4, isCorrect: true, confidence: 87, aiFeedback: "A resposta capta a crítica, mas não explica o recurso usado pelo narrador nem apresenta evidência textual.", handwritingSignal: "Letra legível, espaçamento irregular" },
          { questionId: "q-9a-p4", answer: "Fazer campanha para as pessoas pararem de comprar sem pensar.", score: 3, maxScore: 4, isCorrect: true, confidence: 90, aiFeedback: "Proposta pertinente, com ação clara. Faltou explicitar agente e justificativa pedagógica.", handwritingSignal: "OCR reconheceu 94% dos termos sem correção manual" }
        ]
      },
      {
        studentId: "alu-camila",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        summary: "Correção ainda não concluída.",
        recommendedPlan: [],
        questionCorrections: []
      },
      {
        studentId: "alu-diego",
        status: "corrigido",
        grade: 7.1,
        maxGrade: 10,
        correctedAt: "2026-05-18T15:49:00",
        summary: "Desempenho consistente em leitura, com necessidade de ampliar repertório argumentativo.",
        recommendedPlan: ["Comparar respostas-modelo", "Reescrever justificativas com critérios explícitos"],
        questionCorrections: [
          { questionId: "q-9a-p1", answer: "B", score: 0, maxScore: 1, isCorrect: false, confidence: 97, aiFeedback: "A alternativa escolhida aborda detalhe secundário, não a tese central.", handwritingSignal: "Marcação escura e inequívoca" },
          { questionId: "q-9a-p2", answer: "A", score: 1, maxScore: 1, isCorrect: true, confidence: 99, aiFeedback: "Alternativa correta.", handwritingSignal: "Marcação sem rasuras" },
          { questionId: "q-9a-p3", answer: "A crítica aparece quando ele exagera a forma como todos compram, usando um tom de brincadeira para mostrar um problema sério.", score: 3.5, maxScore: 4, isCorrect: true, confidence: 91, aiFeedback: "Boa leitura do tom irônico. Faltou usar evidência textual direta.", handwritingSignal: "Letra mista com boa segmentação" },
          { questionId: "q-9a-p4", answer: "O governo e a escola devem fazer palestras para ensinar consumo consciente, pois isso ajuda os jovens a decidirem melhor.", score: 2.6, maxScore: 4, isCorrect: true, confidence: 86, aiFeedback: "Identifica agente e ação, mas a intervenção ainda é genérica e pouco detalhada.", handwritingSignal: "Duas palavras exigiram inferência contextual" }
        ]
      }
    ]
  },
  {
    id: "av-9a-mat-02",
    title: "Lista Avaliativa de Equações",
    subject: "Matemática",
    date: "2026-05-22",
    classId: "turma-9a",
    average: 6.8,
    correctionProgress: 75,
    questions: [
      {
        id: "q-9a-m1",
        number: 1,
        type: "objetiva",
        statement: "Resolver x² - 5x + 6 = 0.",
        correctAnswer: "B",
        acceptanceCriteria: ["Alternativa B: x = 2 e x = 3"],
        skillIds: ["hab-equacao-03"],
        points: 2
      },
      {
        id: "q-9a-m2",
        number: 2,
        type: "discursiva",
        statement: "Mostre o processo de fatoração para x² + 7x + 10 = 0.",
        correctAnswer: "Fatorar em (x + 5)(x + 2) e concluir x = -5 ou x = -2.",
        acceptanceCriteria: ["Identifica fatores corretos", "Aplica produto nulo", "Apresenta as duas raízes"],
        skillIds: ["hab-equacao-03"],
        points: 4
      },
      {
        id: "q-9a-m3",
        number: 3,
        type: "discursiva",
        statement: "Interprete o ponto onde a parábola toca o eixo x no gráfico apresentado.",
        correctAnswer: "O ponto representa uma raiz real da função quadrática.",
        acceptanceCriteria: ["Relaciona interseção com raiz", "Usa vocabulário matemático adequado"],
        skillIds: ["hab-equacao-03", "hab-grafico-05"],
        points: 4
      }
    ],
    results: [
      {
        studentId: "alu-ana",
        status: "corrigido",
        grade: 7.8,
        maxGrade: 10,
        correctedAt: "2026-05-22T10:12:00",
        summary: "Domina fatoração, mas precisa fortalecer leitura gráfica em funções quadráticas.",
        recommendedPlan: ["Resolver exercícios com interseções no plano cartesiano", "Associar raízes aos zeros da função"],
        questionCorrections: [
          { questionId: "q-9a-m1", answer: "B", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Resposta objetiva correta.", handwritingSignal: "Marcação sem ruído" },
          { questionId: "q-9a-m2", answer: "(x + 5)(x + 2), então x = -5 e x = -2", score: 3.8, maxScore: 4, isCorrect: true, confidence: 95, aiFeedback: "Procedimento correto, com leve perda por não explicitar o produto nulo.", handwritingSignal: "Símbolos matemáticos claros" },
          { questionId: "q-9a-m3", answer: "É quando a parábola cruza a linha de baixo.", score: 2, maxScore: 4, isCorrect: true, confidence: 84, aiFeedback: "A ideia visual aparece, mas faltou nomear eixo x e raiz da função.", handwritingSignal: "Termos curtos com baixa ambiguidade" }
        ]
      },
      {
        studentId: "alu-bruno",
        status: "corrigido",
        grade: 5.4,
        maxGrade: 10,
        correctedAt: "2026-05-22T10:17:00",
        summary: "Dificuldade na aplicação do produto nulo e na interpretação geométrica das raízes.",
        recommendedPlan: ["Refazer fatorações guiadas", "Usar gráfico para localizar zeros da função"],
        questionCorrections: [
          { questionId: "q-9a-m1", answer: "A", score: 0, maxScore: 2, isCorrect: false, confidence: 97, aiFeedback: "Alternativa incompatível com as raízes da equação.", handwritingSignal: "Marcação nítida" },
          { questionId: "q-9a-m2", answer: "x + 5 e x + 2", score: 2.6, maxScore: 4, isCorrect: true, confidence: 88, aiFeedback: "Identifica fatores, mas não conclui as raízes nem registra o produto nulo.", handwritingSignal: "OCR detectou omissão de sinal de igualdade" },
          { questionId: "q-9a-m3", answer: "Mostra onde a conta acaba.", score: 2.8, maxScore: 4, isCorrect: true, confidence: 79, aiFeedback: "Há tentativa de interpretação, porém o vocabulário matemático é insuficiente.", handwritingSignal: "Escrita comprimida, inferência com confiança moderada" }
        ]
      },
      {
        studentId: "alu-camila",
        status: "corrigido",
        grade: 8.1,
        maxGrade: 10,
        correctedAt: "2026-05-22T10:23:00",
        summary: "Boa evolução no uso de fatores e vocabulário gráfico.",
        recommendedPlan: ["Praticar justificativas completas", "Comparar raízes em tabelas e gráficos"],
        questionCorrections: [
          { questionId: "q-9a-m1", answer: "B", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Resposta objetiva correta.", handwritingSignal: "Marcação limpa" },
          { questionId: "q-9a-m2", answer: "(x + 5)(x + 2) = 0, logo x = -5 ou x = -2", score: 4, maxScore: 4, isCorrect: true, confidence: 96, aiFeedback: "Processo completo e matematicamente preciso.", handwritingSignal: "Símbolos consistentes" },
          { questionId: "q-9a-m3", answer: "É a raiz, onde y vale zero.", score: 2.1, maxScore: 4, isCorrect: true, confidence: 87, aiFeedback: "Resposta correta, mas curta. Poderia mencionar a interseção com o eixo x.", handwritingSignal: "Letra regular" }
        ]
      },
      {
        studentId: "alu-diego",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        summary: "Correção ainda não concluída.",
        recommendedPlan: [],
        questionCorrections: []
      }
    ]
  },
  {
    id: "av-1b-mat-01",
    title: "Avaliação de Função Afim",
    subject: "Matemática",
    date: "2026-05-16",
    classId: "turma-1b",
    average: 7.1,
    correctionProgress: 100,
    questions: [
      {
        id: "q-1b-f1",
        number: 1,
        type: "objetiva",
        statement: "Identificar o coeficiente angular de f(x) = 3x - 2.",
        correctAnswer: "D",
        acceptanceCriteria: ["Alternativa D: 3"],
        skillIds: ["hab-funcao-04"],
        points: 2
      },
      {
        id: "q-1b-f2",
        number: 2,
        type: "discursiva",
        statement: "Explique o significado do coeficiente linear em uma situação de tarifa fixa.",
        correctAnswer: "Representa o valor inicial cobrado independentemente do consumo.",
        acceptanceCriteria: ["Relaciona coeficiente linear ao valor inicial", "Aplica ao contexto de tarifa fixa", "Usa linguagem clara"],
        skillIds: ["hab-funcao-04", "hab-grafico-05"],
        points: 4
      },
      {
        id: "q-1b-f3",
        number: 3,
        type: "discursiva",
        statement: "A partir de uma tabela, descreva se a função é crescente ou decrescente.",
        correctAnswer: "É crescente quando os valores de y aumentam conforme x aumenta.",
        acceptanceCriteria: ["Compara variações de x e y", "Classifica corretamente", "Justifica a classificação"],
        skillIds: ["hab-funcao-04", "hab-grafico-05"],
        points: 4
      }
    ],
    results: [
      {
        studentId: "alu-elisa",
        status: "corrigido",
        grade: 8.4,
        maxGrade: 10,
        correctedAt: "2026-05-16T09:30:00",
        summary: "Mostra domínio conceitual e boa transposição para situações-problema.",
        recommendedPlan: ["Avançar para análise de gráficos comparativos", "Resolver problemas com duas tarifas"],
        questionCorrections: [
          { questionId: "q-1b-f1", answer: "D", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Alternativa correta.", handwritingSignal: "Marcação inequívoca" },
          { questionId: "q-1b-f2", answer: "É o valor que já começa sendo cobrado antes de usar o serviço.", score: 3.4, maxScore: 4, isCorrect: true, confidence: 92, aiFeedback: "Explicação adequada ao contexto de tarifa fixa. Poderia nomear explicitamente o coeficiente linear.", handwritingSignal: "Letra clara" },
          { questionId: "q-1b-f3", answer: "É crescente porque quando x aumenta, o y também aumenta na tabela.", score: 3, maxScore: 4, isCorrect: true, confidence: 94, aiFeedback: "Classificação e justificativa corretas, com pequena perda por falta de referência numérica.", handwritingSignal: "OCR sem inconsistências" }
        ]
      },
      {
        studentId: "alu-felipe",
        status: "corrigido",
        grade: 6.7,
        maxGrade: 10,
        correctedAt: "2026-05-16T09:36:00",
        summary: "Reconhece elementos da função, mas confunde coeficiente linear com angular em contextos verbais.",
        recommendedPlan: ["Criar mapa visual entre fórmula e gráfico", "Treinar interpretação de enunciados com tarifa"],
        questionCorrections: [
          { questionId: "q-1b-f1", answer: "D", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Alternativa correta.", handwritingSignal: "Marcação sem rasuras" },
          { questionId: "q-1b-f2", answer: "É quanto aumenta a cada unidade.", score: 1.8, maxScore: 4, isCorrect: false, confidence: 88, aiFeedback: "A resposta descreve o coeficiente angular, não o valor inicial fixo.", handwritingSignal: "Letra legível" },
          { questionId: "q-1b-f3", answer: "Crescente, porque os números sobem.", score: 2.9, maxScore: 4, isCorrect: true, confidence: 91, aiFeedback: "A conclusão está correta, mas a justificativa precisa explicitar x e y.", handwritingSignal: "Texto curto, alta confiança" }
        ]
      },
      {
        studentId: "alu-giovana",
        status: "corrigido",
        grade: 7.5,
        maxGrade: 10,
        correctedAt: "2026-05-16T09:42:00",
        summary: "Bom desempenho geral, especialmente na leitura da tabela.",
        recommendedPlan: ["Reforçar vocabulário de coeficientes", "Resolver problemas contextualizados"],
        questionCorrections: [
          { questionId: "q-1b-f1", answer: "C", score: 0, maxScore: 2, isCorrect: false, confidence: 98, aiFeedback: "A alternativa selecionada corresponde ao termo independente, não ao coeficiente angular.", handwritingSignal: "Marcação clara" },
          { questionId: "q-1b-f2", answer: "É a taxa que aparece mesmo sem consumo, como uma cobrança inicial.", score: 3.7, maxScore: 4, isCorrect: true, confidence: 93, aiFeedback: "Resposta bem contextualizada, com linguagem precisa.", handwritingSignal: "Baixa ambiguidade" },
          { questionId: "q-1b-f3", answer: "Crescente, pois a cada aumento de x os valores de y aumentam 2.", score: 3.8, maxScore: 4, isCorrect: true, confidence: 95, aiFeedback: "Excelente justificativa com referência à variação observada.", handwritingSignal: "Números reconhecidos com precisão" }
        ]
      },
      {
        studentId: "alu-hugo",
        status: "corrigido",
        grade: 5.8,
        maxGrade: 10,
        correctedAt: "2026-05-16T09:48:00",
        summary: "Necessita consolidar a distinção entre valor inicial e taxa de variação.",
        recommendedPlan: ["Montar tabelas a partir de fórmulas", "Colorir coeficiente angular e linear em exemplos"],
        questionCorrections: [
          { questionId: "q-1b-f1", answer: "B", score: 0, maxScore: 2, isCorrect: false, confidence: 97, aiFeedback: "Alternativa incorreta para o coeficiente angular.", handwritingSignal: "Marcação objetiva limpa" },
          { questionId: "q-1b-f2", answer: "É o preço fixo que paga antes do resto.", score: 3.2, maxScore: 4, isCorrect: true, confidence: 90, aiFeedback: "Conceito correto, ainda com formulação informal.", handwritingSignal: "Escrita inclinada, leitura estável" },
          { questionId: "q-1b-f3", answer: "Crescente.", score: 2.6, maxScore: 4, isCorrect: true, confidence: 86, aiFeedback: "Classificação correta, mas sem justificativa completa.", handwritingSignal: "Resposta curta" }
        ]
      }
    ]
  },
  {
    id: "av-1b-mat-02",
    title: "Mini Simulado de Gráficos",
    subject: "Matemática",
    date: "2026-05-24",
    classId: "turma-1b",
    average: 6.5,
    correctionProgress: 50,
    questions: [
      {
        id: "q-1b-g1",
        number: 1,
        type: "objetiva",
        statement: "Escolher o gráfico que representa uma função crescente.",
        correctAnswer: "A",
        acceptanceCriteria: ["Alternativa A"],
        skillIds: ["hab-grafico-05", "hab-funcao-04"],
        points: 2
      },
      {
        id: "q-1b-g2",
        number: 2,
        type: "discursiva",
        statement: "Descreva o que acontece com y quando x aumenta no gráfico 2.",
        correctAnswer: "y diminui, indicando função decrescente.",
        acceptanceCriteria: ["Compara x e y", "Reconhece decrescimento", "Usa evidência visual"],
        skillIds: ["hab-grafico-05"],
        points: 4
      },
      {
        id: "q-1b-g3",
        number: 3,
        type: "discursiva",
        statement: "Explique como estimar o valor de y para x = 5 usando interpolação visual.",
        correctAnswer: "Observar os pontos próximos e estimar a posição intermediária no eixo y.",
        acceptanceCriteria: ["Localiza x = 5", "Usa pontos vizinhos", "Estima y de modo coerente"],
        skillIds: ["hab-grafico-05"],
        points: 4
      }
    ],
    results: [
      {
        studentId: "alu-elisa",
        status: "corrigido",
        grade: 7.9,
        maxGrade: 10,
        correctedAt: "2026-05-24T11:05:00",
        summary: "Boa leitura visual e justificativas objetivas.",
        recommendedPlan: ["Praticar estimativas em gráficos sem malha completa"],
        questionCorrections: [
          { questionId: "q-1b-g1", answer: "A", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Resposta correta.", handwritingSignal: "Marcação limpa" },
          { questionId: "q-1b-g2", answer: "O y vai diminuindo quando x aumenta.", score: 3.5, maxScore: 4, isCorrect: true, confidence: 94, aiFeedback: "Interpretação correta. Poderia nomear função decrescente.", handwritingSignal: "Letra regular" },
          { questionId: "q-1b-g3", answer: "Olho o x 5 e vejo entre os pontos perto dele.", score: 2.4, maxScore: 4, isCorrect: true, confidence: 88, aiFeedback: "Procedimento inicial correto, mas faltou concluir a estimativa de y.", handwritingSignal: "Resposta curta com boa legibilidade" }
        ]
      },
      {
        studentId: "alu-felipe",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        summary: "Correção ainda não concluída.",
        recommendedPlan: [],
        questionCorrections: []
      },
      {
        studentId: "alu-giovana",
        status: "corrigido",
        grade: 6.9,
        maxGrade: 10,
        correctedAt: "2026-05-24T11:09:00",
        summary: "Identifica tendência, mas precisa detalhar estimativas numéricas.",
        recommendedPlan: ["Usar régua visual no eixo y", "Comparar pontos vizinhos antes de responder"],
        questionCorrections: [
          { questionId: "q-1b-g1", answer: "A", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Resposta correta.", handwritingSignal: "Marcação inequívoca" },
          { questionId: "q-1b-g2", answer: "Fica menor, então é decrescente.", score: 3.2, maxScore: 4, isCorrect: true, confidence: 93, aiFeedback: "Resposta correta e concisa. Faltou citar a relação com x aumentando.", handwritingSignal: "Sem rasuras" },
          { questionId: "q-1b-g3", answer: "Acho o ponto no meio.", score: 1.7, maxScore: 4, isCorrect: false, confidence: 82, aiFeedback: "A resposta é vaga. Precisa indicar x = 5, pontos vizinhos e estimativa de y.", handwritingSignal: "Baixa densidade de informação" }
        ]
      },
      {
        studentId: "alu-hugo",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        summary: "Correção ainda não concluída.",
        recommendedPlan: [],
        questionCorrections: []
      }
    ]
  },
  {
    id: "av-2c-bio-01",
    title: "Diagnóstico de Citologia",
    subject: "Biologia",
    date: "2026-05-14",
    classId: "turma-2c",
    average: 7.8,
    correctionProgress: 100,
    questions: [
      {
        id: "q-2c-c1",
        number: 1,
        type: "objetiva",
        statement: "Identificar a organela responsável pela respiração celular.",
        correctAnswer: "B",
        acceptanceCriteria: ["Alternativa B: mitocôndria"],
        skillIds: ["hab-citologia-07"],
        points: 2
      },
      {
        id: "q-2c-c2",
        number: 2,
        type: "discursiva",
        statement: "Explique a relação entre núcleo e material genético.",
        correctAnswer: "O núcleo abriga o DNA e coordena atividades celulares por meio da expressão genética.",
        acceptanceCriteria: ["Cita DNA", "Relaciona núcleo ao controle celular", "Evita confundir com citoplasma"],
        skillIds: ["hab-citologia-07"],
        points: 4
      },
      {
        id: "q-2c-c3",
        number: 3,
        type: "discursiva",
        statement: "Compare célula animal e vegetal com dois critérios.",
        correctAnswer: "Vegetal possui parede celular e cloroplastos; animal não possui essas estruturas.",
        acceptanceCriteria: ["Aponta parede celular", "Aponta cloroplastos", "Compara em vez de apenas listar"],
        skillIds: ["hab-citologia-07"],
        points: 4
      }
    ],
    results: [
      {
        studentId: "alu-iris",
        status: "corrigido",
        grade: 9.1,
        maxGrade: 10,
        correctedAt: "2026-05-14T14:02:00",
        summary: "Excelente domínio conceitual com comparação clara entre estruturas celulares.",
        recommendedPlan: ["Avançar para metabolismo celular", "Produzir mapa mental de organelas"],
        questionCorrections: [
          { questionId: "q-2c-c1", answer: "B", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Alternativa correta.", handwritingSignal: "Marcação limpa" },
          { questionId: "q-2c-c2", answer: "O núcleo guarda o DNA e ajuda a controlar as atividades da célula.", score: 3.7, maxScore: 4, isCorrect: true, confidence: 95, aiFeedback: "Resposta precisa e alinhada aos critérios.", handwritingSignal: "Texto bem segmentado" },
          { questionId: "q-2c-c3", answer: "A vegetal tem parede celular e cloroplastos, e a animal não tem essas estruturas.", score: 3.4, maxScore: 4, isCorrect: true, confidence: 94, aiFeedback: "Comparação correta, com pequena perda por não ampliar os critérios.", handwritingSignal: "OCR estável" }
        ]
      },
      {
        studentId: "alu-joao",
        status: "corrigido",
        grade: 6.6,
        maxGrade: 10,
        correctedAt: "2026-05-14T14:08:00",
        summary: "Reconhece organelas, mas confunde funções de núcleo e citoplasma.",
        recommendedPlan: ["Revisar tabela de organelas e funções", "Fazer flashcards com núcleo, mitocôndria e ribossomos"],
        questionCorrections: [
          { questionId: "q-2c-c1", answer: "B", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Alternativa correta.", handwritingSignal: "Marcação inequívoca" },
          { questionId: "q-2c-c2", answer: "O núcleo fica no citoplasma e passa energia para a célula.", score: 1.3, maxScore: 4, isCorrect: false, confidence: 86, aiFeedback: "Há confusão com funções energéticas. É necessário relacionar núcleo ao DNA e controle celular.", handwritingSignal: "Duas palavras exigiram inferência" },
          { questionId: "q-2c-c3", answer: "A vegetal tem cloroplasto e parede, a animal tem membrana.", score: 3.3, maxScore: 4, isCorrect: true, confidence: 91, aiFeedback: "Comparação majoritariamente correta, embora a membrana também exista na célula vegetal.", handwritingSignal: "Legibilidade adequada" }
        ]
      },
      {
        studentId: "alu-larissa",
        status: "corrigido",
        grade: 8,
        maxGrade: 10,
        correctedAt: "2026-05-14T14:15:00",
        summary: "Boa precisão em estruturas celulares e evolução na linguagem científica.",
        recommendedPlan: ["Aprofundar organelas membranosas", "Responder discursivas com exemplos"],
        questionCorrections: [
          { questionId: "q-2c-c1", answer: "B", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Alternativa correta.", handwritingSignal: "Marcação limpa" },
          { questionId: "q-2c-c2", answer: "O núcleo tem DNA, que contém informações para funcionamento da célula.", score: 3.4, maxScore: 4, isCorrect: true, confidence: 93, aiFeedback: "Conceito correto. Poderia explicitar controle das atividades celulares.", handwritingSignal: "Letra clara" },
          { questionId: "q-2c-c3", answer: "Vegetal tem parede celular e cloroplasto; animal não, mas tem outras organelas.", score: 2.6, maxScore: 4, isCorrect: true, confidence: 89, aiFeedback: "Critérios principais corretos, mas a comparação ficou incompleta no segundo ponto.", handwritingSignal: "Pequena sobreposição de linhas" }
        ]
      },
      {
        studentId: "alu-matheus",
        status: "corrigido",
        grade: 7.4,
        maxGrade: 10,
        correctedAt: "2026-05-14T14:21:00",
        summary: "Conhecimento funcional satisfatório, com necessidade de maior precisão vocabular.",
        recommendedPlan: ["Usar glossário de organelas", "Treinar respostas com termos científicos obrigatórios"],
        questionCorrections: [
          { questionId: "q-2c-c1", answer: "D", score: 0, maxScore: 2, isCorrect: false, confidence: 98, aiFeedback: "Alternativa incorreta para respiração celular.", handwritingSignal: "Marcação clara" },
          { questionId: "q-2c-c2", answer: "É onde fica o DNA, que manda informações para a célula.", score: 3.2, maxScore: 4, isCorrect: true, confidence: 92, aiFeedback: "Resposta adequada, mas pode melhorar a precisão sobre controle celular.", handwritingSignal: "Letra regular" },
          { questionId: "q-2c-c3", answer: "A planta tem parede celular e cloroplasto para fotossíntese, animal não.", score: 4, maxScore: 4, isCorrect: true, confidence: 95, aiFeedback: "Comparação completa e com função associada.", handwritingSignal: "OCR sem correções" }
        ]
      }
    ]
  },
  {
    id: "av-2c-fis-02",
    title: "Atividade de Energia",
    subject: "Física",
    date: "2026-05-25",
    classId: "turma-2c",
    average: 6.9,
    correctionProgress: 25,
    questions: [
      {
        id: "q-2c-e1",
        number: 1,
        type: "objetiva",
        statement: "Reconhecer transformação de energia em uma usina hidrelétrica.",
        correctAnswer: "C",
        acceptanceCriteria: ["Alternativa C: potencial gravitacional em elétrica"],
        skillIds: ["hab-energia-08"],
        points: 2
      },
      {
        id: "q-2c-e2",
        number: 2,
        type: "discursiva",
        statement: "Explique por que parte da energia se dissipa em sistemas reais.",
        correctAnswer: "Atrito, resistência e calor dissipam parte da energia, reduzindo a eficiência.",
        acceptanceCriteria: ["Cita dissipação", "Aponta atrito, resistência ou calor", "Relaciona à eficiência"],
        skillIds: ["hab-energia-08"],
        points: 4
      },
      {
        id: "q-2c-e3",
        number: 3,
        type: "discursiva",
        statement: "Analise um exemplo cotidiano de conversão de energia.",
        correctAnswer: "Deve identificar energia inicial, energia final e contexto cotidiano.",
        acceptanceCriteria: ["Identifica energia inicial", "Identifica energia final", "Contextualiza o exemplo"],
        skillIds: ["hab-energia-08"],
        points: 4
      }
    ],
    results: [
      {
        studentId: "alu-iris",
        status: "corrigido",
        grade: 7.6,
        maxGrade: 10,
        correctedAt: "2026-05-25T16:10:00",
        summary: "Boa compreensão de conversões, com resposta discursiva ainda pouco detalhada sobre dissipação.",
        recommendedPlan: ["Resolver problemas com eficiência", "Listar perdas de energia em exemplos reais"],
        questionCorrections: [
          { questionId: "q-2c-e1", answer: "C", score: 2, maxScore: 2, isCorrect: true, confidence: 99, aiFeedback: "Resposta objetiva correta.", handwritingSignal: "Marcação limpa" },
          { questionId: "q-2c-e2", answer: "Porque sempre perde um pouco em calor.", score: 2.5, maxScore: 4, isCorrect: true, confidence: 89, aiFeedback: "A ideia de dissipação aparece, mas faltou relacionar com atrito, resistência e eficiência.", handwritingSignal: "Resposta curta, alta confiança" },
          { questionId: "q-2c-e3", answer: "No ventilador a energia elétrica vira movimento.", score: 3.1, maxScore: 4, isCorrect: true, confidence: 92, aiFeedback: "Exemplo correto. Poderia mencionar energia cinética e contexto de uso.", handwritingSignal: "Letra clara" }
        ]
      },
      {
        studentId: "alu-joao",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        summary: "Correção ainda não concluída.",
        recommendedPlan: [],
        questionCorrections: []
      },
      {
        studentId: "alu-larissa",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        summary: "Correção ainda não concluída.",
        recommendedPlan: [],
        questionCorrections: []
      },
      {
        studentId: "alu-matheus",
        status: "pendente",
        grade: 0,
        maxGrade: 10,
        summary: "Correção ainda não concluída.",
        recommendedPlan: [],
        questionCorrections: []
      }
    ]
  }
];
