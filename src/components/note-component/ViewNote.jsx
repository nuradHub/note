import { useContext } from "react";
import PenIcon from "../../assets/icon/pen-icon.png";
import "./ViewNote.css";
import { AppContext } from "../../context/Context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'

export const ViewNote = () => {

  const {setViewCard, filterNote } = useContext(AppContext)

  const UnRenderViewNote = ()=> {
    setViewCard(false)
  }

  return (
    <div className="view-note-container" >
      <div className="view-note-contents">
        <div className="view-note-header">
        <h3>{filterNote?.title}</h3>
        <FontAwesomeIcon icon={faClose} onClick={UnRenderViewNote} />
      </div>
      <div className="view-note-content">
        {filterNote?.description}
      </div>
      </div>
    </div>
  );
};
