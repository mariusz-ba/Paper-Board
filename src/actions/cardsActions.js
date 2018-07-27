import * as TYPES from './constants/cardsConstants';

export const loadCards = (state) => ({
  type: TYPES.LOAD_CARDS,
  payload: state
})

export const createCard = (card) => ({
  type: TYPES.CREATE_CARD,
  payload: card
})

export const updateCard = (card) => ({
  type: TYPES.UPDATE_CARD,
  payload: card
})

export const deleteCard = (cardId) => ({
  type: TYPES.DELETE_CARD,
  payload: cardId
})

export const addTodo = (cardId, todoId) => ({
  type: TYPES.ADD_TODO,
  payload: {cardId, todoId}
})

export const removeTodo = (cardId, todoId) => ({
  type: TYPES.REMOVE_TODO,
  payload: {cardId, todoId}
})