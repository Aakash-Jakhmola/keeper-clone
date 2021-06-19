import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, savenote] = useState({
    title: "",
    body: ""
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
      body: ""
    });
    setExpanded(false);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }
  return  (
    <form className="create-note">
      {isExpanded && (
        <input
          name="title"
          autoFocus
          placeholder="Title"
          onChange={handlechange}
          value={note.title}
          disabled={props.isEdit !== -1}
        />
      )}
      <textarea
        name="body"
        onClick={expand}
        onChange={handlechange}
        disabled={props.isEdit !== -1}
        value={note.body}
        placeholder="Take a note..."
        rows={isExpanded ? 3 : 1}
      />
      {isExpanded && (
        <Zoom  in={isExpanded }>
          <Fab onClick={sendnote}>
            <AddIcon />
          </Fab>
        </Zoom>
      )}
    </form>
  );
}

export default CreateArea;
