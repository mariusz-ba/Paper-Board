import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.li`
  border-radius: 3px;
  box-shadow: 0 0 5px rgb(44,36,34);
  background: rgb(205,168,138);
  color: #1a1a1a;
`

Card.Header = styled.div`
  padding: .5rem;
  border-bottom: 1px solid rgb(44,36,34);
  display: flex;
  justify-content: space-between;
`

Card.Editor = styled.input`
  width: 100%;
  font-size: 1em;
  padding: .5rem;
`

Card.Title = styled.h4`

`

Card.Actions = styled.div`
  display: flex;
  align-self: flex-start;

  button {
    text-shadow: 0 0 3px rgb(44,36,34);
    border: 0;
    outline: 0;
    color: #fff;
    background: transparent;
    font-size: 1em;

    &:hover {
      cursor: pointer;  
    }

    &:not(:last-of-type) {
      margin-right: .5rem;
    }
  }
`

Card.Body = styled.div` 
  padding: .5rem;
`

Card.TodoEditor = styled.textarea`
  border: 0;
  border-radius: 3px;
  outline: 0;
  width: 100%;
  max-width: 100%;
  font-size: 1em;
  padding: .5rem;
  background: 226,221,216);
`

export default class extends Component {
  state = {
    edit: false,
    editor: this.props.name,
    todo: '',
    todoEditorVisible: false
  }

  static propTypes = {
    // Card name
    name: PropTypes.string.isRequired,
    // Function invoked when update button is clicked
    onUpdate: PropTypes.func.isRequired,
    // Function invoked when delete button is clicked
    onDelete: PropTypes.func.isRequired,
    // Function invoked when new todo is about to be created
    onCreateTodo: PropTypes.func.isRequired,
  }

  handleEditorKey = e => {
    if(e.key === 'Enter')
      this.submit();
  }

  handleTodoEditorKey = e => {
    if(e.key === 'Enter') {
      this.props.onCreateTodo(this.state.todo);
      this.setState({
        todo: '',
        todoEditorVisible: false
      })
    }
  }

  edit = () => { this.setState({ edit: true }) }

  changeEditor = e => { this.setState({ editor: e.target.value })};
  changeTodo = e => { this.setState({ todo: e.target.value })};

  // Submit edited card
  submit = () => {
    this.setState({ edit: false });
    this.props.onUpdate(this.state.editor);
  }

  showTodoEditor = () => {
    this.setState({ todoEditorVisible: true });
  }

  render() {
    const { editor, edit } = this.state;
    const { todo, todoEditorVisible } = this.state;
    const { name } = this.props;
    const header = edit ?
      (
        <Card.Editor type="text" value={editor} onChange={this.changeEditor} onKeyDown={this.handleEditorKey}/>
      ) :
      (
        <Card.Header>
          <Card.Title>{name}</Card.Title>
          <Card.Actions>
            <button onClick={this.showTodoEditor}><i className="fas fa-plus"></i></button>
            <button onClick={this.props.onDelete}><i className="fas fa-minus"></i></button>
            <button onClick={this.edit}><i className="fas fa-ellipsis-h"></i></button>
          </Card.Actions>
        </Card.Header>
      )

    return(
      <Card>
        {header}
        <Card.Body>
          { todoEditorVisible === true && 
            <Card.TodoEditor
              rows="3"
              type="text" 
              placeholder="Create new todo"
              value={todo} 
              onChange={this.changeTodo}
              onKeyDown={this.handleTodoEditorKey}/>
          }
          {this.props.children}
        </Card.Body>
      </Card>
    )
  }
}