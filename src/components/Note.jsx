import React, { useState } from "react";
import CreateArea from "./CreateArea";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios'

function Note() {
  const [list, savelist] = useState([]);
  const [isEdit, setIsEdit] = useState(-1) ;
  //const [newlist, setNewTitle] = useState("") ;

  React.useEffect(()=>{
    axios.get('https://tranquil-sea-15035.herokuapp.com/')
    .then((res)=>{
      console.log(res.data);
      savelist(res.data);
    },
    (err)=>{
      console.log(err) 
    })
  },[])

  function addnote(note) {
    axios.post('https://tranquil-sea-15035.herokuapp.com/',note)
    .then((res)=>{
      console.log(res.data);
      if(res.data.error) {
        alert("Error" + res.data.error)
      } else {
        window.location.reload();
      }
    },
    (err)=>{
      console.log(err) 
    })
  }

  function deletenote(id) {
    console.log(id)
    console.log(list[id]._id)
    axios.delete('https://tranquil-sea-15035.herokuapp.com/' + list[id]._id)
    .then((res)=>{
      console.log(res.data);
      if(res.data.error) {
        alert("Error" + res.data.error)
      } else {
        window.location.reload();
      }
    },
    (err)=>{
      console.log(err) 
    })
  }

  const temp = value => () => {
    deletenote(value);
  }

  const edit = value => () => {
    setIsEdit(value)
  }

  const done = (id) => {
    axios.patch('https://tranquil-sea-15035.herokuapp.com/'+ list[id]._id, list[id])
    .then((res)=>{
      if(res.data.error) {
        alert(res.data.error)
        window.location.reload();
      }

    }, (err)=>{
      alert(err);
      window.location.reload();
    }
    )
    setIsEdit(-1);
  }

  const handleChange = (event, id) => {
    console.log(event.target.value) ;
    const name = event.target.name
    console.log(id) ;
    let newlist = list.map((item, index)=>{
      if(index !== id)
        return item;
      else 
        return {...item,[name]:event.target.value} ;
    })

    savelist(newlist)
    console.log(newlist)
  }
  

  function createnoteitem(noteitem, index) {
    console.log(noteitem);
    //setNewTitle(noteitem.title)
    return (
      <div className="note">
        {(isEdit !==index ) && <h1> {noteitem.title} </h1>}
        {(isEdit !==index ) && <p >{noteitem.body}</p>}
        
        {(isEdit === index) && <input type="text" className="note-title" name= "title" value={list[index].title} autoFocus onChange = {(evt)=>{handleChange(evt,index)}} />}
        {(isEdit === index) && <input type="text" name = "body" value={list[index].body}  onChange = {(evt)=>{handleChange(evt,index)}}/>}
        
        
        {(isEdit !==index ) && <button onClick={temp(index)} id={index}>
          <DeleteIcon />
        </button>}
        {(isEdit!==index) && <button onClick={edit(index)} id={index}>
          <CreateIcon />
        </button> }
        {(isEdit === index) && <button onClick={()=> done(index)} id={index}>
          <DoneIcon />
        </button> }
      </div>
    );
  }

  return (
    <div>
      <CreateArea isEdit={isEdit} addnote={addnote} />
      {list.map(createnoteitem)}
    </div>
  );
}

export default Note;
