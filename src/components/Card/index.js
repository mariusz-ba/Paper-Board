import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.li`
  border: 2px solid black;
  border-radius: 3px;
`

Card.Header = styled.div`
  padding: .5rem;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`

Card.Editor = styled.input`
  width: 100%;
  font-size: 1em;
  padding: .5rem;
`

Card.Title = styled.h3`

`

Card.Actions = styled.div`
  display: flex;
  align-self: flex-start;
`

Card.Body = styled.div`

`

Card.TodoEditor = styled.input`

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
            <button onClick={this.showTodoEditor}>Add todo</button>
            <button onClick={this.props.onDelete}>Delete card</button>
            <button onClick={this.edit}>Edit name</button>
          </Card.Actions>
        </Card.Header>
      )

    return(
      <Card>
        {header}
        <Card.Body>
          { todoEditorVisible === true && 
            <Card.TodoEditor
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