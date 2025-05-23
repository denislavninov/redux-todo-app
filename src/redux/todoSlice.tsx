import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TodoInitialState, TodoType } from '../types/Types'

const initialState: TodoInitialState = {
  todos: []
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state: TodoInitialState, action: PayloadAction<TodoType>) => {
      state.todos = [...state.todos, action.payload]
    },
    removeTodoById: (state: TodoInitialState, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo: TodoType) => todo.firebaseId !== action.payload)
    },
    updateTodo: (state: TodoInitialState, action: PayloadAction<TodoType>) => {
      state.todos = state.todos.map((todo: TodoType) => {
        if (todo.firebaseId !== action.payload.firebaseId) {
          return todo;
        } else {
          return action.payload;
        }
      });
    },
    setTodos: (state: TodoInitialState, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
    }
  }
})

export const { createTodo, removeTodoById, updateTodo, setTodos } = todoSlice.actions

export default todoSlice.reducer