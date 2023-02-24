import React from "react";

const NoteItems = (props) => {
  const { note, deleteNote,updateNote } = props;
  return (  
    <>
    <div className="row my-3 d-flex">
      {note.map((note) => {
        return (
          <div key={note._id} className="col-md-3">
            <div className="card my-2">
              <div className="card-body">
                <div className="align-items-center">
                  <h5 className="card-title">{note.title}</h5>
                  <i
                    onClick={() => {
                      deleteNote(note._id);
                      props.showAlert('Note Deleted Done','danger')
                    }}
                    className="far fa-trash-alt mx-2"
                  ></i>
                  <i onClick={()=>{updateNote(note)}} className="fa-regular fa-pen-to-square mx-2"></i>
                </div>
                <p className="card-text">{note.description}</p>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default NoteItems;
