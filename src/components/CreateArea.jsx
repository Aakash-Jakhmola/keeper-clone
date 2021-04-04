import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, savenote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = useState(false);

  function handlechange(event) {
    const val = event.target.value;
    const name = event.target.name;
    savenote((prev) => {
      return { ...prev, [name]: val };
    });
  }
  function sendnote(event) {
    props.addnote(note);
    savenote({
      title: "",
      content: ""
    });
    setExpanded(false);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <form className="create-note">
      {isExpanded && (
        <input
          name="title"
          placeholder="Title"
          onChange={handlechange}
          value={note.title}
        />
      )}
      <textarea
        name="content"
        onClick={expand}
        onChange={handlechange}
        value={note.content}
        placeholder="Take a note..."
        rows={isExpanded ? 3 : 1}
      />
      {isExpanded && (
        <Zoom in={isExpanded}>
          <Fab onClick={sendnote}>
            <AddIcon />
          </Fab>
        </Zoom>
      )}
    </form>
  );
}

export default CreateArea;
