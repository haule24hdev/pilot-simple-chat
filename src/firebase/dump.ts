import { createChat } from "./models/chats";
import { createMessage } from "./models/messages";

export const dumpData = async () => {
  createChat({ members: { user01: true, user02: true } }).then((chat) => {
    createMessage(chat.id || "", {
      sender: "user01",
      message: "Sample message",
      recipient: 'user02',
      timestamp: Date.now().toString()
    });
  });
};
