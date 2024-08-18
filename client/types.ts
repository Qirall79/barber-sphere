interface IUser {
  uid: string;
  email: string;
  name: string;
  picture: string;
  complete: boolean;
  type: string;
}

interface ISession {
  user: IUser;
}
