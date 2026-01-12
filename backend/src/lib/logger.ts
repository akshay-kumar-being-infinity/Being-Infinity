import pino from "pino";

const isProd = process.env.NODE_ENV === "production";

const baseLogger = pino({
  level: isProd ? "info" : "debug",
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname"
        }
      }
    : undefined
});

// Emoji icons for each level
const icons: Record<string, string> = {
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
  debug: "🐛"
};

export const logger = {
  info: (message: string, data?: unknown, tag?: string) =>
    baseLogger.info(data ?? {}, `${icons.info}${tag ? `[${tag}] ` : " "} ${message}`),

  warn: (message: string, data?: unknown, tag?: string) =>
    baseLogger.warn(data ?? {}, `${icons.warn}${tag ? `[${tag}] ` : " "} ${message}`),

  error: (message: string, data?: unknown, tag?: string) =>
    baseLogger.error(data ?? {}, `${icons.error}${tag ? `[${tag}] ` : " "} ${message}`),

  debug: (message: string, data?: unknown, tag?: string) =>
    baseLogger.debug(data ?? {}, `${icons.debug}${tag ? `[${tag}] ` : " "} ${message}`)
};
