import { LogLevel } from "../application/logger/ConsoleLogger";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

// Logging configurations
export type Environment = "development" | "production" | "staging";

export const APP_ENV: Environment =
  process.env.REACT_APP_APP_ENV === "production"
    ? "production"
    : process.env.REACT_APP_APP_ENV === "development"
    ? "development"
    : "staging";

export const LOG_LEVEL: LogLevel = APP_ENV === "production" ? "warn" : "log";
