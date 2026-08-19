import './App.css';
import uuid from 'react-uuid';
import Sidebar from './Sidebar';
import Body from './Body';
import { useState } from 'react';


function App() {
  const [notes, setNotes] = useState([]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    }
    console.log('added a note with note id ' + newNote.id);

    setNotes([newNote, ...notes]);
  }

  return (
    <div className="App">
      <Sidebar notes={notes} onAddNote={onAddNote} />
      <Body />
    </div>
  )
}

export default App;
