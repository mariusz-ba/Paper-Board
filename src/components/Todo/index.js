import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <input ref={(editor) => {this.editor = editor}} type="text" placeholder="todo content" value={editor} onChange={this.changeEditor}/>
      ) :
      (
        <div>
          <p>{content}</p>
          <button onClick={this.props.onDelete}>Delete todo</button>
          <button onClick={this.edit}>Edit todo</button>
        </div>
      )

    return (
      <div>
        {element}
      </div>
    )
  }
}