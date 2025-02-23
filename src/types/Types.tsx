export interface TodoInitialState {
  todos: TodoType[]
}

export interface TodoType {
  id: string
  content: string
  completed?: boolean
}

export interface User {
  name: string;
  email: string;
  picture: string;
}
