function Body() {
    return (
        <div className="Body">
            <div className="Body-note-edit">
                <input type="text" id="title" autoFocus />
                <textarea id="body" placeholder="Emptier than the void..." />
            </div>
            <div className="Body-note-preview">
                <h1 className="Preview-title">TITLE GOES HERE</h1>
                <div className="Markdown-preview">note should go here...</div>
            </div>
        </div>
    )
}

export default Body;