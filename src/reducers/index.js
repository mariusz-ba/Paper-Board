import { combineReducers } from 'redux';

import cardsReducer from './cardsReducer';
import todosReducer from './todosReducer';

export default combineReducers({
  cards: cardsReducer,
  todos: todosReducer
});