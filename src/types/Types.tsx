export interface TodoInitialState {
  todos: TodoType[]
}

export interface TodoType {
  id: number | string
  content: string
}

export interface User {
  name: string;
  email: string;
  picture: string;
}
