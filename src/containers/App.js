import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo, removeTodo } from 'actions/cardsActions';
import { createCard, updateCard, deleteCard } from 'actions/cardsActions';
import { createTodo, updateTodo, deleteTodo, deleteTodos } from 'actions/todosActions';

import Card from '../models/Card';
import Todo from '../models/Todo';

import CardsList from 'components/CardsList';
import TodosList from 'components/TodosList';
import CardComponent from 'components/Card';
import TodoComponent from 'components/Todo';


class App extends Component {
  state = {
    cardName: ''
  }

  changeCardName = e => { this.setState({ cardName: e.target.value }) };

  createCard = e => {
    this.props.createCard(new Card(this.state.cardName));
    this.setState({ cardName: '' });
  }

  createTodo = (cardId, content) => {
    const todo = new Todo(content);
    this.props.createTodo(todo);
    this.props.addTodo(cardId, todo.id);
    this.setState({ todoName: '' });
  }

  deleteCard = id => {
    this.props.deleteTodos(this.props.cards.items[id].todos);
    this.props.deleteCard(id);
  }

  deleteTodo = (cardId, todoId) => {
    this.props.removeTodo(cardId, todoId);
    this.props.deleteTodo(todoId);
  }

  updateCard = (card, name) => {
    card.name = name;
    this.props.updateCard(card);
  }

  updateTodo = (todo, content) => {
    todo.content = content;
    this.props.updateTodo(todo);
  }

  render() {
    const { cardName } = this.state;
    const { cards, todos } = this.props;

    return (
      <div>
        <div>
          <h1>Cards</h1>
          <input type="text" placeholder="card name" value={cardName} onChange={this.changeCardName}/>
          <button onClick={this.createCard}>Create card</button>
          <CardsList>
          {
            Object.values(cards.items).map(card => (
              <CardComponent
                key={card.id}
                name={card.name}
                onDelete={() => this.deleteCard(card.id)}
                onUpdate={(name) => this.updateCard(card, name)}
                onCreateTodo={(content) => this.createTodo(card.id, content)}
              >
                <TodosList>
                {
                  card.todos.map(id => {
                    const todo = todos.items[id];
                    return (
                      <TodoComponent
                        key={todo.id}
                        content={todo.content}
                        onDelete={() => this.deleteTodo(card.id, todo.id)}
                        onUpdate={(content) => this.updateTodo(todo, content)}
                      />
                    )
                  })
                }
                </TodosList>
              </CardComponent>
            ))
          }
          </CardsList>
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