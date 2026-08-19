import './App.css';
import uuid from 'react-uuid';
import Sidebar from './Sidebar';
import Body from './Body';
import { useState } from 'react';
import Register from './Register';


function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    }
    console.log('added a note with note id ' + newNote.id);

    setNotes([newNote, ...notes]);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  }

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
    console.log('deleted the note with id ' + idToDelete)
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  let user = 'Guest';
  let content;

  if (user === 'Guest') {
    content = (
      <div className="App-unlogged">
        <Register />
      </div>
    )
  }

  else {
    content = (
      <div className="App">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Body
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
        />
      </div>
    )
  }

  return (
    <div className="Page">
      {content}
    </div>
  )
}

export default App;
