import React, { Component } from 'react';
import Notes from './notes';
import uuid from 'node-uuid';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state =  {
      notes: [
        { id: uuid.v4(), task: 'Learn webpack' },
        { id: uuid.v4(), task: 'Learn react' },
        { id: uuid.v4(), task: 'Do laundry' }
      ]
    };
  }

  render() {

    const notes = this.state.notes;
    return (
      <div>
        <button className="add-note" onClick={this.addNote.bind(this)}>+</button>
        <Notes
          notes={notes}
          onEdit={this.editNote.bind(this)}
          onDelete={this.deleteNote.bind(this)}
          />
      </div>
    )
  }

  addNote() {
    this.setState({
      notes: [...this.state.notes, {id: uuid.v4(), task: 'New task'}]
    });
  }

  editNote(id, task) {
    const notes = this.state.notes.map(note => {
      if (note.id === id && task) {
        note.task = task;
      }

      return note;
    });

    this.setState({notes});
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }
};