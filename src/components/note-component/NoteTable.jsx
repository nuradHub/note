import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import EditIcon from "../../assets/icon/edit-icon.png";
import "./NoteTable.css";
import { AppContext } from "../../context/Context";
import dayjs from "dayjs";

export const NoteTable = () => {
  const {
    tableCollection,
    notes,
    setNotes,
    pinNotes,
    setPinNotes,
    favouriteNotes,
    setFavouriteNotes,
    setEditCard,
    editCard,
    setFilterNote,
    deletedNote,
    setDeletedNote,
  } = useContext(AppContext);

  const ToggleEditCard = (id) => {
    const filter = notes.find(note=> note.id === id)
    setFilterNote(filter)
    setEditCard(!editCard);
  };

  const DeleteAllNote = (id) => {
    const filteredNote = notes.filter((note) => note.id !== id);

    const deleteNote = notes.find((note) => note.id === id);

    const matchNote = deletedNote.find((noteItem) => {
      if (noteItem.id === deleteNote.id) {
        return noteItem;
      }
    });

    if (!matchNote) {
      setDeletedNote((prev) => [...deletedNote, deleteNote]);
    }

    setNotes([...filteredNote]);
  };

  const DeletePinNote = (id)=> {
    const filteredNote = pinNotes.filter(note=> note.id !== id)

    const deleteNote = pinNotes.find(note=> note.id === id)

    const matchNote = deletedNote.find(noteItem=> {
      if(noteItem.id === deleteNote.id){
       return noteItem
      }
    })
    
    if(!matchNote){
      setDeletedNote((prev)=> [...deletedNote, deleteNote])
    }
    setPinNotes([...filteredNote])

  }

  const DeleteFavNote = (id)=> {
    const filteredNote = favouriteNotes.filter(note=> note.id !== id)

    const deleteNote = favouriteNotes.find(note=> note.id === id) 

    const matchNote = deletedNote.find(noteItem=> {
      if(noteItem.id === deleteNote.id){
       return noteItem
      }
    })
    
    if(!matchNote){
      setDeletedNote((prev)=> [...deletedNote, deleteNote])
    }
  
    setFavouriteNotes([...filteredNote])
    
  }

  return (
    <div className="note-table-container">
      <table className="table-container">
        <thead className="table-head-container">
          <tr className="table-head-data">
            <th className="title-header">Title</th>
            <th>permission</th>
            <th>created at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody className="table-body-container">
          {tableCollection === "all-note-table" ? (
            [...notes]
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((note) => {
                return (
                  <tr key={note.id} className="table-text-container">
                    <td>
                      <div className="title-data">
                        <h3>{note.title}</h3>
                        <p> {note.description} </p>
                      </div>
                    </td>
                    <td>
                      <div className="table-permission">
                        <FontAwesomeIcon icon={faUser}/>
                        <p>Only You</p>
                      </div>
                    </td>
                    <td className="table-date">
                      {dayjs(note.createdAt).format("MMMM, D")}
                    </td>
                    <td>
                      <div className="table-action">
                        <FontAwesomeIcon icon={faPenToSquare} onClick={()=> ToggleEditCard(note.id)} />
                        <FontAwesomeIcon icon={faTrash} onClick={()=> DeleteAllNote(note.id)} />
                      </div>
                    </td>
                  </tr>
                );
              })
          ) : tableCollection === "pin-note-table" ? (
            [...pinNotes]
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((note) => {
                return (
                  <tr key={note.id} className="table-text-container">
                    <td>
                      <div className="title-data">
                        <h3>{note.title}</h3>
                        <p> {note.description} </p>
                      </div>
                    </td>
                    <td>
                      <div className="table-permission">
                        <FontAwesomeIcon icon={faUser} />
                        <p>Only You</p>
                      </div>
                    </td>
                    <td className="table-date">
                      {dayjs(note.createdAt).format("MMMM, D")}
                    </td>
                    <td>
                      <div className="table-action">
                        <FontAwesomeIcon icon={faPenToSquare} onClick={()=> ToggleEditCard(note.id)} />
                        <FontAwesomeIcon icon={faTrash} onClick={()=> DeletePinNote(note.id)} />
                      </div>
                    </td>
                  </tr>
                );
              })
          ) : (
            tableCollection === "favourite-note-table" && (
               [...favouriteNotes]
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((note) => {
                return (
                  <tr key={note.id} className="table-text-container">
                    <td>
                      <div className="title-data">
                        <h3>{note.title}</h3>
                        <p> {note.description} </p>
                      </div>
                    </td>
                    <td>
                      <div className="table-permission">
                        <FontAwesomeIcon icon={faUser} />
                        <p>Only You</p>
                      </div>
                    </td>
                    <td className="table-date">
                      {dayjs(note.createdAt).format("MMMM, D")}
                    </td>
                    <td>
                      <div className="table-action">
                        <FontAwesomeIcon icon={faPenToSquare} onClick={()=> ToggleEditCard(note.id)} />
                        <FontAwesomeIcon icon={faTrash} onClick={()=> DeleteFavNote(note.id)} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

/*


<td className="table-title">
 
</td>
<div className="table-header-contents">
  
</div>
*/
