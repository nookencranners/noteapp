function Sidebar({ notes = [], onAddNote, onDeleteNote }) {

    return (
        <div className="Sidebar">
            <div className="Sidebar-header">
                <h1>Notes</h1>
                <button onClick={onAddNote}>ADD</button>
            </div>
            <div className="Sidebar-notes">
                {notes.map((note) => (
                    <div className="Sidebar-note">
                        <div className="Sidebar-note-title">
                            <strong>{note.title}</strong>
                            <button onClick={() => onDeleteNote((note.id))}>DELETE</button>
                        </div>
                        <p>{note.body && note.body.substr(0, 50) + "..."}</p>
                        <small className="note-meta">
                            Last modified{" "}
                            {new Date(note.lastModified).toLocaleDateString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;