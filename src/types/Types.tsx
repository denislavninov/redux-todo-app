export interface TodoInitialState {
  todos: TodoType[]
}

export interface TodoType {
  id: number;
  content: string;
  completed: boolean;
  userId: string;
  firebaseId?: string;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}
