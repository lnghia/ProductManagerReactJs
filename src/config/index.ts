import { LogLevel } from "../application/logger/ConsoleLogger";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export const LOG_LEVEL: LogLevel =
  process.env.REACT_APP_NODE_ENV === "production" ? "warn" : "log";
