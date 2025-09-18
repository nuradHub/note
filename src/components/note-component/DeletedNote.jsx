import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEye, faThumbtack, faEllipsis, faCalendarWeek, faHeart} from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from "react";
import PenIcon from "../../assets/icon/pen-icon.png";
import EditIcon from "../../assets/icon/edit-icon.png";
import Slider from "../../assets/icon/slider-icon.png";
import "./NoteCard.css";
import { AppContext } from "../../context/Context";

export const DeletedNote = () => {
  const {
    viewDeleteNote,
    setViewDeleteNote,
    deletedNote,
    matchDeletedNote,
    setMatchDeletedNote,
    setDeletedNote,
    color, bcolor
  } = useContext(AppContext);

  const [toggleCard, setToggleCard] = useState(false);

  const ToggleCard = (id) => {
    const matchNote = deletedNote.find(item=>item.id === id)
    setMatchDeletedNote(matchNote)
    setToggleCard(!toggleCard);
  };

  const UnRenderToggleCard = ()=> {
    if(toggleCard === true){
      setToggleCard(false);
    }
  }

  const ToggleViewDeleteNote = () => {
    setViewDeleteNote(!viewDeleteNote);
  };

  const DeleteNote = (id) => {
    const result = deletedNote.filter(items=> items.id !== id)
    setDeletedNote([...result])
  };

  return (
   <div className="note-card-general-container">
     <div className="note-card-container" onClick={UnRenderToggleCard}>
      {[...deletedNote]?.sort((a,b)=> b.createdAt - a.createdAt)?.map((deletedItem) => {
        return (
          <div key={deletedItem.id} className={`note-card-datas 
          ${
              deletedItem.priority === "low"
                ? "container-low"
                : deletedItem.priority === "very-low"
                ? "container-very-low"
                : deletedItem.priority === "high"
                ? "container-high"
                : deletedItem.priority === "very-high"
                ? "container-very-high"
                : deletedItem.priority === "medium"
                ? "container-medium"
                : deletedItem.priority === "default"
                ? "container-default"
                : "container-default"
            }
          
          
          `}>
            {deletedItem?.id === matchDeletedNote?.id &&
            <div className={`action-card-container ${toggleCard && "toggle-card"}`} >
              <div className="view-card-container" onClick={ToggleViewDeleteNote}>
                <FontAwesomeIcon icon={faEye}/>
                <span>View</span>
              </div>

              <div className="delete-card-container" onClick={()=> DeleteNote(deletedItem.id)}>
                <FontAwesomeIcon icon={faTrash}/>
                <span>Delete</span>
              </div>
            </div>
            }
           
            <div className="note-card-header">
              {deletedItem.icon === 'card' ? <img src={EditIcon} alt="" /> : <img src={Slider} alt="" />}
              <div className="note-card-header-images">
                 {deletedItem.isPinned === true && <FontAwesomeIcon icon={faThumbtack} />}
                 {deletedItem.isPinned === false && <FontAwesomeIcon icon={faHeart} />}
                 <FontAwesomeIcon icon={faEllipsis} onClick={()=>ToggleCard(deletedItem.id)}/>                             
              </div>
            </div>
            <div className="note-card-text-container">
              <h4>{deletedItem.title}</h4>
              <p>{deletedItem.description} </p>
            </div>
            <div className="note-card-access">
              <div className="note-card-user"  >
                <FontAwesomeIcon icon={faUser} className={`${
                    deletedItem.priority === "low"
                      ? color.low
                      : deletedItem.priority === "very-low"
                      ? color.veryLow
                      : deletedItem.priority === "high"
                      ? color.high
                      : deletedItem.priority === "very-high"
                      ? color.veryHigh
                      : deletedItem.priority === "medium"
                      ? color.medium
                      : deletedItem.priority === "default"
                      ? color.default
                      : color.default
                  }`} />
                Only You
              </div>
              <div className="note-card-date">
                <FontAwesomeIcon icon={faCalendarWeek} className={`${
                    deletedItem.priority === "low"
                      ? color.low
                      : deletedItem.priority === "very-low"
                      ? color.veryLow
                      : deletedItem.priority === "high"
                      ? color.high
                      : deletedItem.priority === "very-high"
                      ? color.veryHigh
                      : deletedItem.priority === "medium"
                      ? color.medium
                      : deletedItem.priority === "default"
                      ? color.default
                      : color.default
                  }`} />
                {deletedItem.reminderDate.split('-').join('/')}
              </div>
            </div>
            <div className={`note-card-line 
              ${
              deletedItem.priority === "low"
                ? bcolor.blow
                : deletedItem.priority === "very-low"
                ? bcolor.bveryLow
                : deletedItem.priority === "high"
                ? bcolor.bhigh
                : deletedItem.priority === "very-high"
                ? bcolor.bveryHigh
                : deletedItem.priority === "medium"
                ? bcolor.bmedium
                : deletedItem.priority === "default"
                ? bcolor.bdefault
                : bcolor.bdefault
                  }
              
              `}></div>
          </div>
        );
      })}
    </div>
   </div>
  );
};
