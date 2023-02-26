import { _Message } from "./API"

interface Message extends _Message {
  status: "PENDING" | "OK" | "ERROR"
}