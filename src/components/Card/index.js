import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`

`

Card.Header = styled.div`

`

Card.Editor = styled.input`

`

Card.Title = styled.h3`

`

Card.Actions = styled.div`

`

Card.Body = styled.div`

`

export default class extends Component {
  state = {
    edit: false,
    editor: this.props.name,
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

  edit = () => { this.setState({ edit: true }) }
  changeEditor = e => { this.setState({ editor: e.target.value })};

  // Submit edited card
  submit = () => {
    this.setState({ edit: false });
    this.props.onUpdate(this.state.editor);
  }

  render() {
    console.log(this.state);
    const { editor, edit } = this.state;
    const { name } = this.props;
    const header = edit ?
      (
        <Card.Editor innerRef={(editor) => {this.editor = editor}} type="text" value={editor} onChange={this.changeEditor}/>
      ) :
      (
        <Card.Header>
          <Card.Title>{name}</Card.Title>
          <Card.Actions>
            <button onClick={this.props.onCreateTodo}>Add todo</button>
            <button onClick={this.props.onDelete}>Delete card</button>
            <button onClick={this.edit}>Edit name</button>
          </Card.Actions>
        </Card.Header>
      )

    return(
      <Card>
        {header}
        <Card.Body>
          {this.props.children}
        </Card.Body>
      </Card>
    )
  }
}