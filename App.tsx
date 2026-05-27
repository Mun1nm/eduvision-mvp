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
import { assessments, classGroups, skills } from "./src/data/mockData";
import { Assessment, ClassGroup, Question, Skill, StudentAssessmentResult } from "./src/types";

type Screen = "onboarding" | "dashboard" | "template" | "scanner" | "corrected";

type TabItem = {
  screen: Exclude<Screen, "onboarding">;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const tabs: TabItem[] = [
  { screen: "dashboard", label: "Início", icon: "grid-outline" },
  { screen: "template", label: "Gabarito", icon: "create-outline" },
  { screen: "scanner", label: "Escanear", icon: "scan-outline" },
  { screen: "corrected", label: "Prova", icon: "document-text-outline" }
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(value));

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [selectedClassId, setSelectedClassId] = useState(classGroups[0].id);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(assessments[0].id);
  const [selectedStudentId, setSelectedStudentId] = useState("alu-ana");
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const selectedClass = useMemo(
    () => classGroups.find((classGroup) => classGroup.id === selectedClassId) ?? classGroups[0],
    [selectedClassId]
  );

  const assessmentsForClass = useMemo(
    () => assessments.filter((assessment) => assessment.classId === selectedClass.id),
    [selectedClass.id]
  );

  const selectedAssessment = useMemo(() => {
    const fromSelectedClass = assessmentsForClass.find((assessment) => assessment.id === selectedAssessmentId);
    return fromSelectedClass ?? assessmentsForClass[0] ?? assessments[0];
  }, [assessmentsForClass, selectedAssessmentId]);

  const correctedResult = useMemo(() => {
    const direct = selectedAssessment.results.find(
      (result) => result.studentId === selectedStudentId && result.status === "corrigido"
    );
    return direct ?? selectedAssessment.results.find((result) => result.status === "corrigido") ?? selectedAssessment.results[0];
  }, [selectedAssessment, selectedStudentId]);

  useEffect(() => {
    if (!assessmentsForClass.some((assessment) => assessment.id === selectedAssessmentId)) {
      setSelectedAssessmentId(assessmentsForClass[0]?.id ?? assessments[0].id);
    }
  }, [assessmentsForClass, selectedAssessmentId]);

  const navigate = (nextScreen: Screen) => {
    if (nextScreen !== "scanner") {
      setIsProcessing(false);
      setScanComplete(false);
    }
    setScreen(nextScreen);
  };

  const startScan = () => {
    setIsProcessing(true);
    setScanComplete(false);
    setTimeout(() => {
      const firstCorrected = selectedAssessment.results.find((result) => result.status === "corrigido");
      if (firstCorrected) {
        setSelectedStudentId(firstCorrected.studentId);
      }
      setIsProcessing(false);
      setScanComplete(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {screen === "onboarding" ? (
        <OnboardingScreen onEnter={() => navigate("dashboard")} />
      ) : (
        <View style={styles.appShell}>
          <TopBar
            selectedClass={selectedClass}
            onSelectClass={(classId) => {
              setSelectedClassId(classId);
              const nextAssessment = assessments.find((assessment) => assessment.classId === classId);
              if (nextAssessment) {
                setSelectedAssessmentId(nextAssessment.id);
                const nextResult = nextAssessment.results.find((result) => result.status === "corrigido");
                if (nextResult) {
                  setSelectedStudentId(nextResult.studentId);
                }
              }
            }}
          />
          <View style={styles.content}>
            {screen === "dashboard" && (
              <DashboardScreen
                selectedClass={selectedClass}
                selectedAssessment={selectedAssessment}
                assessmentsForClass={assessmentsForClass}
                onSelectAssessment={(assessment) => {
                  setSelectedAssessmentId(assessment.id);
                  const firstCorrected = assessment.results.find((result) => result.status === "corrigido");
                  if (firstCorrected) {
                    setSelectedStudentId(firstCorrected.studentId);
                  }
                }}
                onOpenScanner={() => navigate("scanner")}
                onOpenTemplate={() => navigate("template")}
              />
            )}
            {screen === "template" && <TemplateScreen assessment={selectedAssessment} />}
            {screen === "scanner" && (
              <ScannerScreen
                assessment={selectedAssessment}
                selectedClass={selectedClass}
                isProcessing={isProcessing}
                scanComplete={scanComplete}
                onStartScan={startScan}
                onOpenCorrected={() => navigate("corrected")}
              />
            )}
            {screen === "corrected" && (
              <CorrectedExamScreen
                assessment={selectedAssessment}
                selectedClass={selectedClass}
                result={correctedResult}
                onSelectStudent={setSelectedStudentId}
              />
            )}
          </View>
          <BottomTabs currentScreen={screen} onNavigate={navigate} />
        </View>
      )}
    </SafeAreaView>
  );
}

function OnboardingScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.onboarding}>
      <View style={styles.brandRow}>
        <View style={styles.logoMark}>
          <Ionicons name="school-outline" size={30} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.brandName}>EduVision</Text>
          <Text style={styles.brandMantra}>Avaliação que orienta</Text>
        </View>
      </View>
      <View style={styles.heroPanel}>
        <View style={styles.heroMetric}>
          <Text style={styles.heroMetricValue}>2 min</Text>
          <Text style={styles.heroMetricLabel}>para corrigir uma pilha inicial</Text>
        </View>
        <View style={styles.heroVisual}>
          <View style={styles.paperSheet}>
            <View style={styles.paperHeader} />
            <View style={styles.answerLineWide} />
            <View style={styles.answerLine} />
            <View style={styles.answerGrid}>
              {["A", "B", "C", "D"].map((item, index) => (
                <View key={item} style={[styles.answerBubble, index === 2 && styles.answerBubbleActive]}>
                  <Text style={[styles.answerBubbleText, index === 2 && styles.answerBubbleTextActive]}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.aiNote}>
              <Ionicons name="sparkles-outline" size={16} color="#0F766E" />
              <Text style={styles.aiNoteText}>Feedback gerado</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.onboardingTitle}>Corrija, diagnostique e planeje a próxima aula com evidências.</Text>
      <Text style={styles.onboardingBody}>
        Entre no modo demonstrativo para explorar turmas, gabaritos, digitalização por IA e devolutivas pedagógicas.
      </Text>
      <View style={styles.onboardingActions}>
        <PrimaryButton label="Criar conta de professor" icon="person-add-outline" onPress={onEnter} />
        <SecondaryButton label="Acessar modo demonstrativo" icon="play-circle-outline" onPress={onEnter} />
      </View>
      <View style={styles.onboardingFeatureGrid}>
        <FeaturePill icon="camera-outline" label="Correção via câmera" />
        <FeaturePill icon="analytics-outline" label="Diagnóstico por habilidade" />
        <FeaturePill icon="chatbubble-ellipses-outline" label="Feedback discursivo" />
      </View>
    </ScrollView>
  );
}

