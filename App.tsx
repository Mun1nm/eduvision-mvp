import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import {
  assessments,
  classGroups,
  interventionPlans,
  pedagogicalAlerts,
  reportSnapshots,
  skills,
  teacher
} from "./src/data/mockData";
import {
  Badge,
  BottomSheet,
  Card,
  EmptyState,
  InfoRow,
  LoadingState,
  PrimaryButton,
  ProgressStepper,
  SecondaryButton,
  Section,
  StatCard
} from "./src/components/ui";
import { Theme, ThemeProvider, useTheme } from "./src/theme";
import { Assessment, ClassGroup, DecisionStatus, Skill, StudentAssessmentResult } from "./src/types";

type Route =
  | "home"
  | "classes"
  | "classDetail"
  | "assessments"
  | "correction"
  | "insights"
  | "intervention"
  | "reports"
  | "profile";

type Tab = "home" | "classes" | "assessments" | "insights" | "profile";

type BottomTab = {
  id: Tab;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  routes: Route[];
};

const bottomTabs: BottomTab[] = [
  { id: "home", label: "Home", icon: "home-outline", routes: ["home"] },
  { id: "classes", label: "Turmas", icon: "people-outline", routes: ["classes", "classDetail"] },
  { id: "assessments", label: "Avaliações", icon: "document-text-outline", routes: ["assessments", "correction"] },
  { id: "insights", label: "Insights", icon: "sparkles-outline", routes: ["insights", "intervention", "reports"] },
  { id: "profile", label: "Perfil", icon: "person-circle-outline", routes: ["profile"] }
];

const correctionSteps = [
  "Turma",
  "Avaliação",
  "Captura",
  "IA",
  "Revisão",
  "Confirmar",
  "Feedback",
  "Diagnóstico",
  "Intervenção"
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(value));

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const getClassAssessments = (classId: string) => assessments.filter((assessment) => assessment.classId === classId);

const getClassAverage = (classId: string) => {
  const classAssessments = getClassAssessments(classId);
  const total = classAssessments.reduce((sum, assessment) => sum + assessment.average, 0);
  return total / Math.max(classAssessments.length, 1);
};

const getSkill = (skillId: string) => skills.find((skill) => skill.id === skillId);

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const getPrimaryResult = (assessment: Assessment, selectedStudentId: string) =>
  assessment.results.find((result) => result.studentId === selectedStudentId && result.questionCorrections.length > 0) ??
  assessment.results.find((result) => result.decision === "ajustar" && result.questionCorrections.length > 0) ??
  assessment.results.find((result) => result.questionCorrections.length > 0) ??
  assessment.results[0];

const getConfidence = (result: StudentAssessmentResult) => {
  if (result.questionCorrections.length === 0) {
    return 86;
  }

  const total = result.questionCorrections.reduce((sum, correction) => sum + correction.confidence, 0);
  return Math.round(total / result.questionCorrections.length);
};

export default function App() {
  return (
    <ThemeProvider>
      <EduVisionApp />
    </ThemeProvider>
  );
}

