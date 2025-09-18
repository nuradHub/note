import { useContext, useState } from "react";
import PenIcon from "../../assets/icon/pen-icon.png";
import { AppContext } from "../../context/Context";
import { NoteCard } from "./NoteCard";
import { NoteTable } from "./NoteTable";
import "./NoteComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTable } from "@fortawesome/free-solid-svg-icons";

export const NoteComponent = () => {
  const { headerState, setNoteCollection, noteCollection, setTableCollection} =
    useContext(AppContext);

  const [noteFormat, setNoteFormat] = useState(false)

  const ChangeNoteFormat = () => {
    setNoteFormat(!noteFormat)    
  };

  const AllNoteCollection = () => {
    setNoteCollection('all')
    setTableCollection("all-note-table");
  };

  const PinNoteCollection = () => {
    setNoteCollection("pin-notes");
    setTableCollection("pin-note-table");
  };
  const FavouriteNoteCollection = () => {
    setNoteCollection("favourite-note");
    setTableCollection("favourite-note-table");
  };

  return (
    <div className="middle-contents">
      <h4 className="middle-header">{headerState}</h4>
      <div className="stored-note-options">
        <div className="all-notes-options">
          <p className={`all-content ${noteCollection === "all" && "underline"}`}
            onClick={AllNoteCollection}
          > All </p>
          <p className={`pin-note-content ${
              noteCollection === "pin-notes" && "underline"
            }`}
            onClick={PinNoteCollection}
          > Pin Notes </p>
          <p className={`favourite-content ${noteCollection === "favourite-note" && "underline" }`}
            onClick={FavouriteNoteCollection}
          > Favourite Notes </p>
        </div>
        <div className="note-status" onClick={ChangeNoteFormat}>
          {noteFormat ? <FontAwesomeIcon icon={faBook} />  : <FontAwesomeIcon icon={faTable} /> }
        </div>
      </div>
      {!noteFormat  ? <NoteCard /> : <NoteTable />}
    </div>
  );
};
