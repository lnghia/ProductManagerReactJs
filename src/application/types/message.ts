export interface Message {
  content: string;
  type: "error" | "info" | "warning" | "success";
}
