import { useContext } from "react";
import "./ViewNote.css";
import { AppContext } from "../../context/Context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'

export const ViewDeleteNote = () => {

  const {matchDeletedNote, setViewDeleteNote  } = useContext(AppContext)

  const UnRenderViewNote = ()=> {
    setViewDeleteNote(false)
  }

  return (
    <div className="view-note-container" >
      <div className="view-note-contents">
        <div className="view-note-header">
        <h3>{matchDeletedNote?.title}</h3>
        <FontAwesomeIcon icon={faClose} onClick={UnRenderViewNote} />
      </div>
      <div className="view-note-content">
        {matchDeletedNote?.description}
      </div>
      </div>
    </div>
  );
};
