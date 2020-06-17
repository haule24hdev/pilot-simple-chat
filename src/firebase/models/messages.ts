import firestore from "../firestore";

export interface IMessage {
  id: string | undefined;
  sender: string;
  message: string;
  recipient: string;
  timestamp: string;
}
export type ChatCreateData = Omit<IMessage, "id">;

export const createMessage = (
  chatID: string,
  data: ChatCreateData
): Promise<void> => {
  const messageRef = firestore.collection("messages");
  return messageRef
    .doc(chatID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return messageRef.doc(chatID).update({ [data.timestamp]: data });
      }
      return messageRef.doc(chatID).set({ [data.timestamp]: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchMessages = (chatID: string): Promise<IMessage[]> => {
  return firestore
    .collection("messages")
    .doc(chatID)
    .get()
    .then((snapShot) => {
      const data = snapShot.data() || {};
      const ids = Object.keys(data);
      return ids.map((id) => {
        return {
          id,
          ...((data[id] || {}) as IMessage),
        };
      });
    });
};

export const subscribeChat = (
  chatID: string,
  onChange: (messgae: IMessage[]) => void
) => {
  firestore
    .collection("messages")
    .doc(chatID)
    .onSnapshot(
      {
        includeMetadataChanges: true,
      },
      function (doc) {
        const data = doc.data();
        onChange(Object.values(data || {}));
      }
    );
};