function EduVisionApp() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [route, setRoute] = useState<Route>("home");
  const [selectedClassId, setSelectedClassId] = useState(classGroups[0].id);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(assessments[0].id);
  const [selectedStudentId, setSelectedStudentId] = useState("alu-bruno");
  const [wizardStep, setWizardStep] = useState(0);
  const [openSheet, setOpenSheet] = useState<"evidence" | "students" | null>(null);

  const selectedClass = useMemo(
    () => classGroups.find((classGroup) => classGroup.id === selectedClassId) ?? classGroups[0],
    [selectedClassId]
  );

  const assessmentsForClass = useMemo(() => getClassAssessments(selectedClass.id), [selectedClass.id]);

  const selectedAssessment = useMemo(() => {
    const assessment = assessments.find((item) => item.id === selectedAssessmentId);
    return assessment?.classId === selectedClass.id ? assessment : assessmentsForClass[0] ?? assessments[0];
  }, [assessmentsForClass, selectedAssessmentId, selectedClass.id]);

  const selectedResult = useMemo(
    () => getPrimaryResult(selectedAssessment, selectedStudentId),
    [selectedAssessment, selectedStudentId]
  );

  useEffect(() => {
    const isAssessmentInClass = assessmentsForClass.some((assessment) => assessment.id === selectedAssessmentId);
    if (!isAssessmentInClass && assessmentsForClass[0]) {
      setSelectedAssessmentId(assessmentsForClass[0].id);
      setSelectedStudentId(assessmentsForClass[0].results[0].studentId);
    }
  }, [assessmentsForClass, selectedAssessmentId]);

  useEffect(() => {
    if (route !== "correction" || wizardStep !== 3) {
      return undefined;
    }

    const timer = setTimeout(() => setWizardStep(4), 1900);
    return () => clearTimeout(timer);
  }, [route, wizardStep]);

  const navigate = (nextRoute: Route) => setRoute(nextRoute);

  const chooseClass = (classId: string, nextRoute: Route = "classDetail") => {
    const nextAssessment = assessments.find((assessment) => assessment.classId === classId) ?? assessments[0];
    setSelectedClassId(classId);
    setSelectedAssessmentId(nextAssessment.id);
    setSelectedStudentId(nextAssessment.results[0].studentId);
    navigate(nextRoute);
  };

  const chooseAssessment = (assessment: Assessment, nextRoute: Route = "correction") => {
    const result = getPrimaryResult(assessment, selectedStudentId);
    setSelectedAssessmentId(assessment.id);
    setSelectedStudentId(result.studentId);
    setWizardStep(0);
    navigate(nextRoute);
  };

  const renderRoute = () => {
    switch (route) {
      case "home":
        return (
          <HomeScreen
            selectedClass={selectedClass}
            selectedAssessment={selectedAssessment}
            onNavigate={navigate}
            onOpenEvidence={() => setOpenSheet("evidence")}
          />
        );
      case "classes":
        return <ClassesScreen selectedClass={selectedClass} onChooseClass={chooseClass} />;
      case "classDetail":
        return (
          <ClassDetailScreen
            selectedClass={selectedClass}
            assessmentsForClass={assessmentsForClass}
            onNavigate={navigate}
            onChooseAssessment={chooseAssessment}
            onOpenStudents={() => setOpenSheet("students")}
          />
        );
      case "assessments":
        return (
          <AssessmentsScreen
            selectedClass={selectedClass}
            selectedAssessment={selectedAssessment}
            onChooseClass={chooseClass}
            onChooseAssessment={chooseAssessment}
          />
        );
      case "correction":
        return (
          <CorrectionWizard
            selectedClass={selectedClass}
            selectedAssessment={selectedAssessment}
            selectedResult={selectedResult}
            step={wizardStep}
            setStep={setWizardStep}
            onChooseClass={chooseClass}
            onChooseAssessment={(assessment) => {
              setSelectedAssessmentId(assessment.id);
              setSelectedStudentId(getPrimaryResult(assessment, selectedStudentId).studentId);
            }}
            onFinish={() => navigate("insights")}
          />
        );
      case "insights":
        return (
          <InsightsScreen
            selectedClass={selectedClass}
            selectedAssessment={selectedAssessment}
            onNavigate={navigate}
            onOpenEvidence={() => setOpenSheet("evidence")}
          />
        );
      case "intervention":
        return <InterventionScreen selectedClass={selectedClass} selectedAssessment={selectedAssessment} onNavigate={navigate} />;
      case "reports":
        return <ReportsScreen selectedClass={selectedClass} assessmentsForClass={assessmentsForClass} />;
      case "profile":
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <View style={styles.appShell}>
        <AppHeader route={route} selectedClass={selectedClass} onHome={() => navigate("home")} />
        <View style={styles.content}>{renderRoute()}</View>
        <BottomTabs currentRoute={route} onNavigate={(tab) => navigate(tab)} />
        <EvidenceSheet
          visible={openSheet === "evidence"}
          assessment={selectedAssessment}
          onClose={() => setOpenSheet(null)}
        />
        <StudentsSheet
          visible={openSheet === "students"}
          selectedClass={selectedClass}
          onClose={() => setOpenSheet(null)}
        />
      </View>
    </SafeAreaView>
  );
}

