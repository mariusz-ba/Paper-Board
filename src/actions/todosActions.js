import * as TYPES from './constants/todosConstants';

export const loadTodos = (state) => ({
  type: TYPES.LOAD_TODOS,
  payload: state
})

export const createTodo = (todo) => ({
  type: TYPES.CREATE_TODO,
  payload: todo
})

export const updateTodo = (todo) => ({
  type: TYPES.UPDATE_TODO,
  payload: todo
})

export const deleteTodo = (todoId) => ({
  type: TYPES.DELETE_TODO,
  payload: todoId
})

export const deleteTodos = (todos) => ({
  type: TYPES.DELETE_TODOS,
  payload: todos
})