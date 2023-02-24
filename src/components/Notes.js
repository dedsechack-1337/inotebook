import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItems from "./NoteItems";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const navigate = useNavigate()
  const contex = useContext(noteContext);
  const { notes, deleteNote, getNotes,editNote } = contex;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')

    }
    // eslint-disable-next-line
  }, []);
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Done",'success')
    console.log(props)
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  return (
    <div className="row">
      <AddNote  showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        hidden={true}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group my-2">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    value={note.etitle}
                    name="etitle"
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
                    value={note.edescription}
                    name="edescription"
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
                    value={note.etag}
                    name="etag"
                    type="text"
                    onChange={onChange}
                    className="form-control my-2"
                    id="tag"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Tag Title"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length<5 || note.edescription.length<5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <NoteItems
          showAlert={props.showAlert}
          note={notes}
          deleteNote={deleteNote}
          updateNote={updateNote}
        />
      </div>
    </div>
  );
};

export default Notes;
