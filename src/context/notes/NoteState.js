import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000";
  const initialState = [];
  const [notes, setNotes] = useState(initialState);
  //getAllNotes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token') ,
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  //add A note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token') ,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note =  await response.json()
    setNotes(notes.concat(note))
  };

  //delete A note
  const deleteNote =  async (id) => {
    const url = `${host}/api/notes/deletenotes/${id}`;
     // eslint-disable-next-line
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token') ,
      },
    });
    const newNote = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNote);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //api calls

    const url = `${host}/api/notes/updatenotes/${id}`;
     // eslint-disable-next-line
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token') ,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote)

  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