function TopBar({
  selectedClass,
  onSelectClass
}: {
  selectedClass: ClassGroup;
  onSelectClass: (classId: string) => void;
}) {
  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.topEyebrow}>EduVision</Text>
        <Text style={styles.topTitle}>Painel do Professor</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.classSelector}>
        {classGroups.map((classGroup) => (
          <Pressable
            key={classGroup.id}
            onPress={() => onSelectClass(classGroup.id)}
            style={[styles.classChip, selectedClass.id === classGroup.id && styles.classChipActive]}
          >
            <View style={[styles.classDot, { backgroundColor: classGroup.color }]} />
            <Text style={[styles.classChipText, selectedClass.id === classGroup.id && styles.classChipTextActive]}>
              {classGroup.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function DashboardScreen({
  selectedClass,
  selectedAssessment,
  assessmentsForClass,
  onSelectAssessment,
  onOpenScanner,
  onOpenTemplate
}: {
  selectedClass: ClassGroup;
  selectedAssessment: Assessment;
  assessmentsForClass: Assessment[];
  onSelectAssessment: (assessment: Assessment) => void;
  onOpenScanner: () => void;
  onOpenTemplate: () => void;
}) {
  const classAverage = useMemo(() => {
    const total = assessmentsForClass.reduce((sum, assessment) => sum + assessment.average, 0);
    return total / Math.max(assessmentsForClass.length, 1);
  }, [assessmentsForClass]);

  const vulnerableSkills = useMemo(
    () => [...skills].sort((first, second) => second.vulnerability - first.vulnerability).slice(0, 4),
    []
  );

  return (
    <ScrollView contentContainerStyle={styles.screenScroll}>
      <View style={styles.dashboardHero}>
        <View style={styles.dashboardHeroText}>
          <Text style={styles.sectionEyebrow}>{selectedClass.grade}</Text>
          <Text style={styles.dashboardTitle}>{selectedClass.name}</Text>
          <Text style={styles.dashboardSubtitle}>
            {selectedClass.subjectFocus} · {selectedClass.room}
          </Text>
        </View>
        <View style={styles.heroScoreCard}>
          <Text style={styles.heroScore}>{classAverage.toFixed(1)}</Text>
          <Text style={styles.heroScoreLabel}>média geral</Text>
        </View>
      </View>

      <View style={styles.metricRow}>
        <MetricCard icon="people-outline" label="Alunos" value={`${selectedClass.students.length}`} tone="#0F766E" />
        <MetricCard icon="reader-outline" label="Avaliações" value={`${assessmentsForClass.length}`} tone="#2563EB" />
        <MetricCard
          icon="checkmark-done-outline"
          label="Correção"
          value={`${Math.round(selectedAssessment.correctionProgress)}%`}
          tone="#7C3AED"
        />
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Avaliações recentes</Text>
          <Text style={styles.sectionSubtitle}>Selecione uma prova para atualizar gabarito, scanner e devolutiva.</Text>
        </View>
      </View>

      {assessmentsForClass.map((assessment) => (
        <AssessmentRow
          key={assessment.id}
          assessment={assessment}
          isActive={assessment.id === selectedAssessment.id}
          onPress={() => onSelectAssessment(assessment)}
        />
      ))}

      <View style={styles.actionGrid}>
        <ActionPanel
          icon="scan-outline"
          title="Corrigir nova prova"
          body="Abrir simulação de câmera, OCR e inferência de IA."
          onPress={onOpenScanner}
        />
        <ActionPanel
          icon="options-outline"
          title="Configurar critérios"
          body="Editar gabarito objetivo e rubricas das discursivas."
          onPress={onOpenTemplate}
        />
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Habilidades curriculares</Text>
          <Text style={styles.sectionSubtitle}>Domínio e vulnerabilidade calculados a partir das correções.</Text>
        </View>
      </View>

      <View style={styles.skillBoard}>
        {vulnerableSkills.map((skill) => (
          <SkillBar key={skill.id} skill={skill} />
        ))}
      </View>
    </ScrollView>
  );
}

function TemplateScreen({ assessment }: { assessment: Assessment }) {
  const [selectedQuestionId, setSelectedQuestionId] = useState(assessment.questions[0]?.id);
  const selectedQuestion = assessment.questions.find((question) => question.id === selectedQuestionId) ?? assessment.questions[0];

  useEffect(() => {
    setSelectedQuestionId(assessment.questions[0]?.id);
  }, [assessment.id, assessment.questions]);

  return (
    <ScrollView contentContainerStyle={styles.screenScroll}>
      <View style={styles.pageTitleRow}>
        <View>
          <Text style={styles.sectionEyebrow}>Gabarito parametrizável</Text>
          <Text style={styles.pageTitle}>{assessment.title}</Text>
          <Text style={styles.sectionSubtitle}>{assessment.subject} · {formatDate(assessment.date)}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#0F766E" />
          <Text style={styles.statusBadgeText}>Critérios ativos</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.questionTabs}>
        {assessment.questions.map((question) => (
          <Pressable
            key={question.id}
            onPress={() => setSelectedQuestionId(question.id)}
            style={[styles.questionTab, selectedQuestion.id === question.id && styles.questionTabActive]}
          >
            <Text style={[styles.questionTabText, selectedQuestion.id === question.id && styles.questionTabTextActive]}>
              Q{question.number}
            </Text>
            <Text style={styles.questionTabKind}>{question.type}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <QuestionEditor question={selectedQuestion} />

      <View style={styles.criteriaSummary}>
        <Text style={styles.sectionTitle}>Mapa pedagógico da avaliação</Text>
        {assessment.questions.map((question) => (
          <View key={question.id} style={styles.criteriaRow}>
            <View style={styles.criteriaNumber}>
              <Text style={styles.criteriaNumberText}>{question.number}</Text>
            </View>
            <View style={styles.criteriaContent}>
              <Text style={styles.criteriaTitle}>{question.statement}</Text>
              <Text style={styles.criteriaMeta}>
                {question.points} pts · {question.type} · {question.skillIds.map((skillId) => skills.find((skill) => skill.id === skillId)?.name).filter(Boolean).join(", ")}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function ScannerScreen({
  assessment,
  selectedClass,
  isProcessing,
  scanComplete,
  onStartScan,
  onOpenCorrected
}: {
  assessment: Assessment;
  selectedClass: ClassGroup;
  isProcessing: boolean;
  scanComplete: boolean;
  onStartScan: () => void;
  onOpenCorrected: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenScroll}>
      <View style={styles.pageTitleRow}>
        <View>
          <Text style={styles.sectionEyebrow}>Motor de correção com IA</Text>
          <Text style={styles.pageTitle}>Digitalizar prova</Text>
          <Text style={styles.sectionSubtitle}>{selectedClass.name} · {assessment.title}</Text>
        </View>
      </View>

      <View style={styles.cameraFrame}>
        <View style={styles.cameraTopBar}>
          <View style={styles.cameraPill}>
            <View style={styles.liveDot} />
            <Text style={styles.cameraPillText}>Câmera simulada</Text>
          </View>
          <Ionicons name="flash-outline" size={22} color="#E2E8F0" />
        </View>
        <View style={styles.scanTarget}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
          <View style={styles.examPreview}>
            <View style={styles.examPreviewHeader} />
            <View style={styles.examPreviewLine} />
            <View style={styles.examPreviewLineShort} />
            <View style={styles.examPreviewOptions}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.examPreviewOption} />
              ))}
            </View>
            <View style={styles.examPreviewTextBlock} />
            <View style={styles.examPreviewTextBlockSmall} />
          </View>
        </View>
        <View style={styles.cameraFooter}>
          {isProcessing ? (
            <View style={styles.processingBox}>
              <Ionicons name="sync-outline" size={24} color="#38BDF8" />
              <View>
                <Text style={styles.processingTitle}>Processando Imagem / OCR / Inferência da IA...</Text>
                <Text style={styles.processingSubtitle}>Validando gabarito, caligrafia e rubricas discursivas</Text>
              </View>
            </View>
          ) : scanComplete ? (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle-outline" size={28} color="#34D399" />
              <View style={styles.successTextBlock}>
                <Text style={styles.successTitle}>Teste corrigido com sucesso</Text>
                <Text style={styles.successSubtitle}>Nota, comentários e plano de estudo prontos para revisão.</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.cameraHint}>Posicione a prova dentro da área marcada para iniciar a leitura.</Text>
          )}
        </View>
      </View>

      <View style={styles.scannerActions}>
        <PrimaryButton
          label={isProcessing ? "Processando..." : scanComplete ? "Escanear novamente" : "Iniciar digitalização"}
          icon={isProcessing ? "hourglass-outline" : "scan-outline"}
          onPress={onStartScan}
          disabled={isProcessing}
        />
        <SecondaryButton
          label="Ver prova corrigida"
          icon="document-text-outline"
          onPress={onOpenCorrected}
          disabled={!scanComplete}
        />
      </View>

      <View style={styles.pipeline}>
        <PipelineStep icon="camera-outline" title="Captura" detail="Detecção de bordas e nitidez" active />
        <PipelineStep icon="text-outline" title="OCR" detail="Leitura de alternativas e caligrafia" active={isProcessing || scanComplete} />
        <PipelineStep icon="sparkles-outline" title="IA pedagógica" detail="Correção discursiva por rubricas" active={isProcessing || scanComplete} />
        <PipelineStep icon="analytics-outline" title="Diagnóstico" detail="Atualização de habilidades" active={scanComplete} />
      </View>
    </ScrollView>
  );
}

function CorrectedExamScreen({
  assessment,
  selectedClass,
  result,
  onSelectStudent
}: {
  assessment: Assessment;
  selectedClass: ClassGroup;
  result: StudentAssessmentResult;
  onSelectStudent: (studentId: string) => void;
}) {
  const student = selectedClass.students.find((item) => item.id === result.studentId) ?? selectedClass.students[0];
  const correctedResults = assessment.results.filter((item) => item.status === "corrigido");
  const percentage = Math.round((result.grade / result.maxGrade) * 100);

  return (
    <ScrollView contentContainerStyle={styles.screenScroll}>
      <View style={styles.pageTitleRow}>
        <View>
          <Text style={styles.sectionEyebrow}>Prova corrigida</Text>
          <Text style={styles.pageTitle}>{student.name}</Text>
          <Text style={styles.sectionSubtitle}>{assessment.title} · {assessment.subject}</Text>
        </View>
        <View style={styles.gradeBadge}>
          <Text style={styles.gradeValue}>{result.grade.toFixed(1)}</Text>
          <Text style={styles.gradeMax}>/ {result.maxGrade}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.studentSelector}>
        {correctedResults.map((item) => {
          const itemStudent = selectedClass.students.find((studentItem) => studentItem.id === item.studentId);
          if (!itemStudent) {
            return null;
          }
          const active = item.studentId === result.studentId;
          return (
            <Pressable
              key={item.studentId}
              onPress={() => onSelectStudent(item.studentId)}
              style={[styles.studentChip, active && styles.studentChipActive]}
            >
              <View style={[styles.studentAvatar, { backgroundColor: itemStudent.avatarColor }]}>
                <Text style={styles.studentAvatarText}>{getInitials(itemStudent.name)}</Text>
              </View>
              <Text style={[styles.studentChipText, active && styles.studentChipTextActive]}>{itemStudent.name.split(" ")[0]}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.correctedSummary}>
        <View style={styles.circularScore}>
          <Text style={styles.circularScoreText}>{percentage}%</Text>
        </View>
        <View style={styles.correctedSummaryText}>
          <Text style={styles.correctedSummaryTitle}>Síntese da IA</Text>
          <Text style={styles.correctedSummaryBody}>{result.summary}</Text>
        </View>
      </View>

      {assessment.questions.map((question) => {
        const correction = result.questionCorrections.find((item) => item.questionId === question.id);
        if (!correction) {
          return null;
        }
        return <CorrectionCard key={question.id} question={question} correction={correction} />;
      })}

      <View style={styles.studyPlan}>
        <Text style={styles.sectionTitle}>Plano de estudo sugerido</Text>
        {result.recommendedPlan.map((item) => (
          <View key={item} style={styles.planItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#0F766E" />
            <Text style={styles.planText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function BottomTabs({ currentScreen, onNavigate }: { currentScreen: Screen; onNavigate: (screen: Screen) => void }) {
  return (
    <View style={styles.bottomTabs}>
      {tabs.map((tab) => {
        const active = currentScreen === tab.screen;
        return (
          <Pressable key={tab.screen} style={styles.tabButton} onPress={() => onNavigate(tab.screen)}>
            <Ionicons name={tab.icon} size={22} color={active ? "#0F766E" : "#94A3B8"} />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function MetricCard({ icon, label, value, tone }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string; tone: string }) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: `${tone}18` }]}>
        <Ionicons name={icon} size={20} color={tone} />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function AssessmentRow({
  assessment,
  isActive,
  onPress
}: {
  assessment: Assessment;
  isActive: boolean;
  onPress: () => void;
}) {
  const corrected = assessment.results.filter((result) => result.status === "corrigido").length;

  return (
    <Pressable onPress={onPress} style={[styles.assessmentRow, isActive && styles.assessmentRowActive]}>
      <View style={styles.assessmentIcon}>
        <Ionicons name="document-attach-outline" size={22} color="#0F766E" />
      </View>
      <View style={styles.assessmentInfo}>
        <Text style={styles.assessmentTitle}>{assessment.title}</Text>
        <Text style={styles.assessmentMeta}>{assessment.subject} · {formatDate(assessment.date)} · {corrected}/{assessment.results.length} corrigidas</Text>
        <ProgressBar value={assessment.correctionProgress} color="#0F766E" />
      </View>
      <View style={styles.assessmentAverage}>
        <Text style={styles.assessmentAverageValue}>{assessment.average.toFixed(1)}</Text>
        <Text style={styles.assessmentAverageLabel}>média</Text>
      </View>
    </Pressable>
  );
}

function ActionPanel({
  icon,
  title,
  body,
  onPress
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.actionPanel}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={22} color="#0F766E" />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionBody}>{body}</Text>
    </Pressable>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <View style={styles.skillBarCard}>
      <View style={styles.skillHeader}>
        <View>
          <Text style={styles.skillName}>{skill.name}</Text>
          <Text style={styles.skillArea}>{skill.area}</Text>
        </View>
        <Text style={styles.skillPercent}>{skill.mastery}%</Text>
      </View>
      <ProgressBar value={skill.mastery} color={skill.vulnerability > 40 ? "#F97316" : "#0F766E"} />
      <Text style={styles.skillInsight}>{skill.vulnerability}% de vulnerabilidade identificada nas últimas correções</Text>
    </View>
  );
}

function QuestionEditor({ question }: { question: Question }) {
  const [answer, setAnswer] = useState(question.correctAnswer);
  const [criteria, setCriteria] = useState(question.acceptanceCriteria.join("\n"));

  useEffect(() => {
    setAnswer(question.correctAnswer);
    setCriteria(question.acceptanceCriteria.join("\n"));
  }, [question]);

  return (
    <View style={styles.editorCard}>
      <View style={styles.editorHeader}>
        <View style={styles.questionNumberLarge}>
          <Text style={styles.questionNumberLargeText}>Q{question.number}</Text>
        </View>
        <View style={styles.editorTitleWrap}>
          <Text style={styles.editorTitle}>{question.statement}</Text>
          <Text style={styles.editorMeta}>{question.type} · {question.points} pontos</Text>
        </View>
      </View>

      <Text style={styles.inputLabel}>Resposta correta ou referência esperada</Text>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        multiline
        style={[styles.textInput, question.type === "discursiva" && styles.textAreaInput]}
        placeholder="Insira a resposta correta"
        placeholderTextColor="#94A3B8"
      />

      <Text style={styles.inputLabel}>Critérios de aceitação</Text>
      <TextInput
        value={criteria}
        onChangeText={setCriteria}
        multiline
        style={styles.textAreaInput}
        placeholder="Um critério por linha"
        placeholderTextColor="#94A3B8"
      />

      <View style={styles.skillTags}>
        {question.skillIds.map((skillId) => {
          const skill = skills.find((item) => item.id === skillId);
          if (!skill) {
            return null;
          }
          return (
            <View key={skill.id} style={styles.skillTag}>
              <Ionicons name="ribbon-outline" size={15} color="#0F766E" />
              <Text style={styles.skillTagText}>{skill.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function PipelineStep({
  icon,
  title,
  detail,
  active
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  detail: string;
  active: boolean;
}) {
  return (
    <View style={[styles.pipelineStep, active && styles.pipelineStepActive]}>
      <View style={[styles.pipelineIcon, active && styles.pipelineIconActive]}>
        <Ionicons name={icon} size={20} color={active ? "#FFFFFF" : "#94A3B8"} />
      </View>
      <View style={styles.pipelineText}>
        <Text style={[styles.pipelineTitle, active && styles.pipelineTitleActive]}>{title}</Text>
        <Text style={styles.pipelineDetail}>{detail}</Text>
      </View>
    </View>
  );
}

function CorrectionCard({
  question,
  correction
}: {
  question: Question;
  correction: StudentAssessmentResult["questionCorrections"][number];
}) {
  return (
    <View style={styles.correctionCard}>
      <View style={styles.correctionHeader}>
        <View style={styles.correctionQuestionBadge}>
          <Text style={styles.correctionQuestionText}>Q{question.number}</Text>
        </View>
        <View style={styles.correctionHeaderText}>
          <Text style={styles.correctionStatement}>{question.statement}</Text>
          <Text style={styles.correctionMeta}>{question.type} · confiança IA {correction.confidence}%</Text>
        </View>
        <Text style={styles.correctionScore}>{correction.score}/{correction.maxScore}</Text>
      </View>
      <View style={styles.answerBox}>
        <Text style={styles.answerLabel}>Resposta do aluno</Text>
        <Text style={styles.answerText}>{correction.answer}</Text>
      </View>
      <View style={styles.feedbackBox}>
        <Ionicons name={correction.isCorrect ? "sparkles-outline" : "alert-circle-outline"} size={20} color={correction.isCorrect ? "#0F766E" : "#F97316"} />
        <Text style={styles.feedbackText}>{correction.aiFeedback}</Text>
      </View>
      <View style={styles.handwritingBox}>
        <Ionicons name="pencil-outline" size={17} color="#64748B" />
        <Text style={styles.handwritingText}>{correction.handwritingSignal}</Text>
      </View>
    </View>
  );
}

function FeaturePill({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.featurePill}>
      <Ionicons name={icon} size={18} color="#0F766E" />
      <Text style={styles.featurePillText}>{label}</Text>
    </View>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${clampPercent(value)}%`, backgroundColor: color }]} />
    </View>
  );
}

function PrimaryButton({
  label,
  icon,
  onPress,
  disabled
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.primaryButton, disabled && styles.disabledButton]}>
      <Ionicons name={icon} size={20} color="#FFFFFF" />
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({
  label,
  icon,
  onPress,
  disabled
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.secondaryButton, disabled && styles.secondaryButtonDisabled]}>
      <Ionicons name={icon} size={20} color={disabled ? "#94A3B8" : "#0F766E"} />
      <Text style={[styles.secondaryButtonText, disabled && styles.secondaryButtonTextDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },
  appShell: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },
  content: {
    flex: 1
  },
  onboarding: {
    padding: 24,
    gap: 22,
    backgroundColor: "#F8FAFC"
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 8
  },
  logoMark: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F766E"
  },
  brandName: {
    fontSize: 25,
    fontWeight: "800",
    color: "#0F172A"
  },
  brandMantra: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F766E",
    marginTop: 2
  },
  heroPanel: {
    backgroundColor: "#0F172A",
    borderRadius: 8,
    padding: 18,
    gap: 18
  },
  heroMetric: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10
  },
  heroMetricValue: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900"
  },
  heroMetricLabel: {
    color: "#CBD5E1",
    fontSize: 14,
    flex: 1,
    marginBottom: 7
  },
  heroVisual: {
    alignItems: "center"
  },
  paperSheet: {
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 18,
    gap: 12
  },
  paperHeader: {
    height: 12,
    width: "55%",
    borderRadius: 4,
    backgroundColor: "#CBD5E1"
  },
  answerLineWide: {
    height: 8,
    width: "85%",
    borderRadius: 4,
    backgroundColor: "#E2E8F0"
  },
  answerLine: {
    height: 8,
    width: "64%",
    borderRadius: 4,
    backgroundColor: "#E2E8F0"
  },
  answerGrid: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 4
  },
  answerBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1"
  },
  answerBubbleActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E"
  },
  answerBubbleText: {
    color: "#64748B",
    fontWeight: "800"
  },
  answerBubbleTextActive: {
    color: "#FFFFFF"
  },
  aiNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ECFDF5",
    borderRadius: 8,
    padding: 10
  },
  aiNoteText: {
    color: "#0F766E",
    fontWeight: "700"
  },
  onboardingTitle: {
    fontSize: 31,
    lineHeight: 38,
    fontWeight: "900",
    color: "#0F172A"
  },
  onboardingBody: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569"
  },
  onboardingActions: {
    gap: 12
  },
  onboardingFeatureGrid: {
    gap: 10
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  featurePillText: {
    color: "#334155",
    fontWeight: "700"
  },
  topBar: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  topEyebrow: {
    color: "#0F766E",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0
  },
  topTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A"
  },
  classSelector: {
    gap: 8,
    paddingRight: 12
  },
  classChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  classChipActive: {
    backgroundColor: "#ECFDF5",
    borderColor: "#99F6E4"
  },
  classDot: {
    width: 9,
    height: 9,
    borderRadius: 5
  },
  classChipText: {
    color: "#64748B",
    fontWeight: "800"
  },
  classChipTextActive: {
    color: "#0F766E"
  },
  screenScroll: {
    padding: 18,
    paddingBottom: 110,
    gap: 16
  },
  dashboardHero: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14
  },
  dashboardHeroText: {
    flex: 1
  },
  sectionEyebrow: {
    color: "#0F766E",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0
  },
  dashboardTitle: {
    fontSize: 29,
    color: "#0F172A",
    fontWeight: "900",
    marginTop: 4
  },
  dashboardSubtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20
  },
  heroScoreCard: {
    width: 92,
    height: 92,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F766E"
  },
  heroScore: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900"
  },
  heroScoreLabel: {
    color: "#CCFBF1",
    fontSize: 12,
    fontWeight: "700"
  },
  metricRow: {
    flexDirection: "row",
    gap: 10
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 13,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minHeight: 116
  },
  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  metricValue: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 22
  },
  metricLabel: {
    color: "#64748B",
    fontWeight: "700",
    fontSize: 12,
    marginTop: 2
  },
  sectionHeader: {
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 19,
    color: "#0F172A",
    fontWeight: "900"
  },
  sectionSubtitle: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4
  },
  assessmentRow: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center"
  },
  assessmentRowActive: {
    borderColor: "#0F766E",
    backgroundColor: "#F0FDFA"
  },
  assessmentIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCFBF1"
  },
  assessmentInfo: {
    flex: 1,
    gap: 7
  },
  assessmentTitle: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 15
  },
  assessmentMeta: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 17
  },
  assessmentAverage: {
    alignItems: "center",
    minWidth: 46
  },
  assessmentAverageValue: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 20
  },
  assessmentAverageLabel: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "700"
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E2E8F0",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 4
  },
  actionGrid: {
    gap: 12
  },
  actionPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center"
  },
  actionTitle: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 16
  },
  actionBody: {
    color: "#64748B",
    lineHeight: 20
  },
  skillBoard: {
    gap: 12
  },
  skillBarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 10
  },
  skillHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  skillName: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 15
  },
  skillArea: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 2
  },
  skillPercent: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 18
  },
  skillInsight: {
    color: "#64748B",
    fontSize: 12
  },
  pageTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    alignItems: "flex-start"
  },
  pageTitle: {
    fontSize: 25,
    color: "#0F172A",
    fontWeight: "900",
    marginTop: 4
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0"
  },
  statusBadgeText: {
    color: "#0F766E",
    fontWeight: "800",
    fontSize: 12
  },
  questionTabs: {
    gap: 10,
    paddingRight: 12
  },
  questionTab: {
    width: 76,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  questionTabActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E"
  },
  questionTabText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0F172A"
  },
  questionTabTextActive: {
    color: "#FFFFFF"
  },
  questionTabKind: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 4
  },
  editorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12
  },
  editorHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start"
  },
  questionNumberLarge: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center"
  },
  questionNumberLargeText: {
    color: "#0F766E",
    fontWeight: "900"
  },
  editorTitleWrap: {
    flex: 1
  },
  editorTitle: {
    color: "#0F172A",
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900"
  },
  editorMeta: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 13
  },
  inputLabel: {
    color: "#334155",
    fontWeight: "900",
    fontSize: 13,
    marginTop: 4
  },
  textInput: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
    fontSize: 15
  },
  textAreaInput: {
    minHeight: 104,
    textAlignVertical: "top"
  },
  skillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  skillTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ECFDF5"
  },
  skillTagText: {
    color: "#0F766E",
    fontWeight: "800",
    fontSize: 12
  },
  criteriaSummary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12
  },
  criteriaRow: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0"
  },
  criteriaNumber: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9"
  },
  criteriaNumberText: {
    color: "#0F172A",
    fontWeight: "900"
  },
  criteriaContent: {
    flex: 1
  },
  criteriaTitle: {
    color: "#0F172A",
    fontWeight: "800",
    lineHeight: 20
  },
  criteriaMeta: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4
  },
  cameraFrame: {
    backgroundColor: "#020617",
    borderRadius: 8,
    padding: 16,
    gap: 16,
    minHeight: 520
  },
  cameraTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cameraPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1E293B",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444"
  },
  cameraPillText: {
    color: "#E2E8F0",
    fontWeight: "800",
    fontSize: 12
  },
  scanTarget: {
    flex: 1,
    minHeight: 340,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#0F172A"
  },
  cornerTopLeft: {
    position: "absolute",
    top: 24,
    left: 24,
    width: 44,
    height: 44,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#38BDF8"
  },
  cornerTopRight: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 44,
    height: 44,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#38BDF8"
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 24,
    left: 24,
    width: 44,
    height: 44,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#38BDF8"
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 44,
    height: 44,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#38BDF8"
  },
  examPreview: {
    width: "68%",
    minHeight: 250,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 18,
    gap: 12,
    transform: [{ rotate: "-2deg" }]
  },
  examPreviewHeader: {
    height: 14,
    width: "70%",
    backgroundColor: "#CBD5E1",
    borderRadius: 4
  },
  examPreviewLine: {
    height: 8,
    width: "92%",
    backgroundColor: "#E2E8F0",
    borderRadius: 4
  },
  examPreviewLineShort: {
    height: 8,
    width: "60%",
    backgroundColor: "#E2E8F0",
    borderRadius: 4
  },
  examPreviewOptions: {
    flexDirection: "row",
    gap: 8
  },
  examPreviewOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#94A3B8"
  },
  examPreviewTextBlock: {
    height: 54,
    backgroundColor: "#E2E8F0",
    borderRadius: 8
  },
  examPreviewTextBlockSmall: {
    height: 36,
    width: "80%",
    backgroundColor: "#E2E8F0",
    borderRadius: 8
  },
  cameraFooter: {
    minHeight: 70,
    justifyContent: "center"
  },
  cameraHint: {
    color: "#CBD5E1",
    textAlign: "center",
    fontWeight: "700",
    lineHeight: 20
  },
  processingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#082F49",
    borderRadius: 8,
    padding: 12
  },
  processingTitle: {
    color: "#E0F2FE",
    fontWeight: "900"
  },
  processingSubtitle: {
    color: "#BAE6FD",
    fontSize: 12,
    marginTop: 2
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#064E3B",
    borderRadius: 8,
    padding: 12
  },
  successTextBlock: {
    flex: 1
  },
  successTitle: {
    color: "#D1FAE5",
    fontWeight: "900"
  },
  successSubtitle: {
    color: "#A7F3D0",
    fontSize: 12,
    marginTop: 2
  },
  scannerActions: {
    gap: 10
  },
  pipeline: {
    gap: 10
  },
  pipelineStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF"
  },
  pipelineStepActive: {
    borderColor: "#99F6E4",
    backgroundColor: "#F0FDFA"
  },
  pipelineIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0"
  },
  pipelineIconActive: {
    backgroundColor: "#0F766E"
  },
  pipelineText: {
    flex: 1
  },
  pipelineTitle: {
    color: "#64748B",
    fontWeight: "900"
  },
  pipelineTitleActive: {
    color: "#0F172A"
  },
  pipelineDetail: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 3
  },
  gradeBadge: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#0F766E",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  gradeValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900"
  },
  gradeMax: {
    color: "#CCFBF1",
    fontWeight: "800",
    marginBottom: 4
  },
  studentSelector: {
    gap: 10,
    paddingRight: 12
  },
  studentChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  studentChipActive: {
    backgroundColor: "#F0FDFA",
    borderColor: "#0F766E"
  },
  studentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  studentAvatarText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 11
  },
  studentChipText: {
    color: "#64748B",
    fontWeight: "800"
  },
  studentChipTextActive: {
    color: "#0F766E"
  },
  correctedSummary: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  circularScore: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 8,
    borderColor: "#0F766E"
  },
  circularScoreText: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 17
  },
  correctedSummaryText: {
    flex: 1
  },
  correctedSummaryTitle: {
    color: "#0F172A",
    fontWeight: "900",
    fontSize: 17
  },
  correctedSummaryBody: {
    color: "#475569",
    lineHeight: 20,
    marginTop: 4
  },
  correctionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12
  },
  correctionHeader: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start"
  },
  correctionQuestionBadge: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9"
  },
  correctionQuestionText: {
    color: "#0F172A",
    fontWeight: "900"
  },
  correctionHeaderText: {
    flex: 1
  },
  correctionStatement: {
    color: "#0F172A",
    fontWeight: "900",
    lineHeight: 20
  },
  correctionMeta: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 3
  },
  correctionScore: {
    color: "#0F766E",
    fontWeight: "900",
    fontSize: 16
  },
  answerBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 12,
    gap: 4
  },
  answerLabel: {
    color: "#64748B",
    fontWeight: "900",
    fontSize: 12
  },
  answerText: {
    color: "#0F172A",
    lineHeight: 20
  },
  feedbackBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#ECFDF5",
    borderRadius: 8,
    padding: 12
  },
  feedbackText: {
    flex: 1,
    color: "#134E4A",
    lineHeight: 20,
    fontWeight: "600"
  },
  handwritingBox: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  handwritingText: {
    color: "#64748B",
    fontSize: 12,
    flex: 1
  },
  studyPlan: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12
  },
  planItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  planText: {
    color: "#334155",
    flex: 1,
    lineHeight: 20,
    fontWeight: "700"
  },
  bottomTabs: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
    paddingBottom: 12
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minHeight: 54
  },
  tabLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "800"
  },
  tabLabelActive: {
    color: "#0F766E"
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: "#0F766E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15
  },
  secondaryButton: {
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#99F6E4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 16
  },
  secondaryButtonText: {
    color: "#0F766E",
    fontWeight: "900",
    fontSize: 15
  },
  disabledButton: {
    backgroundColor: "#94A3B8"
  },
  secondaryButtonDisabled: {
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC"
  },
  secondaryButtonTextDisabled: {
    color: "#94A3B8"
  }
});
