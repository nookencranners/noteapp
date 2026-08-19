import ReactMarkdown from 'react-markdown';

function Body({ activeNote, onUpdateNote }) {
    const onEditField = (key, value) => {
        onUpdateNote({
            ...activeNote,
            [key]: value,
            lastModified: Date.now(),
        })
    };

    if (!activeNote) return <div className="No-active-note">No note selected.</div>

    return (
        <div className="Body">
            <div className="Body-note-edit">
                <input
                    type="text"
                    id="title"
                    value={activeNote.title}
                    onChange={(e) => onEditField("title", e.target.value)}
                    autoFocus
                />
                <textarea
                    id="body"
                    placeholder="Emptier than the void..."
                    value={activeNote.body}
                    onChange={(e) => onEditField("body", e.target.value)}
                />
            </div>
            <div className="Body-note-preview">
                <h1 className="Preview-title">{activeNote.title}</h1>
                <div className="Markdown-preview">
                    <ReactMarkdown>
                        {activeNote.body}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default Body;