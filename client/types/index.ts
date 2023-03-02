export interface Id {
  id: number;
}

export interface NewUser {
  username: string;
  email: string;
  name: string;
  token?: string;
}

export type User = Id & NewUser;
