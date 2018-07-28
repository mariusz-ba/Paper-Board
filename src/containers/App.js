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

import styled from 'styled-components';

const Header = styled.header`
  padding: 0 1rem;
  margin: 2rem 0;
  text-align: center;
`

Header.Title = styled.h3`
  max-width: 32em;
  margin: 0 auto;
  margin-bottom: 2rem;
  line-height: 1.5em;
`

Header.Input = styled.input`
  border: 0;
  outline: 0;
  border-radius: 3px;
  font-size: 1.5rem;
  padding: 1rem;
  padding-right: 2rem;
  background: rgb(205,168,138);
  font-weight: bold;
  max-width: 100%;

  &::placeholder {
    color: rgb(193,147,110);
  }
`

Header.Submit = styled.button`
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 1.5rem;
  color: #fff;
  margin-left: -2rem;
  margin-right: .5rem;
`

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
        <Header>
          <Header.Title>
            Welcome to Paper-Board. Create Your own todos and group them together inside cards. Oh and everything is stored in your browsers localstorage so You don't have to be worried about losing something :)
          </Header.Title>
          <Header.Input type="text" placeholder="Create new card" value={cardName} onChange={this.changeCardName}/>
          <Header.Submit onClick={this.createCard}><i className="fas fa-plus"></i></Header.Submit>
        </Header>
        <section>
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
        </section>
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