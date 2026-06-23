import { createContext, createElement, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "dark" | "light";

export type Theme = {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    surfaceRaised: string;
    surfaceSoft: string;
    border: string;
    text: string;
    textMuted: string;
    textSoft: string;
    primary: string;
    primarySoft: string;
    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    danger: string;
    dangerSoft: string;
    overlay: string;
    shadow: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  typography: {
    caption: number;
    body: number;
    title: number;
    hero: number;
  };
  elevation: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
};

type ThemeContextValue = {
  mode: ThemeMode;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const preferenceKey = "eduvision-theme-mode";

const baseTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 18,
    pill: 999
  },
  typography: {
    caption: 12,
    body: 14,
    title: 21,
    hero: 30
  }
};

export const themes: Record<ThemeMode, Theme> = {
  dark: {
    mode: "dark",
    colors: {
      background: "#0F1117",
      surface: "#171923",
      surfaceRaised: "#1E2230",
      surfaceSoft: "#23283A",
      border: "#2B3245",
      text: "#FFFFFF",
      textMuted: "#AAB2C8",
      textSoft: "#778097",
      primary: "#4DA3FF",
      primarySoft: "rgba(77, 163, 255, 0.16)",
      success: "#4ADE80",
      successSoft: "rgba(74, 222, 128, 0.14)",
      warning: "#FBBF24",
      warningSoft: "rgba(251, 191, 36, 0.14)",
      danger: "#FB7185",
      dangerSoft: "rgba(251, 113, 133, 0.14)",
      overlay: "rgba(3, 7, 18, 0.72)",
      shadow: "#000000"
    },
    ...baseTokens,
    elevation: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.26,
      shadowRadius: 24,
      elevation: 6
    }
  },
  light: {
    mode: "light",
    colors: {
      background: "#F6F8FC",
      surface: "#FFFFFF",
      surfaceRaised: "#FFFFFF",
      surfaceSoft: "#EEF4FF",
      border: "#DCE4F2",
      text: "#101827",
      textMuted: "#526079",
      textSoft: "#8A94A8",
      primary: "#2563EB",
      primarySoft: "#DBEAFE",
      success: "#0F766E",
      successSoft: "#CCFBF1",
      warning: "#D97706",
      warningSoft: "#FEF3C7",
      danger: "#DC2626",
      dangerSoft: "#FEE2E2",
      overlay: "rgba(15, 23, 42, 0.28)",
      shadow: "#0F172A"
    },
    ...baseTokens,
    elevation: {
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 22,
      elevation: 4
    }
  }
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readStoredMode(): ThemeMode | null {
  try {
    const storage = (globalThis as { localStorage?: Storage }).localStorage;
    const value = storage?.getItem(preferenceKey);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function writeStoredMode(mode: ThemeMode) {
  try {
    const storage = (globalThis as { localStorage?: Storage }).localStorage;
    storage?.setItem(preferenceKey, mode);
  } catch {
    // Preference persistence is best-effort when localStorage is unavailable.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    const storedMode = readStoredMode();
    if (storedMode) {
      setModeState(storedMode);
    }
  }, []);

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
    writeStoredMode(nextMode);
  };

  const value = useMemo(
    () => ({
      mode,
      theme: themes[mode],
      setMode,
      toggleMode: () => setMode(mode === "dark" ? "light" : "dark")
    }),
    [mode]
  );

  return createContextElement(value, children);
}

function createContextElement(value: ThemeContextValue, children: ReactNode) {
  return createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return value;
}
