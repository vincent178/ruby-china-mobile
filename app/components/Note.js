import React from 'react';

export default class Note extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }

  renderEdit() {
    return <input type="text"
                  ref={(e) => e ? e.selectionStart = this.props.task.length : null}
                  autoFocus={true}
                  defaultValue={this.props.task}
                  onBlue={this.finishEdit.bind(this)}
                  onKeyPress={this.checkEnter.bind(this)} />
  }

  renderNote() {
    return (
      <div onClick={this.edit.bind(this)}>
        <span className="task">{this.props.task}</span>
        {this.props.onDelete ? this.renderDelete() : null}
      </div>
    )
  }

  edit() {
    this.setState({
      editing: true
    })
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    const value = e.target.value;

    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);

      this.setState({
        editing: false
      })
    }
  }

  renderDelete() {
    return <button className="delete-note" onClick={this.props.onDelete}>x</button>
  }
}