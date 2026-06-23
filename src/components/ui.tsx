import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";
import { Theme, useTheme } from "../theme";

type IconName = keyof typeof Ionicons.glyphMap;

function softHaptic() {
  try {
    const navigatorLike = globalThis.navigator as { vibrate?: (pattern: number | number[]) => boolean } | undefined;
    navigatorLike?.vibrate?.(8);
  } catch {
    // Haptics are optional and best-effort in this prototype.
  }
}

export function Card({
  children,
  elevated = false,
  style
}: {
  children: ReactNode;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <View style={[styles.card, elevated && styles.elevatedCard, style]}>{children}</View>;
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  action
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionText}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
        </View>
        {action}
      </View>
      {children}
    </View>
  );
}

export function PrimaryButton({
  label,
  icon,
  onPress,
  disabled = false
}: {
  label: string;
  icon?: IconName;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      onPress={() => {
        softHaptic();
        onPress();
      }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressed
      ]}
    >
      {icon ? <Ionicons name={icon} size={19} color={theme.colors.background} /> : null}
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  icon,
  onPress,
  disabled = false
}: {
  label: string;
  icon?: IconName;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      onPress={() => {
        softHaptic();
        onPress();
      }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.secondaryButton,
        disabled && styles.secondaryButtonDisabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      {icon ? <Ionicons name={icon} size={19} color={disabled ? theme.colors.textSoft : theme.colors.primary} /> : null}
      <Text style={[styles.secondaryButtonText, disabled && styles.secondaryButtonTextDisabled]}>{label}</Text>
    </Pressable>
  );
}

export function Badge({
  label,
  icon,
  tone = "primary"
}: {
  label: string;
  icon?: IconName;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const palette = {
    primary: { color: theme.colors.primary, backgroundColor: theme.colors.primarySoft },
    success: { color: theme.colors.success, backgroundColor: theme.colors.successSoft },
    warning: { color: theme.colors.warning, backgroundColor: theme.colors.warningSoft },
    danger: { color: theme.colors.danger, backgroundColor: theme.colors.dangerSoft }
  }[tone];

  return (
    <View style={[styles.badge, { backgroundColor: palette.backgroundColor }]}>
      {icon ? <Ionicons name={icon} size={13} color={palette.color} /> : null}
      <Text style={[styles.badgeText, { color: palette.color }]}>{label}</Text>
    </View>
  );
}

export function StatCard({
  label,
  value,
  icon,
  tone = "primary"
}: {
  label: string;
  value: string;
  icon: IconName;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const palette = {
    primary: { color: theme.colors.primary, backgroundColor: theme.colors.primarySoft },
    success: { color: theme.colors.success, backgroundColor: theme.colors.successSoft },
    warning: { color: theme.colors.warning, backgroundColor: theme.colors.warningSoft },
    danger: { color: theme.colors.danger, backgroundColor: theme.colors.dangerSoft }
  }[tone];

  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: palette.backgroundColor }]}>
        <Ionicons name={icon} size={18} color={palette.color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function InfoRow({
  icon,
  title,
  subtitle,
  right,
  onPress
}: {
  icon?: IconName;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onPress?: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const content = (
    <>
      {icon ? (
        <View style={styles.infoIcon}>
          <Ionicons name={icon} size={18} color={theme.colors.primary} />
        </View>
      ) : null}
      <View style={styles.infoText}>
        <Text style={styles.infoTitle}>{title}</Text>
        {subtitle ? <Text style={styles.infoSubtitle}>{subtitle}</Text> : null}
      </View>
      {right ?? (onPress ? <Ionicons name="chevron-forward-outline" size={19} color={theme.colors.textSoft} /> : null)}
    </>
  );

  if (!onPress) {
    return <View style={styles.infoRow}>{content}</View>;
  }

  return (
    <Pressable
      onPress={() => {
        softHaptic();
        onPress();
      }}
      style={({ pressed }: { pressed: boolean }) => [
        styles.infoRow,
        pressed && styles.pressed
      ]}
    >
      {content}
    </Pressable>
  );
}

export function ProgressStepper({ steps, currentIndex }: { steps: string[]; currentIndex: number }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>
        Passo {currentIndex + 1} de {steps.length}: {steps[currentIndex]}
      </Text>
      <View style={styles.stepperTrack}>
        {steps.map((step, index) => (
          <View
            key={step}
            style={[
              styles.stepperDot,
              index <= currentIndex && styles.stepperDotActive,
              index < steps.length - 1 && styles.stepperConnector
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action
}: {
  icon: IconName;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Card style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Ionicons name={icon} size={23} color={theme.colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      {action}
    </Card>
  );
}

export function LoadingState({ title, body }: { title: string; body: string }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true
      })
    );
    animation.start();
    return () => animation.stop();
  }, [spin]);

  const rotation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <Card elevated style={styles.loadingCard}>
      <Animated.View style={[styles.loadingIcon, { transform: [{ rotate: rotation }] }]}>
        <Ionicons name="sparkles-outline" size={26} color={theme.colors.background} />
      </Animated.View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      <Skeleton width="100%" height={10} />
      <Skeleton width="76%" height={10} />
    </Card>
  );
}

export function Skeleton({ width, height }: { width: number | `${number}%`; height: number }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.85, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 700, useNativeDriver: true })
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return <Animated.View style={[styles.skeleton, { width, height, opacity }]} />;
}

