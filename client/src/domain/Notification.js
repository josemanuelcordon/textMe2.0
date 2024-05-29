import { v4 as uuidv4 } from "uuid";

export function Notification(message, type) {
  this.id = uuidv4();
  this.message = message;
  this.type = type;
}
