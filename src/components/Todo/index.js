import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Todo = styled.li`
  border-radius: 3px;
  background: rgba(226,221,216);
  box-shadow: 0 0 3px rgba(205,168,138);

  &:not(:last-of-type) {
    margin-bottom: .5rem;
  }
`

Todo.Editor = styled.input`
  border: 0;
  border-radius: 3px;
  outline: 0;
  width: 100%;
  font-size: 1em;
  padding: .5rem;
  background: rgba(226,221,216);
`

Todo.Actions = styled.div`
  float: right;

  button {
    border: 0;
    outline: 0;
    color: #000;
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

Todo.Preview = styled.div`
  padding: .5rem;

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

  handleKey = e => {
    if(e.key === 'Enter')
      this.submit();
  }

  edit = () => { this.setState({ edit: true }) };

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
        <Todo.Editor ref={(editor) => {this.editor = editor}} type="text" placeholder="todo content" value={editor} onChange={this.changeEditor}/>
      ) :
      (
        <Todo.Preview>
          <Todo.Actions>
            <button onClick={this.props.onDelete}><i className="fas fa-trash-alt"></i></button>
            <button onClick={this.edit}><i className="far fa-edit"></i></button>
          </Todo.Actions>
          <p>{content}</p>
        </Todo.Preview>
      )

    return (
      <Todo>
        {element}
      </Todo>
    )
  }
}