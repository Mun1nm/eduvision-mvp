export type CorrectionStatus = "corrigido" | "pendente";

export type QuestionType = "objetiva" | "discursiva";

export type SkillArea = "Linguagens" | "Matemática" | "Ciências Humanas" | "Ciências da Natureza";

export type Student = {
  id: string;
  name: string;
  avatarColor: string;
  attendanceRate: number;
};

export type Skill = {
  id: string;
  name: string;
  area: SkillArea;
  mastery: number;
  vulnerability: number;
};

export type Question = {
  id: string;
  number: number;
  type: QuestionType;
  statement: string;
  correctAnswer: string;
  acceptanceCriteria: string[];
  skillIds: string[];
  points: number;
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
};

export type StudentAssessmentResult = {
  studentId: string;
  status: CorrectionStatus;
  grade: number;
  maxGrade: number;
  correctedAt?: string;
  questionCorrections: QuestionCorrection[];
  summary: string;
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
  students: Student[];
};
