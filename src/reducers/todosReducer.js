import * as TYPES from 'actions/constants/todosConstants';
import { omit } from 'lodash';

const initial_state = {
  items: {}
}

export default function reducer(state = initial_state, action) {
  switch(action.type) {
    case TYPES.CREATE_TODO: {
      // action.payload = todo
      state = { ...state, items: { ...state.items, [action.payload.id]: action.payload }};
      break;
    }
    case TYPES.UPDATE_TODO: {
      // action.payload = todo
      state = { ...state, items: { ...state.items, [action.payload.id]: action.payload }};
      break;
    }
    case TYPES.DELETE_TODO: {
      // action.payload = todo id
      state = { ...state, items: omit(state.items, action.payload) };
      break;
    }
    case TYPES.DELETE_TODOS: {
      // action.payload = [todo id]
      state = { ...state, items: omit(state.items, action.payload) };
      break;
    }
  }
  return state;
}