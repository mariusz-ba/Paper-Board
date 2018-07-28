import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Todo = styled.li`
  border: 1px solid red;
  border-radius: 3px;

  &:not(:last-of-type) {
    margin-bottom: .5rem;
  }
`

Todo.Editor = styled.input`
  width: 100%;
  font-size: 1em;
  padding: .5rem;
`

Todo.Actions = styled.div`

`

Todo.Preview = styled.div`
  padding: .5rem;
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
          <p>{content}</p>
          <Todo.Actions>
            <button onClick={this.props.onDelete}>Delete todo</button>
            <button onClick={this.edit}>Edit todo</button>
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