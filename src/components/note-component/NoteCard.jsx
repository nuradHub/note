import { useContext, useState } from "react";
import EditIcon from "../../assets/icon/edit-icon.png";
import Slider from "../../assets/icon/slider-icon.png";
import "./NoteCard.css";
import { AppContext } from "../../context/Context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPenToSquare, faThumbtack, faHeart, faEllipsis, faEye, faCalendarWeek, faUser } from '@fortawesome/free-solid-svg-icons'

export const NoteCard = () => {
  const {
    viewCard,
    setViewCard,
    editCard,
    setEditCard,
    notes,
    setNotes,
    noteCollection,
    bcolor,
    color,
    filterNote,
    setFilterNote,
    boldState, 
    setDeletedNote,
    deletedNote,
    pinNotes, setPinNotes,
    setFavouriteNotes, favouriteNotes,
    setTogglePinNote,
    setNoteCollection,
    searchResult
  } = useContext(AppContext);

  const [toggleCard, setToggleCard] = useState(false);
  const [findPinNoteId, setFindPinNoteId] = useState(null);

  const ToggleAllCard = (id) => {
    const matchingNote = notes.find((note) => note.id === id);
    setFilterNote(matchingNote);
    setToggleCard(!toggleCard);
  };

  const TogglePinCard = (id) => {
    const matchingNote = pinNotes.find((note) => note.id === id);
    setFilterNote(matchingNote);
    setToggleCard(!toggleCard);
  };

  const ToggleFavCard = (id) => {
    const matchingNote = favouriteNotes.find((note) => note.id === id);
    setFilterNote(matchingNote);
    setToggleCard(!toggleCard);
  };

  const ToggleViewCard = () => {
    setViewCard(!viewCard);
  };

  const ToggleEditCard = () => {
    setEditCard(!editCard);
  };

  const UnToggleCard = () => {
    if (toggleCard === true) {
      setToggleCard(false);
    }
  };

  const DeleteAllNote = ()=> {
    const filteredNote = notes.filter(note=> note.id !== filterNote.id)

    const deleteNote = notes.find(note=> note.id === filterNote.id)
    
    const matchNote = deletedNote.find(noteItem=> {
      if(noteItem.id === deleteNote.id){
       return noteItem
      }
    })
    
    if(!matchNote){
      setDeletedNote((prev)=> [...deletedNote, deleteNote])
    }

    setNotes([...filteredNote])
  }

  const DeletePinNote = ()=> {
    const filteredNote = pinNotes.filter(note=> note.id !== filterNote.id)

    const deleteNote = pinNotes.find(note=> note.id === filterNote.id)

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

  const DeleteFavNote = ()=> {
    const filteredNote = favouriteNotes.filter(note=> note.id !== filterNote.id)

    const deleteNote = favouriteNotes.find(note=> note.id === filterNote.id) 

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
  
  const PinNote = (id)=> {
    const matchNote = notes.map(note =>
      note.id === id ? ({...note, isPinned: true}) : note
    )
    setNotes((prev)=> [...matchNote])

    const matchPin = matchNote.find(note=> note.id === id)
    setFindPinNoteId(id)

    const matchingNote = favouriteNotes.find(noteItem=> {
      if(noteItem.id === matchPin.id){
        return noteItem
      }
    })

    if(!matchingNote){
      setPinNotes(prev=> [...pinNotes, matchPin])
    }

    setTogglePinNote(true)
    setNoteCollection('pin-notes')
  }

  const FavouriteNote = (id)=> {
    const matchPin = notes.find(note=> note.id === id)

    const matchNote = favouriteNotes.find(noteItem=> {
      if(noteItem.id === id){
        return noteItem
      }
    })
    if(!matchNote){
      setFavouriteNotes(prev=> [...favouriteNotes, matchPin])
    }
    
    setTogglePinNote(true)
    setNoteCollection('favourite-note')
  }

  return (
    <div className="note-card-container" onClick={UnToggleCard}>
      {noteCollection === "all" ? (
        (searchResult.length > 0 ? [...searchResult] : [...notes])
          ?.sort((a, b) => b.createdAt - a.createdAt)
          .map((note) => {
            return (
              <div
                key={note.id}
                className={`note-card-datas 
            ${
              note.priority === "low"
                ? "container-low"
                : note.priority === "very-low"
                ? "container-very-low"
                : note.priority === "high"
                ? "container-high"
                : note.priority === "very-high"
                ? "container-very-high"
                : note.priority === "medium"
                ? "container-medium"
                : note.priority === "default"
                ? "container-default"
                : "container-default"
            }
            `}
              >
                {note.id === filterNote?.id && (
                  <div
                    className={`action-card-container ${
                      toggleCard && "toggle-card"
                    }`}
                  >
                    <div
                      className="view-card-container"
                      onClick={ToggleViewCard}
                    >
                      <FontAwesomeIcon icon={faEye}/>
                      <span>View</span>
                    </div>
                    <div
                      className="edit-card-container"
                      onClick={ToggleEditCard}
                    >
                      <FontAwesomeIcon icon={faPenToSquare}/>
                      <span>Edit</span>
                    </div>
                    <div className="delete-card-container" onClick={DeleteAllNote}>
                      <FontAwesomeIcon icon={faTrash}/>
                      <span>Move to bin</span>
                    </div>
                  </div>
                )}

                <div className="note-card-header">
                  {note.icon === "card" ? (
                    <img src={EditIcon} alt="" />
                  ) : (
                    <img src={Slider} alt="" />
                  )}
                  <div className="note-card-header-images">
                    
                    {!(note?.isPinned === true) && <span title="Pin Notes" ><FontAwesomeIcon icon={faThumbtack} onClick={()=> PinNote(note.id)} /></span>}

                    
                    {!(note?.isPinned === false) && <span title="Favourite Notes" ><FontAwesomeIcon icon={faHeart} onClick={()=> FavouriteNote(note.id)} /></span> }
                    
                    <FontAwesomeIcon icon={faEllipsis} onClick={() => ToggleAllCard(note.id)} />
                    
                  </div>
                </div>
                <div className="note-card-text-container">
                  <h4>{note.title}</h4>
                  <p className={`${note.boldState === true && note.id === filterNote.id && 'bold'}`} >{note.description}</p>
                </div>
                <div className="note-card-access" >
                  <div className="note-card-user">
                    <FontAwesomeIcon icon={faUser} className={`${
                    note.priority === "low"
                      ? color.low
                      : note.priority === "very-low"
                      ? color.veryLow
                      : note.priority === "high"
                      ? color.high
                      : note.priority === "very-high"
                      ? color.veryHigh
                      : note.priority === "medium"
                      ? color.medium
                      : note.priority === "default"
                      ? color.default
                      : color.default
                  }`} />
                    Only You
                  </div>
                  <div className="note-card-date">
                    <FontAwesomeIcon icon={faCalendarWeek} className={`${
                    note.priority === "low"
                      ? color.low
                      : note.priority === "very-low"
                      ? color.veryLow
                      : note.priority === "high"
                      ? color.high
                      : note.priority === "very-high"
                      ? color.veryHigh
                      : note.priority === "medium"
                      ? color.medium
                      : note.priority === "default"
                      ? color.default
                      : color.default
                  }`} />
                    {note.reminderDate.split('-').join('/')}
                  </div>
                </div>
                <div
                  className={`note-card-line ${
                    note.priority === "low"
                      ? bcolor.blow
                      : note.priority === "very-low"
                      ? bcolor.bveryLow
                      : note.priority === "high"
                      ? bcolor.bhigh
                      : note.priority === "very-high"
                      ? bcolor.bveryHigh
                      : note.priority === "medium"
                      ? bcolor.bmedium
                      : note.priority === "default"
                      ? bcolor.bdefault
                      : bcolor.bdefault
                  }`}
                ></div>
              </div>
            );
          })
      ) : noteCollection === "pin-notes" ? (
          [...pinNotes].sort((a,b)=> b.createdAt - a.createdAt).map(note=> {
            return(
               <div
                key={note.id}
                className={`note-card-datas 
            ${
              note.priority === "low"
                ? "container-low"
                : note.priority === "very-low"
                ? "container-very-low"
                : note.priority === "high"
                ? "container-high"
                : note.priority === "very-high"
                ? "container-very-high"
                : note.priority === "medium"
                ? "container-medium"
                : note.priority === "default"
                ? "container-default"
                : "container-default"
            }
            `}
              >
                {note.id === filterNote?.id && (
                  <div
                    className={`action-card-container ${
                      toggleCard && "toggle-card"
                    }`}
                  >
                    <div
                      className="view-card-container"
                      onClick={ToggleViewCard}
                    >
                      <FontAwesomeIcon icon={faEye} className="view-fas-icon"/>
                      <span>View</span>
                    </div>
                    <div
                      className="edit-card-container"
                      onClick={ToggleEditCard}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="edit-fas-icon"/>
                      <span>Edit</span>
                    </div>
                    <div className="delete-card-container" onClick={DeletePinNote}>
                      <FontAwesomeIcon icon={faTrash} className="trash-fas-icon"/>
                      <span>Move to bin</span>
                    </div>
                  </div>
                )}

                <div className="note-card-header">
                  {note.icon === "card" ? (
                    <img src={EditIcon} alt="" />
                  ) : (
                    <img src={Slider} alt="" />
                  )}

                  
                  <div className="note-card-header-images">

                  {!(note?.isPinned === false) && <span title="Pin Notes" ><FontAwesomeIcon icon={faThumbtack} className="pin-fas-icon"/></span> }

                  <FontAwesomeIcon icon={faEllipsis} onClick={() => TogglePinCard(note.id)} className="elipe-fas-icon"/>

                  </div>
                </div>
                <div className="note-card-text-container">
                  <h4>{note.title}</h4>
                  <p className={`${boldState && note.id === filterNote.id && 'bold'}`} >{note.description}</p>
                </div>
                <div className="note-card-access">
                  <div className="note-card-user">
                    <FontAwesomeIcon icon={faUser} className={`${
                    note.priority === "low"
                      ? color.low
                      : note.priority === "very-low"
                      ? color.veryLow
                      : note.priority === "high"
                      ? color.high
                      : note.priority === "very-high"
                      ? color.veryHigh
                      : note.priority === "medium"
                      ? color.medium
                      : note.priority === "default"
                      ? color.default
                      : color.default
                  }`}/>
                    Only You
                  </div>
                  <div className="note-card-date">
                    <FontAwesomeIcon icon={faCalendarWeek} className={`${
                    note.priority === "low"
                      ? color.low
                      : note.priority === "very-low"
                      ? color.veryLow
                      : note.priority === "high"
                      ? color.high
                      : note.priority === "very-high"
                      ? color.veryHigh
                      : note.priority === "medium"
                      ? color.medium
                      : note.priority === "default"
                      ? color.default
                      : color.default
                  }`} />
                    {note.reminderDate.split('-').join('/')}
                  </div>
                </div>
                <div
                  className={`note-card-line ${
                    note.priority === "low"
                      ? bcolor.blow
                      : note.priority === "very-low"
                      ? bcolor.bveryLow
                      : note.priority === "high"
                      ? bcolor.bhigh
                      : note.priority === "very-high"
                      ? bcolor.bveryHigh
                      : note.priority === "medium"
                      ? bcolor.bmedium
                      : note.priority === "default"
                      ? bcolor.bdefault
                      : bcolor.bdefault
                  }`}
                ></div>
              </div>
            )
          })
      ) : (
        noteCollection === "favourite-note" && (
          [...favouriteNotes].sort((a,b)=> b.createdAt - a.createdAt).map(note => {
            return(
                             <div
                key={note.id}
                className={`note-card-datas 
            ${
              note.priority === "low"
                ? "container-low"
                : note.priority === "very-low"
                ? "container-very-low"
                : note.priority === "high"
                ? "container-high"
                : note.priority === "very-high"
                ? "container-very-high"
                : note.priority === "medium"
                ? "container-medium"
                : note.priority === "default"
                ? "container-default"
                : "container-default"
            }
            `}
              >
                {note.id === filterNote?.id && (
                  <div
                    className={`action-card-container ${
                      toggleCard && "toggle-card"
                    }`}
                  >
                    <div
                      className="view-card-container"
                      onClick={ToggleViewCard}
                    >
                      <FontAwesomeIcon icon={faEye}/>
                      <span>View</span>
                    </div>
                    <div
                      className="edit-card-container"
                      onClick={ToggleEditCard}
                    >
                     <FontAwesomeIcon icon={faPenToSquare}/>
                      <span>Edit</span>
                    </div>
                    <div className="delete-card-container" onClick={DeleteFavNote}>
                      <FontAwesomeIcon icon={faTrash}/>
                      <span>Move to bin</span>
                    </div>
                  </div>
                )}

                <div className="note-card-header">
                  {note.icon === "card" ? (
                    <img src={EditIcon} alt="" />
                  ) : (
                    <img src={Slider} alt="" />
                  )}
                  <div className="note-card-header-images">

                    {!(note?.isPinned === false) && <span title="Favourite Notes" ><FontAwesomeIcon icon={faHeart} /> </span> }

                    <FontAwesomeIcon icon={faEllipsis} onClick={() => ToggleFavCard(note.id)} />

                  </div>
                </div>
                <div className="note-card-text-container">
                  <h4>{note.title}</h4>
                  <p className={`${boldState && note.id === filterNote.id && 'bold'}`} >{note.description}</p>
                </div>
                <div className="note-card-access">
                  <div className="note-card-user">
                    <FontAwesomeIcon icon={faUser} className={`${
                    note.priority === "low"
                      ? color.low
                      : note.priority === "very-low"
                      ? color.veryLow
                      : note.priority === "high"
                      ? color.high
                      : note.priority === "very-high"
                      ? color.veryHigh
                      : note.priority === "medium"
                      ? color.medium
                      : note.priority === "default"
                      ? color.default
                      : color.default
                  }`} />
                    Only You
                  </div>
                  <div className="note-card-date">
                    <FontAwesomeIcon icon={faCalendarWeek} className={`${
                    note.priority === "low"
                      ? color.low
                      : note.priority === "very-low"
                      ? color.veryLow
                      : note.priority === "high"
                      ? color.high
                      : note.priority === "very-high"
                      ? color.veryHigh
                      : note.priority === "medium"
                      ? color.medium
                      : note.priority === "default"
                      ? color.default
                      : color.default
                  }`} />
                    {note.reminderDate.split('-').join('/')}
                  </div>
                </div>
                <div
                  className={`note-card-line ${
                    note.priority === "low"
                      ? bcolor.blow
                      : note.priority === "very-low"
                      ? bcolor.bveryLow
                      : note.priority === "high"
                      ? bcolor.bhigh
                      : note.priority === "very-high"
                      ? bcolor.bveryHigh
                      : note.priority === "medium"
                      ? bcolor.bmedium
                      : note.priority === "default"
                      ? bcolor.bdefault
                      : bcolor.bdefault
                  }`}
                ></div>
              </div>
            )
          })
        )
      )}
    </div>
  );
};
