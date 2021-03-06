import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Todo = styled.li`
  border-radius: 3px;
  background: rgb(226,221,216);
  box-shadow: 0 0 3px rgb(205,168,138);

  &:not(:last-of-type) {
    margin-bottom: .5rem;
  }
`

Todo.Editor = styled.textarea`
  border: 0;
  border-radius: 3px;
  outline: 0;
  width: 100%;
  max-width: 100%;
  font-size: 1em;
  padding: .5rem;
  background: rgb(226,221,216);
`

Todo.Actions = styled.div`
  opacity: 0;

  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: rgb(226,221,216);

  transition: opacity linear .2s;
  
  button {
    border: 0;
    outline: 0;
    color: #000;
    background: transparent;
    font-size: 1em;
    
    &:hover {
      cursor: pointer;  
    }
  }
  `
  
  Todo.Preview = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: .5rem;
  overflow: hidden;

  &:hover div {
    opacity: 1;
  }

  p {
    font-size: 0.875em;
    line-height: 1.2;
  }
`

export default class extends Component {
  state = {
    edit: this.props.edit,
    editor: this.props.content
  }

  static propTypes = {
    // User can initialize component with edit mode
    edit: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  static defaultProps = {
    edit: false,
    content: ''
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.state.edit && this.todoEditor)
      this.todoEditor.focus();

    if(prevState.edit !== this.state.edit) {
      if(this.state.edit) {
        document.addEventListener('click', this.handleClickOutside);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  }

  handleClickOutside = e => {
    if(this.todoEditor && !this.todoEditor.contains(e.target))
      this.setState({
        edit: false,
        editor: this.props.content
      })
  }

  handleKey = e => {
    if(e.key === 'Enter')
      this.submit();
  }

  edit = () => { 
    this.setState({ edit: true });
  };

  changeEditor = e => {
    this.setState({ editor: e.target.value });
  }

  submit = () => {
    this.setState({ edit: false });
    this.props.onUpdate(this.state.editor);
  }

  render() {
    const { content } = this.props;
    const { edit, editor } = this.state;
    const element = edit ? 
      (
        <Todo.Editor
          innerRef={(node) => {this.todoEditor = node}}
          rows="3" 
          type="text" 
          placeholder="Type something..." 
          value={editor} 
          onChange={this.changeEditor}/>
      ) :
      (
        <Todo.Preview>
          <p>{content}</p>
          <Todo.Actions>
            <button onClick={this.props.onDelete}><i className="fas fa-trash-alt"></i></button>
            <button onClick={this.edit}><i className="far fa-edit"></i></button>
          </Todo.Actions>
        </Todo.Preview>
      )

    return (
      <Todo>
        {element}
      </Todo>
    )
  }
}