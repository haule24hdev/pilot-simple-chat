import React, { useMemo } from "react";
import {
  ThemeProvider,
  FixedWrapper,
  TitleBar,
  Row,
  TextComposer,
  Fill,
  TextInput,
  Fit,
  SendButton,
  Message,
  MessageGroup,
  MessageList,
  MessageText
} from "@livechat/ui-kit";
import { last, sortBy } from "lodash";
import moment from "moment";

export type MessageProp = {
  timestamp: string;
  sender: string;
  recipient: string;
  message: string;
};

export interface ChatPanelProps {
  owner: string;
  messages: MessageProp[];
  sendMessage: (message: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  sendMessage,
  messages,
  owner,
}: ChatPanelProps) => {
  const groupMessages: Array<Array<MessageProp>> = useMemo(() => {
    const group: Array<Array<MessageProp>> = [];
    const sortedMessages = sortBy(messages, ["timestamp"], ["asc"]);
    sortedMessages.forEach((message) => {
      if (group.length === 0) {
        group.push([message]);
        return;
      } else {
        const lastMessage = last(last(group));
        if (lastMessage?.sender === message.sender) {
          return last(group)?.push(message);
        }
        return group.push([message]);
      }
    });

    return group;
  }, [messages]);

  return (
    <ThemeProvider
      key={owner}
      theme={{
        FixedWrapperMaximized: {
          css: {
            boxShadow: "0 0 1em rgba(0, 0, 0, 0.1)",
          },
        },
      }}
    >
      <div style={{}}>
        <FixedWrapper.Root maximizedOnInit>
          <FixedWrapper.Maximized>
            <TitleBar title={owner} />
            <div style={{ maxWidth: "100%", height: 400 }}>
              <MessageList active>
                {groupMessages.map((messages, index) => {
                  return (
                    <MessageGroup onlyFirstWithMeta key={index}>
                      {messages.map((msg) => {
                        return (
                          <Message
                            authorName={msg.sender}
                            isOwn={owner === msg.sender}
                            key={msg.timestamp}
                            date={moment(Number(msg.timestamp)).format("HH:ss")}
                          >
                            <MessageText>{msg.message}</MessageText>
                          </Message>
                        );
                      })}
                    </MessageGroup>
                  );
                })}
              </MessageList>
            </div>
            <TextComposer onSend={sendMessage}>
              <Row align="center">
                <Fill>
                  <TextInput />
                </Fill>
                <Fit>
                  <SendButton />
                </Fit>
              </Row>
            </TextComposer>
          </FixedWrapper.Maximized>
        </FixedWrapper.Root>
      </div>
    </ThemeProvider>
  );
};

export default ChatPanel;
