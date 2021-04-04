import React, { useState } from "react";
import CreateArea from "./CreateArea";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  const [list, savelist] = useState([]);

  function addnote(note) {
    savelist((prev) => [...prev, note]);
    console.log(list);
    // note.title = note.content = "";
  }

  function deletenote(id) {
    savelist((prev) => {
      return prev.filter((item, index) => {
        return id != index;
      });
    });
  }

  function temp(event) {
    deletenote(event.target.value);
  }

  function createnoteitem(noteitem, index) {
    console.log(noteitem);

    return (
      <div className="note">
        <h1>{noteitem.title}</h1>
        <p>{noteitem.content}</p>
        <button onClick={temp} id={index}>
          <DeleteIcon />
        </button>
      </div>
    );
  }

  return (
    <div>
      <CreateArea addnote={addnote} />
      {list.map(createnoteitem)}
    </div>
  );
}

export default Note;
