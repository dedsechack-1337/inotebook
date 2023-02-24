import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const contex = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const { addNote, notes } = contex;
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert('Note Added Successflly','success')
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add A note</h1>
      <form>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            value={note.title}
            name="title"
            type="text"
            onChange={onChange}
            className="form-control my-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Your Note Title"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input
            value={note.description}
            name="description"
            onChange={onChange}
            type="text"
            className="form-control my-2"
            id="exampleInputPassword1"
            placeholder="Enter Your note Description"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="tag">Tag</label>
          <input
            value={note.tag}
            name="tag"
            type="text"
            onChange={onChange}
            className="form-control my-2"
            id="tag"
            aria-describedby="emailHelp"
            placeholder="Enter Your Tag Title"
          />
        </div>
        <button
          disabled={note.title.length<5 || note.description.length<5}
          onClick={handleClick}
          type="submit"
          className="btn btn-primary my-2"
        >
          Add Note
        </button>
      </form>
      <h1>Your Note </h1>
      {notes.length === 0 && "Nothing to Show"}
    </div>
  );
};

export default AddNote;
