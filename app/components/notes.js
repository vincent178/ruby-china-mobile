import React, { Component } from 'react';
import Note from './note';

export default class Notes extends Component {

 constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="notes">{this.props.notes.map(note =>
          <li className="note" key={note.id}>
            <Note
              task={note.task}
              onEdit={this.props.onEdit.bind(null, note.id)}
              onDelete={this.props.onDelete.bind(null, note.id)}
              />
          </li>
      )}</ul>
    )
  }
}
