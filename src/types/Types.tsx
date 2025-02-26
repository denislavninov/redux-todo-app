export interface TodoInitialState {
  todos: TodoType[]
}

export interface TodoType {
  id: string;
  firebaseId: string;
  content: string;
  completed: boolean;
  userId: string;
  updatedAt?: string | null;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}
