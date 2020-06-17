import firestore from "../firestore";

export interface IUser {
  id: string | undefined;
  name: string;
}
export type UserCreateData = Omit<IUser, "id">;

export const createUser = (data: UserCreateData): Promise<IUser | null> => {
  return firestore
    .collection("users")
    .add(data)
    .then((docRef) => {
      return {
        id: docRef.id,
        name: data.name,
      };
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const dumpUsers = (users: UserCreateData[] ) => {
  return Promise.all(users.map((user) => createUser(user))).then(
    (users) => users
  );
};
