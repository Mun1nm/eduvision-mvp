export type CorrectionStatus = "pendente" | "corrigido" | "validado";

export type DecisionStatus = "aprovar" | "ajustar" | "rejeitar";

export type QuestionType = "objetiva" | "discursiva" | "mista";

export type RigorLevel = "Essencial" | "Adequado" | "Avançado";

export type SkillArea =
  | "Linguagens"
  | "Matemática"
  | "Ciências Humanas"
  | "Ciências da Natureza";

export type Teacher = {
  name: string;
  role: string;
  school: string;
  initials: string;
};

export type StudentRisk = "baixo" | "médio" | "alto";

export type Student = {
  id: string;
  name: string;
  avatarColor: string;
  attendanceRate: number;
  risk: StudentRisk;
  note: string;
};

export type Skill = {
  id: string;
  code: string;
  name: string;
  area: SkillArea;
  mastery: number;
  vulnerability: number;
  trend: number;
};

export type RubricCriterion = {
  id: string;
  label: string;
  description: string;
  points: number;
};

export type Question = {
  id: string;
  number: number;
  type: QuestionType;
  statement: string;
  correctAnswer: string;
  acceptanceCriteria: string[];
  expectedKeywords: string[];
  skillIds: string[];
  points: number;
  weight: number;
  rigor: RigorLevel;
  rubric: RubricCriterion[];
};

export type QuestionCorrection = {
  questionId: string;
  answer: string;
  score: number;
  maxScore: number;
  isCorrect: boolean;
  confidence: number;
  aiFeedback: string;
  handwritingSignal: string;
  attentionPoint: string;
};

export type StudentAssessmentResult = {
  studentId: string;
  status: CorrectionStatus;
  grade: number;
  maxGrade: number;
  correctedAt?: string;
  decision: DecisionStatus;
  questionCorrections: QuestionCorrection[];
  summary: string;
  finalFeedback: string;
  recommendedPlan: string[];
};

export type Assessment = {
  id: string;
  title: string;
  subject: string;
  date: string;
  classId: string;
  average: number;
  correctionProgress: number;
  pendingValidations: number;
  corePattern: string;
  questions: Question[];
  results: StudentAssessmentResult[];
};

export type ClassGroup = {
  id: string;
  name: string;
  grade: string;
  subjectFocus: string;
  teacher: string;
  room: string;
  color: string;
  performanceTrend: number;
  criticalSkillIds: string[];
  students: Student[];
};

export type PedagogicalAlert = {
  id: string;
  title: string;
  body: string;
  tone: "info" | "warning" | "success";
};

export type InterventionPlan = {
  id: string;
  classId: string;
  assessmentId: string;
  title: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string;
  skillId: string;
  students: string[];
  evidence: string;
  steps: string[];
};

export type ReportSnapshot = {
  id: string;
  title: string;
  value: string;
  delta: string;
  description: string;
};
