import * as TYPES from 'actions/constants/cardsConstants';
import { omit } from 'lodash';

const initial_state = {
  items: {}
}

export default function reducer(state = initial_state, action) {
  switch(action.type) {
    case TYPES.CREATE_CARD: {
      // action.payload = card
      state = { ...state, items: { ...state.items, [action.payload.id]: action.payload }};
      break;
    }
    case TYPES.UPDATE_CARD: {
      // action.payload = card
      state = { ...state, items: { ...state.items, [action.payload.id]: action.payload }};
      break;
    }
    case TYPES.DELETE_CARD: {
      // action.payload = card id
      state = { ...state, items: omit(state.items, action.payload) };
      break;
    }
    case TYPES.ADD_TODO: {
      // action.payload = {cardId, todoId}
      const { cardId, todoId } = action.payload;

      state = { 
        ...state, 
        items: { 
          ...state.items,
          [cardId]: { 
            ...state.items[cardId],
            todos: [
              ...state.items[cardId].todos,
              todoId
            ]
          }
        }
      }
      break;
    }
    case TYPES.REMOVE_TODO: {
      // action.payload = {cardId, todoId}
      const { cardId, todoId } = action.payload;

      const index = state.items[cardId].todos.indexOf(todoId);
      state = { 
        ...state, 
        items: { 
          ...state.items,
          [cardId]: { 
            ...state.items[cardId],
            todos: [
              ...state.items[cardId].todos.slice(0, index),
              ...state.items[cardId].todos.slice(index + 1)
            ]
          }
        }
      }
      break;
    }
  }
  return state;
}