export function BottomSheet({
  visible,
  title,
  children,
  onClose
}: {
  visible: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.sheetOverlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>{title}</Text>
          <Pressable onPress={onClose} style={styles.sheetClose}>
            <Ionicons name="close-outline" size={20} color={theme.colors.text} />
          </Pressable>
        </View>
        {children}
      </View>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.lg
    },
    elevatedCard: {
      ...theme.elevation
    },
    section: {
      gap: theme.spacing.md
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: theme.spacing.md
    },
    sectionText: {
      flex: 1
    },
    eyebrow: {
      color: theme.colors.primary,
      fontSize: theme.typography.caption,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.title,
      lineHeight: 27,
      fontWeight: "900",
      marginTop: theme.spacing.xs
    },
    sectionSubtitle: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      lineHeight: 20,
      marginTop: theme.spacing.xs
    },
    primaryButton: {
      minHeight: 52,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.primary
    },
    primaryButtonText: {
      color: theme.colors.background,
      fontSize: 15,
      fontWeight: "900"
    },
    secondaryButton: {
      minHeight: 52,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      borderColor: theme.colors.border,
      borderWidth: 1,
      backgroundColor: theme.colors.surfaceRaised
    },
    secondaryButtonText: {
      color: theme.colors.primary,
      fontSize: 15,
      fontWeight: "900"
    },
    disabledButton: {
      backgroundColor: theme.colors.surfaceSoft
    },
    secondaryButtonDisabled: {
      opacity: 0.5
    },
    secondaryButtonTextDisabled: {
      color: theme.colors.textSoft
    },
    pressed: {
      opacity: 0.78,
      transform: [{ scale: 0.99 }]
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: theme.radius.pill
    },
    badgeText: {
      fontSize: 11,
      fontWeight: "900"
    },
    statCard: {
      flex: 1,
      minHeight: 116,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md
    },
    statIcon: {
      width: 34,
      height: 34,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing.sm
    },
    statValue: {
      color: theme.colors.text,
      fontSize: 23,
      fontWeight: "900"
    },
    statLabel: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      fontWeight: "800",
      marginTop: 2
    },
    infoRow: {
      minHeight: 70,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      paddingVertical: theme.spacing.sm
    },
    infoIcon: {
      width: 38,
      height: 38,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primarySoft
    },
    infoText: {
      flex: 1
    },
    infoTitle: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "900",
      lineHeight: 20
    },
    infoSubtitle: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      lineHeight: 17,
      marginTop: 2
    },
    stepper: {
      gap: theme.spacing.sm
    },
    stepperLabel: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      fontWeight: "900"
    },
    stepperTrack: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6
    },
    stepperDot: {
      flex: 1,
      height: 5,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.surfaceSoft
    },
    stepperConnector: {},
    stepperDotActive: {
      backgroundColor: theme.colors.primary
    },
    emptyState: {
      alignItems: "center",
      gap: theme.spacing.sm
    },
    emptyIcon: {
      width: 46,
      height: 46,
      borderRadius: theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primarySoft
    },
    emptyTitle: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "900",
      textAlign: "center"
    },
    emptyBody: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      lineHeight: 20,
      textAlign: "center"
    },
    loadingCard: {
      alignItems: "center",
      gap: theme.spacing.md
    },
    loadingIcon: {
      width: 58,
      height: 58,
      borderRadius: 29,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary
    },
    skeleton: {
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.surfaceSoft
    },
    sheetOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
      backgroundColor: theme.colors.overlay,
      zIndex: 20
    },
    bottomSheet: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderColor: theme.colors.border,
      borderWidth: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md
    },
    sheetHandle: {
      alignSelf: "center",
      width: 44,
      height: 5,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.surfaceSoft
    },
    sheetHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    sheetTitle: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "900"
    },
    sheetClose: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surfaceSoft
    }
  });
}
