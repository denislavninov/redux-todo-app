export interface TodoInitialState {
  todos: TodoType[]
}

export interface TodoType {
  id: number
  content: string
  key?: string
}

export interface User {
  name: string;
  email: string;
  picture: string;
}
