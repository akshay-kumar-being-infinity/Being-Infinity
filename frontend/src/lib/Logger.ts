type LogLevel = "info" | "warn" | "error" | "debug";

const isDev = import.meta.env.DEV || true;

const icons: Record<LogLevel, string> = {
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
  debug: "🐛"
};

const log = (
  level: LogLevel,
  message: string,
  data?: unknown
) => {
  // Do not spam prod console
  if (!isDev && level === "debug") return;

  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data
  };

  console[level](`${icons[level]} ${message}`, payload);
};

export const logger = {
  info: (message: string, data?: unknown) =>
    log("info", message, data),

  warn: (message: string, data?: unknown) =>
    log("warn", message, data),

  error: (message: string, data?: unknown) =>
    log("error", message, data),

  debug: (message: string, data?: unknown) =>
    log("debug", message, data)
};
