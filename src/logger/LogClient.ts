import { LOG_LEVEL } from "./../config/index";
import { ConsoleLogger } from "./ConsoleLogger";

export const LogClient = new ConsoleLogger({ level: LOG_LEVEL });