function AppHeader({
  route,
  selectedClass,
  onHome
}: {
  route: Route;
  selectedClass: ClassGroup;
  onHome: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const routeLabel = {
    home: "Home",
    classes: "Turmas",
    classDetail: selectedClass.name,
    assessments: "Avaliações",
    correction: "Correção",
    insights: "Insights",
    intervention: "Intervenção",
    reports: "Relatórios",
    profile: "Perfil"
  }[route];

  return (
    <View style={styles.header}>
      <Pressable style={styles.brand} onPress={onHome}>
        <View style={styles.logo}>
          <Ionicons name="school-outline" size={20} color={theme.colors.background} />
        </View>
        <View>
          <Text style={styles.brandName}>EduVision</Text>
          <Text style={styles.brandSubtitle}>Avaliação que orienta</Text>
        </View>
      </Pressable>
      <View style={styles.routePill}>
        <Text style={styles.routePillText}>{routeLabel}</Text>
      </View>
    </View>
  );
}

function HomeScreen({
  selectedClass,
  selectedAssessment,
  onNavigate,
  onOpenEvidence
}: {
  selectedClass: ClassGroup;
  selectedAssessment: Assessment;
  onNavigate: (route: Route) => void;
  onOpenEvidence: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const pendingValidations = selectedAssessment.pendingValidations;
  const attentionStudents = selectedClass.students.filter((student) => student.risk !== "baixo").length;

  return (
    <Screen>
      <Card elevated style={styles.heroCard}>
        <Text style={styles.eyebrow}>Olá, {teacher.name.split(" ")[0]}</Text>
        <Text style={styles.heroTitle}>Você tem {pendingValidations} correções para revisar.</Text>
        <Text style={styles.heroBody}>
          Comece pela avaliação de {selectedAssessment.title}. A IA já organizou os pontos de atenção.
        </Text>
        <PrimaryButton label="Continuar correção" icon="arrow-forward-outline" onPress={() => onNavigate("correction")} />
      </Card>

      <View style={styles.statsRow}>
        <StatCard label="Pendentes" value={`${pendingValidations}`} icon="shield-checkmark-outline" tone="warning" />
        <StatCard label="Turmas" value={`${classGroups.length}`} icon="people-outline" />
        <StatCard label="Apoio" value={`${attentionStudents}`} icon="heart-outline" tone="danger" />
      </View>

      <Section title="Resumo das turmas" subtitle="Só o suficiente para decidir o próximo passo.">
        <Card>
          <InfoRow
            icon="people-outline"
            title={selectedClass.name}
            subtitle={`${selectedClass.students.length} alunos · média ${getClassAverage(selectedClass.id).toFixed(1)}`}
            right={<Badge label="prioridade" icon="flag-outline" tone="warning" />}
            onPress={() => onNavigate("classDetail")}
          />
        </Card>
      </Section>

      <Section title="Alerta importante">
        <Card>
          <InfoRow
            icon="sparkles-outline"
            title={pedagogicalAlerts[0].title}
            subtitle="Sua turma apresentou dificuldade em converter fração para decimal."
            onPress={onOpenEvidence}
          />
        </Card>
      </Section>
    </Screen>
  );
}

function ClassesScreen({
  selectedClass,
  onChooseClass
}: {
  selectedClass: ClassGroup;
  onChooseClass: (classId: string) => void;
}) {
  return (
    <Screen>
      <Section
        eyebrow="Turmas"
        title="Escolha onde atuar"
        subtitle="Uma lista simples para evitar a sensação de painel pesado."
      >
        <Card>
          {classGroups.map((classGroup) => (
            <InfoRow
              key={classGroup.id}
              icon="people-outline"
              title={classGroup.name}
              subtitle={`${classGroup.subjectFocus} · ${classGroup.students.length} alunos`}
              right={
                classGroup.id === selectedClass.id ? (
                  <Badge label="ativa" icon="checkmark-outline" />
                ) : undefined
              }
              onPress={() => onChooseClass(classGroup.id)}
            />
          ))}
        </Card>
      </Section>
    </Screen>
  );
}

function ClassDetailScreen({
  selectedClass,
  assessmentsForClass,
  onNavigate,
  onChooseAssessment,
  onOpenStudents
}: {
  selectedClass: ClassGroup;
  assessmentsForClass: Assessment[];
  onNavigate: (route: Route) => void;
  onChooseAssessment: (assessment: Assessment, nextRoute?: Route) => void;
  onOpenStudents: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const criticalSkill = getSkill(selectedClass.criticalSkillIds[0]);
  const attentionStudents = selectedClass.students.filter((student) => student.risk !== "baixo").length;

  return (
    <Screen>
      <Section eyebrow={selectedClass.grade} title={selectedClass.name} subtitle={selectedClass.subjectFocus}>
        <Card elevated>
          <TextBlock
            title={criticalSkill ? `Foco sugerido: ${criticalSkill.name}` : "Turma em acompanhamento"}
            body="A próxima ação recomendada é revisar as correções pendentes antes de planejar a retomada."
          />
          <PrimaryButton label="Iniciar correção" icon="scan-outline" onPress={() => onNavigate("correction")} />
        </Card>
      </Section>

      <View style={styles.statsRow}>
        <StatCard label="Média" value={getClassAverage(selectedClass.id).toFixed(1)} icon="analytics-outline" />
        <StatCard label="Apoio" value={`${attentionStudents}`} icon="heart-outline" tone="warning" />
        <StatCard label="Provas" value={`${assessmentsForClass.length}`} icon="documents-outline" />
      </View>

      <Section title="Avaliações recentes">
        <Card>
          {assessmentsForClass.slice(0, 2).map((assessment) => (
            <InfoRow
              key={assessment.id}
              icon="document-text-outline"
              title={assessment.title}
              subtitle={`${formatDate(assessment.date)} · média ${assessment.average.toFixed(1)}`}
              onPress={() => onChooseAssessment(assessment, "correction")}
            />
          ))}
        </Card>
      </Section>

      <SecondaryButton label="Ver alunos em atenção" icon="people-outline" onPress={onOpenStudents} />
    </Screen>
  );
}

function AssessmentsScreen({
  selectedClass,
  selectedAssessment,
  onChooseClass,
  onChooseAssessment
}: {
  selectedClass: ClassGroup;
  selectedAssessment: Assessment;
  onChooseClass: (classId: string, nextRoute?: Route) => void;
  onChooseAssessment: (assessment: Assessment, nextRoute?: Route) => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const assessmentsForClass = getClassAssessments(selectedClass.id);

  return (
    <Screen>
      <Section eyebrow="Avaliações" title="Selecione o que corrigir" subtitle="Uma avaliação por vez. Menos ansiedade, mais foco.">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {classGroups.map((classGroup) => (
            <Pressable
              key={classGroup.id}
              style={[styles.classChip, classGroup.id === selectedClass.id && styles.classChipActive]}
              onPress={() => onChooseClass(classGroup.id, "assessments")}
            >
              <Text style={[styles.classChipText, classGroup.id === selectedClass.id && styles.classChipTextActive]}>
                {classGroup.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Section>

      <Card>
        {assessmentsForClass.map((assessment) => (
          <InfoRow
            key={assessment.id}
            icon="document-text-outline"
            title={assessment.title}
            subtitle={`${assessment.pendingValidations} validações · ${assessment.correctionProgress}% corrigida`}
            right={
              assessment.id === selectedAssessment.id ? (
                <Badge label="selecionada" icon="checkmark-outline" />
              ) : undefined
            }
            onPress={() => onChooseAssessment(assessment, "correction")}
          />
        ))}
      </Card>

      <PrimaryButton label="Começar fluxo guiado" icon="arrow-forward-outline" onPress={() => onChooseAssessment(selectedAssessment, "correction")} />
    </Screen>
  );
}

function CorrectionWizard({
  selectedClass,
  selectedAssessment,
  selectedResult,
  step,
  setStep,
  onChooseClass,
  onChooseAssessment,
  onFinish
}: {
  selectedClass: ClassGroup;
  selectedAssessment: Assessment;
  selectedResult: StudentAssessmentResult;
  step: number;
  setStep: (step: number) => void;
  onChooseClass: (classId: string, nextRoute?: Route) => void;
  onChooseAssessment: (assessment: Assessment) => void;
  onFinish: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [decision, setDecision] = useState<DecisionStatus>(selectedResult.decision);
  const [grade, setGrade] = useState(selectedResult.grade.toFixed(1));
  const [feedback, setFeedback] = useState(selectedResult.finalFeedback);
  const currentStudent = selectedClass.students.find((student) => student.id === selectedResult.studentId) ?? selectedClass.students[0];
  const criticalSkill = selectedClass.criticalSkillIds.map(getSkill).filter(Boolean)[0] as Skill | undefined;
  const canGoBack = step > 0;
  const isProcessing = step === 3;

  useEffect(() => {
    setDecision(selectedResult.decision);
    setGrade(selectedResult.grade.toFixed(1));
    setFeedback(selectedResult.finalFeedback);
  }, [selectedResult]);

  const next = () => {
    if (step >= correctionSteps.length - 1) {
      onFinish();
      return;
    }
    setStep(step + 1);
  };

  const ctaLabel = [
    "Confirmar turma",
    "Confirmar avaliação",
    "Capturar prova",
    "Analisando...",
    "Revisar decisão",
    "Confirmar nota",
    "Salvar feedback",
    "Gerar intervenção",
    "Ver insights"
  ][step];

  return (
    <Screen>
      <Section eyebrow="Fluxo guiado" title={correctionSteps[step]} subtitle="Cada tela mostra só a decisão necessária agora.">
        <ProgressStepper steps={correctionSteps} currentIndex={step} />
      </Section>

      {step === 0 ? (
        <Card>
          {classGroups.map((classGroup) => (
            <InfoRow
              key={classGroup.id}
              icon="people-outline"
              title={classGroup.name}
              subtitle={`${classGroup.students.length} alunos · ${classGroup.subjectFocus}`}
              right={classGroup.id === selectedClass.id ? <Badge label="selecionada" icon="checkmark-outline" /> : undefined}
              onPress={() => onChooseClass(classGroup.id, "correction")}
            />
          ))}
        </Card>
      ) : null}

      {step === 1 ? (
        <Card>
          {getClassAssessments(selectedClass.id).map((assessment) => (
            <InfoRow
              key={assessment.id}
              icon="document-text-outline"
              title={assessment.title}
              subtitle={`${assessment.pendingValidations} aguardando revisão · ${formatDate(assessment.date)}`}
              right={assessment.id === selectedAssessment.id ? <Badge label="selecionada" icon="checkmark-outline" /> : undefined}
              onPress={() => onChooseAssessment(assessment)}
            />
          ))}
        </Card>
      ) : null}

      {step === 2 ? (
        <Card elevated>
          <View style={styles.captureFrame}>
            <View style={styles.scanCorners}>
              <Ionicons name="scan-outline" size={42} color={theme.colors.primary} />
              <Text style={styles.captureTitle}>Posicione a prova</Text>
              <Text style={styles.captureBody}>A câmera simulada lê respostas e aplica a rubrica salva.</Text>
            </View>
          </View>
          <InfoRow icon="camera-outline" title="Foto nítida detectada" subtitle="A prova está dentro da área recomendada." />
        </Card>
      ) : null}

      {step === 3 ? <LoadingState title="Analisando respostas..." body="Lendo imagem, entendendo respostas e preparando uma sugestão para você revisar." /> : null}

      {step === 4 ? (
        <Card elevated>
          <View style={styles.reviewHeader}>
            <Avatar name={currentStudent.name} color={currentStudent.avatarColor} />
            <View style={styles.reviewText}>
              <Text style={styles.cardTitle}>{currentStudent.name}</Text>
              <Text style={styles.mutedText}>{selectedAssessment.title}</Text>
            </View>
            <View style={styles.scoreBubble}>
              <Text style={styles.scoreText}>{selectedResult.grade.toFixed(1)}</Text>
            </View>
          </View>
          <TextBlock title="Sugestão da IA" body={selectedResult.summary} />
          <InfoRow
            icon="shield-checkmark-outline"
            title={`Confiança ${getConfidence(selectedResult)}%`}
            subtitle="Revise antes de confirmar. Você mantém a decisão final."
          />
        </Card>
      ) : null}

      {step === 5 ? (
        <Card>
          <TextBlock title="Confirme com autonomia" body="A IA apoia a correção. A nota final só vale depois da sua validação." />
          <View style={styles.decisionRow}>
            {(["aprovar", "ajustar", "rejeitar"] as DecisionStatus[]).map((item) => (
              <Pressable
                key={item}
                style={[styles.decisionPill, decision === item && styles.decisionPillActive]}
                onPress={() => setDecision(item)}
              >
                <Text style={[styles.decisionText, decision === item && styles.decisionTextActive]}>
                  {item === "aprovar" ? "Aprovar" : item === "ajustar" ? "Ajustar" : "Rejeitar"}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.inputLabel}>Nota final</Text>
          <TextInput value={grade} onChangeText={setGrade} keyboardType="decimal-pad" style={styles.input} />
        </Card>
      ) : null}

      {step === 6 ? (
        <Card>
          <TextBlock title="Feedback para o aluno" body="Texto simples, construtivo e editável." />
          <TextInput
            value={feedback}
            onChangeText={setFeedback}
            multiline
            style={[styles.input, styles.feedbackInput]}
          />
        </Card>
      ) : null}

      {step === 7 ? (
        <Card elevated>
          <Badge label="Insight principal" icon="sparkles-outline" />
          <TextBlock
            title="Sua turma apresentou dificuldade nesta habilidade."
            body={selectedAssessment.corePattern}
          />
          <View style={styles.statsRow}>
            <StatCard label="Habilidade" value={`${criticalSkill?.vulnerability ?? 0}%`} icon="warning-outline" tone="warning" />
            <StatCard label="Alunos" value={`${selectedClass.students.filter((student) => student.risk !== "baixo").length}`} icon="people-outline" />
          </View>
        </Card>
      ) : null}

      {step === 8 ? (
        <Card elevated>
          <TextBlock
            title="Sugestão para ajudar os alunos"
            body="Retomada guiada com exercícios progressivos de fração para decimal antes da próxima avaliação."
          />
          <InfoRow icon="calendar-outline" title="Prazo sugerido" subtitle="Até a próxima aula da semana" />
          <InfoRow icon="people-outline" title="Grupo recomendado" subtitle="Bruno, Camila e Diego" />
        </Card>
      ) : null}

      <View style={styles.wizardActions}>
        <SecondaryButton label="Voltar" icon="arrow-back-outline" onPress={() => setStep(step - 1)} disabled={!canGoBack} />
        <PrimaryButton label={ctaLabel} icon="arrow-forward-outline" onPress={next} disabled={isProcessing} />
      </View>
    </Screen>
  );
}

function InsightsScreen({
  selectedClass,
  selectedAssessment,
  onNavigate,
  onOpenEvidence
}: {
  selectedClass: ClassGroup;
  selectedAssessment: Assessment;
  onNavigate: (route: Route) => void;
  onOpenEvidence: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const criticalSkill = selectedClass.criticalSkillIds.map(getSkill).filter(Boolean)[0] as Skill | undefined;

  return (
    <Screen>
      <Section eyebrow="Insights" title="O que merece atenção agora?" subtitle="Um insight principal, poucas métricas e uma recomendação.">
        <Card elevated>
          <Badge label={criticalSkill?.code ?? "Habilidade"} icon="ribbon-outline" tone="warning" />
          <TextBlock title="Sua turma apresentou dificuldades nesta habilidade." body={selectedAssessment.corePattern} />
          <PrimaryButton label="Ver sugestões para ajudar" icon="construct-outline" onPress={() => onNavigate("intervention")} />
        </Card>
      </Section>

      <View style={styles.statsRow}>
        <StatCard label="Domínio" value={`${criticalSkill?.mastery ?? 0}%`} icon="trending-up-outline" />
        <StatCard label="Apoio" value={`${selectedClass.students.filter((student) => student.risk !== "baixo").length}`} icon="heart-outline" tone="warning" />
        <StatCard label="Progresso" value={`${selectedClass.performanceTrend > 0 ? "+" : ""}${selectedClass.performanceTrend}%`} icon="analytics-outline" />
      </View>

      <SecondaryButton label="Ver evidências" icon="document-text-outline" onPress={onOpenEvidence} />
      <SecondaryButton label="Abrir relatório" icon="bar-chart-outline" onPress={() => onNavigate("reports")} />
    </Screen>
  );
}

function InterventionScreen({
  selectedClass,
  selectedAssessment,
  onNavigate
}: {
  selectedClass: ClassGroup;
  selectedAssessment: Assessment;
  onNavigate: (route: Route) => void;
}) {
  const plan =
    interventionPlans.find((item) => item.classId === selectedClass.id && item.assessmentId === selectedAssessment.id) ??
    interventionPlans[0];

  return (
    <Screen>
      <Section eyebrow="Intervenção" title="Sugestões para ajudar os alunos" subtitle="Baseado nos erros mais frequentes da turma.">
        <Card elevated>
          <Badge label={`Prioridade ${plan.priority}`} icon="flag-outline" tone={plan.priority === "Alta" ? "warning" : "primary"} />
          <TextBlock title={plan.title} body={plan.evidence} />
          {plan.steps.slice(0, 3).map((step, index) => (
            <InfoRow key={step} icon="checkmark-circle-outline" title={`${index + 1}. ${step}`} />
          ))}
        </Card>
      </Section>
      <PrimaryButton label="Abrir relatório" icon="bar-chart-outline" onPress={() => onNavigate("reports")} />
    </Screen>
  );
}

function ReportsScreen({
  selectedClass,
  assessmentsForClass
}: {
  selectedClass: ClassGroup;
  assessmentsForClass: Assessment[];
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Screen>
      <Section eyebrow="Relatório" title="Resumo para coordenação" subtitle="Enxuto, exportável e fácil de explicar.">
        <View style={styles.statsRow}>
          {reportSnapshots.slice(0, 3).map((snapshot, index) => (
            <StatCard
              key={snapshot.id}
              label={snapshot.title}
              value={snapshot.value}
              icon={index === 0 ? "checkmark-done-outline" : index === 1 ? "time-outline" : "ribbon-outline"}
              tone={index === 2 ? "warning" : "primary"}
            />
          ))}
        </View>
      </Section>
      <Card>
        {assessmentsForClass.map((assessment) => (
          <InfoRow
            key={assessment.id}
            icon="analytics-outline"
            title={assessment.title}
            subtitle={`${formatDate(assessment.date)} · média ${assessment.average.toFixed(1)}`}
            right={<MiniProgress value={assessment.average * 10} />}
          />
        ))}
      </Card>
      <SecondaryButton label="Exportar relatório mockado" icon="download-outline" onPress={() => undefined} />
    </Screen>
  );
}

function ProfileScreen() {
  const { mode, toggleMode } = useTheme();

  return (
    <Screen>
      <Section eyebrow="Perfil" title={teacher.name} subtitle={`${teacher.role} · ${teacher.school}`}>
        <Card elevated>
          <InfoRow icon="person-outline" title="Modo professor" subtitle="Decisão final sempre humana." />
          <InfoRow
            icon={mode === "dark" ? "moon-outline" : "sunny-outline"}
            title="Aparência"
            subtitle={mode === "dark" ? "Dark mode premium ativado" : "Light mode ativado"}
            right={<Badge label={mode === "dark" ? "dark" : "light"} icon="contrast-outline" />}
            onPress={toggleMode}
          />
          <InfoRow icon="shield-checkmark-outline" title="Preferência salva" subtitle="O tema escolhido fica persistido neste navegador." />
        </Card>
      </Section>
    </Screen>
  );
}

function EvidenceSheet({
  visible,
  assessment,
  onClose
}: {
  visible: boolean;
  assessment: Assessment;
  onClose: () => void;
}) {
  return (
    <BottomSheet visible={visible} title="Evidências" onClose={onClose}>
      <InfoRow icon="sparkles-outline" title="Padrão encontrado" subtitle={assessment.corePattern} />
      <InfoRow icon="document-text-outline" title="Questão mais sensível" subtitle={assessment.questions[2]?.statement ?? assessment.questions[0]?.statement} />
      <InfoRow icon="shield-checkmark-outline" title="Professor decide" subtitle="A sugestão só vira nota após validação docente." />
    </BottomSheet>
  );
}

function StudentsSheet({
  visible,
  selectedClass,
  onClose
}: {
  visible: boolean;
  selectedClass: ClassGroup;
  onClose: () => void;
}) {
  const attentionStudents = selectedClass.students.filter((student) => student.risk !== "baixo");

  return (
    <BottomSheet visible={visible} title="Alunos em atenção" onClose={onClose}>
      {attentionStudents.map((student) => (
        <InfoRow key={student.id} icon="heart-outline" title={student.name} subtitle={student.note} />
      ))}
    </BottomSheet>
  );
}

function BottomTabs({ currentRoute, onNavigate }: { currentRoute: Route; onNavigate: (route: Route) => void }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.bottomTabs}>
      {bottomTabs.map((tab) => {
        const active = tab.routes.includes(currentRoute);
        return (
          <Pressable key={tab.id} style={styles.tabButton} onPress={() => onNavigate(tab.id)}>
            <Ionicons name={tab.icon} size={21} color={active ? theme.colors.primary : theme.colors.textSoft} />
            <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <ScrollView contentContainerStyle={styles.screen}>{children}</ScrollView>;
}

function TextBlock({ title, body }: { title: string; body: string }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.textBlock}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.mutedText}>{body}</Text>
    </View>
  );
}

function Avatar({ name, color }: { name: string; color: string }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Text style={styles.avatarText}>{getInitials(name)}</Text>
    </View>
  );
}

function MiniProgress({ value }: { value: number }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.miniProgress}>
      <View style={[styles.miniProgressFill, { width: `${clampPercent(value)}%` }]} />
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    appShell: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    content: {
      flex: 1
    },
    screen: {
      padding: theme.spacing.lg,
      paddingBottom: 116,
      gap: theme.spacing.lg
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.spacing.md
    },
    brand: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      flex: 1
    },
    logo: {
      width: 38,
      height: 38,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary
    },
    brandName: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "900"
    },
    brandSubtitle: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      fontWeight: "800"
    },
    routePill: {
      borderRadius: theme.radius.pill,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface
    },
    routePillText: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      fontWeight: "900"
    },
    heroCard: {
      gap: theme.spacing.md
    },
    eyebrow: {
      color: theme.colors.primary,
      fontSize: theme.typography.caption,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0
    },
    heroTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.hero,
      lineHeight: 36,
      fontWeight: "900"
    },
    heroBody: {
      color: theme.colors.textMuted,
      fontSize: 15,
      lineHeight: 22
    },
    statsRow: {
      flexDirection: "row",
      gap: theme.spacing.sm
    },
    chipRow: {
      gap: theme.spacing.sm,
      paddingRight: theme.spacing.lg
    },
    classChip: {
      borderRadius: theme.radius.pill,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1
    },
    classChipActive: {
      backgroundColor: theme.colors.primarySoft,
      borderColor: theme.colors.primary
    },
    classChipText: {
      color: theme.colors.textMuted,
      fontWeight: "900"
    },
    classChipTextActive: {
      color: theme.colors.primary
    },
    captureFrame: {
      minHeight: 290,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.surfaceRaised,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing.md
    },
    scanCorners: {
      width: "78%",
      minHeight: 210,
      borderRadius: theme.radius.lg,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderStyle: "dashed",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.lg,
      gap: theme.spacing.sm
    },
    captureTitle: {
      color: theme.colors.text,
      fontSize: 19,
      fontWeight: "900",
      textAlign: "center"
    },
    captureBody: {
      color: theme.colors.textMuted,
      textAlign: "center",
      lineHeight: 20
    },
    reviewHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md
    },
    reviewText: {
      flex: 1
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center"
    },
    avatarText: {
      color: theme.colors.text,
      fontWeight: "900"
    },
    scoreBubble: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primarySoft
    },
    scoreText: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: "900"
    },
    textBlock: {
      gap: theme.spacing.xs
    },
    cardTitle: {
      color: theme.colors.text,
      fontSize: 18,
      lineHeight: 24,
      fontWeight: "900"
    },
    mutedText: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      lineHeight: 20
    },
    wizardActions: {
      gap: theme.spacing.sm
    },
    decisionRow: {
      flexDirection: "row",
      gap: theme.spacing.sm,
      marginVertical: theme.spacing.md
    },
    decisionPill: {
      flex: 1,
      minHeight: 46,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surfaceRaised,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    decisionPillActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary
    },
    decisionText: {
      color: theme.colors.textMuted,
      fontWeight: "900",
      fontSize: 13
    },
    decisionTextActive: {
      color: theme.colors.background
    },
    inputLabel: {
      color: theme.colors.text,
      fontSize: 13,
      fontWeight: "900",
      marginBottom: theme.spacing.sm
    },
    input: {
      minHeight: 50,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      color: theme.colors.text,
      backgroundColor: theme.colors.surfaceRaised,
      fontSize: 15
    },
    feedbackInput: {
      minHeight: 190,
      textAlignVertical: "top",
      marginTop: theme.spacing.md
    },
    miniProgress: {
      width: 62,
      height: 7,
      borderRadius: theme.radius.pill,
      overflow: "hidden",
      backgroundColor: theme.colors.surfaceSoft
    },
    miniProgressFill: {
      height: "100%",
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primary
    },
    bottomTabs: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: "row",
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface
    },
    tabButton: {
      flex: 1,
      minHeight: 54,
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    },
    tabText: {
      color: theme.colors.textSoft,
      fontSize: 11,
      fontWeight: "900"
    },
    tabTextActive: {
      color: theme.colors.primary
    }
  });
}
