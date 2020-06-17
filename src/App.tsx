import React, { useEffect, useState } from "react";
import "./App.css";
import ChatPanel, {
  ChatPanelProps,
  MessageProp,
} from "./components/PilotChat/ChatPanel";
// import { dumpData } from "./firebase/dump";
import {
  fetchMessages,
  createMessage,
  subscribeChat,
} from "./firebase/models/messages";
import { getChat, IChat } from "./firebase/models/chats";

const chatID = process.env.REACT_APP_CHAT_ID || ""; // pre-defined a conversation

function App(): React.ReactElement {
  const [{ messages, user, members }, setChatState] = useState<{
    messages: ChatPanelProps["messages"];
    user: string;
    members: IChat["members"];
  }>({ messages: [], user: "", members: {} });
  const users = Object.keys(members || {});

  useEffect(() => {
    // if (!chatID) {
    //   dumpData();
    // } else {
    // fetching
    subscribeChat(chatID, (messages) => {
      setChatState((prev) => ({ ...prev, messages }));
    });
    getChat(chatID).then(({ members }) => {
      setChatState((prev) => ({
        ...prev,
        members,
        user: Object.keys(members || {})[0],
      }));
    });
    fetchMessages(chatID).then((msgs) => {
      const messagesProp: ChatPanelProps["messages"] = msgs.map(
        ({ message, sender, recipient, timestamp }) => ({
          message,
          sender,
          recipient,
          timestamp,
        })
      );
      setChatState((prev) => ({ ...prev, messages: messagesProp }));
    });
    // }
  }, []);

  return (
    <div className="App">
      <h1>Pilot Test Component</h1>
      <select
        value={user}
        onChange={(e) => {
          setChatState((prev) => ({
            ...prev,
            user: e.target?.value,
          }));
        }}
      >
        {Object.keys(members || {}).map((name) => {
          return (
            <option key={name} value={name}>
              {name}
            </option>
          );
        })}
      </select>

      <ChatPanel
        owner={user}
        messages={messages}
        sendMessage={(message) => {
          const newMessage: MessageProp = {
            sender: user,
            recipient: users.filter((usr) => usr !== user)[0],
            message: message,
            timestamp: Date.now().toString(),
          };
          createMessage(chatID, newMessage);
        }}
      />
    </div>
  );
}

export default App;
