import { RawMessage, MessageType } from "../src/SuperChat";
type CommandHandler = (message: RawMessage) => void;

declare global {
  declare var bliveproxy: {
    addCommandHandler: (cmd: MessageType, handler: CommandHandler) => void;
    removeCommandHandler: (cmd: MessageType, handler: CommandHandler) => void;
    _commandHandlers: {
      [propName: MessageType]: CommandHandler[];
    };
  };
}
