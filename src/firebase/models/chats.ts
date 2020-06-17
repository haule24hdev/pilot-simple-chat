import firestore from "../firestore";

export interface IChat {
  id: string | undefined;
  title?: string;
  members?: {
    [key: string]: boolean;
  };
}

export type ChatCreateData = Omit<IChat, "id">;

export const createChat = (data: ChatCreateData): Promise<IChat> => {
  return firestore
    .collection("chats")
    .add(data)
    .then((docRef) => {
      return {
        id: docRef.id,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        id: undefined,
      };
    });
};

export const getChat = (id: string): Promise<IChat> => {
  return firestore
    .collection("chats")
    .doc(id)
    .get()
    .then((snapShot) => {
      return {
        id,
        ...(snapShot.data() || {}),
      };
    });
};
