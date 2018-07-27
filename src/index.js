import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { load } from 'utils/storage';
import { loadCards } from 'actions/cardsActions';
import { loadTodos } from 'actions/todosActions';

const cards = load('cards');
const todos = load('todos');

if(cards) store.dispatch(loadCards(cards));
if(todos) store.dispatch(loadTodos(todos));

import App from 'containers/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);