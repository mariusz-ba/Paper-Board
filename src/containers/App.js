import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo, removeTodo } from 'actions/cardsActions';
import { createCard, updateCard, deleteCard } from 'actions/cardsActions';
import { createTodo, updateTodo, deleteTodo, deleteTodos } from 'actions/todosActions';

import Card from '../models/Card';
import Todo from '../models/Todo';

class App extends Component {
  state = {
    cardName: '',
    todoName: ''
  }

  changeCardName = e => { this.setState({ cardName: e.target.value }) };
  changeTodoName = e => { this.setState({ todoName: e.target.value }) };

  createCard = e => {
    this.props.createCard(new Card(this.state.cardName));
    this.setState({ cardName: '' });
  }

  createTodo = cardId => {
    const todo = new Todo(this.state.todoName);
    this.props.createTodo(todo);
    this.props.addTodo(cardId, todo.id);
    this.setState({ todoName: '' });
  }

  deleteCard = id => {
    // Delete todos associated with this card
    this.props.deleteTodos(this.props.cards.items[id].todos);
    this.props.deleteCard(id);
  }

  deleteTodo = (cardId, todoId) => {
    this.props.removeTodo(cardId, todoId);
    this.props.deleteTodo(todoId);
  }

  render() {
    const { cardName, todoName } = this.state;
    const { cards, todos } = this.props;

    return (
      <div>
        <div>
          <h1>Cards</h1>
          <input type="text" placeholder="card name" value={cardName} onChange={this.changeCardName}/>
          <button onClick={this.createCard}>Create card</button>
          <ul>
            {
              Object.values(cards.items).map(card => (
                <li key={card.id}>
                  <h2>
                    {card.name}
                    <button onClick={() => this.deleteCard(card.id)}>Delete</button>
                  </h2>
                  <input type="text" placeholder="todo name" value={todoName} onChange={this.changeTodoName}/>
                  <button onClick={() => this.createTodo(card.id)}>Create todo</button>
                  <ul>
                    {
                      card.todos.map(id => {
                        const todo = todos.items[id];
                        return (
                          <li key={todo.id}>
                            {todo.content}
                            <button onClick={() => this.deleteTodo(card.id, todo.id)}>Delete</button>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = 
  ({ cards, todos }) => 
  ({ cards, todos });

export default connect(
  mapStateToProps, 
  { 
    addTodo, removeTodo,
    createCard, updateCard, deleteCard,
    createTodo, updateTodo, deleteTodo, deleteTodos
  }
)(App);