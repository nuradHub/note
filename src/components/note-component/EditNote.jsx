import { useContext, useState } from "react";
import PenIcon from "../../assets/icon/pen-icon.png";
import "./EditNote.css";
import { AppContext } from "../../context/Context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'

export const EditNote = () => {
  const {
    setEditCard,
    filterNote,
    notes,
    setNotes,
    boldState,
    setBoldState,
    italicState,
    setItalicState,
    underlineState,
    setUnderlineState,
    selectValue,
    setSelectValue,
    setPinNotes,
    pinNotes,
    favouriteNotes,
    setFavouriteNotes
  } = useContext(AppContext);

  const [divInput, setDivInput] = useState("");

  const BoldText = () => {
    setBoldState(!boldState);
  };
  const ItalicText = () => {
    setItalicState(!italicState);
  };
  const UnderlineText = () => {
    setUnderlineState(!underlineState);
  };

  const GetSelectValue = (event) => {
    setSelectValue(event.target.value);
  };

  const UnRenderNote = () => {
    setEditCard(false);
  };

  const CloseEditModel = () => {
    setEditCard(false);
  };

  const GetDivInput = (e) => {
    setDivInput(e.currentTarget.textContent);
  };

  const UpdateDescriptionText = () => {
    if (divInput) {
      const updateNote = notes?.map((note) =>
        note.id === filterNote.id ? { ...note, description: divInput } : note
      );
  
      const updatePinNote = pinNotes?.map((note)=> note.id === filterNote.id ? {...note, description: divInput} : note)

      const updateFavNote = favouriteNotes?.map((note)=> note.id === filterNote.id ? {...note, description: divInput} : note)

      setNotes((prevState) => [...updateNote]);
      setPinNotes((prevState) => [...updatePinNote]);
      setFavouriteNotes((prevState) => [...updateFavNote]);
    }
    

    setEditCard(false);
  };

  return (
    <div className="edit-note-container">
      <div className="edit-note-contents">
        <div className="edit-note-header">
          <h3>{filterNote?.title}</h3>
          <FontAwesomeIcon icon={faClose} onClick={UnRenderNote} />
        </div>
        <div className="edit-note-styles">
          <select
            id="style-types"
            onChange={GetSelectValue}
            value={selectValue}
          >
            <option value="normal">Normal</option>
            <option value="heading1">Heading 1</option>
            <option value="heading2">Heading 2</option>
            <option value="heading3">Heading 3</option>
            <option value="heading4">Heading 4</option>
            <option value="heading5">Heading 5</option>
            <option value="heading6">Heading 6</option>
          </select>
          <div className="bold-container" onClick={BoldText}>
            B
          </div>
          <div className="italic-container" onClick={ItalicText}>
            I
          </div>
          <div className="underline-container" onClick={UnderlineText}>
            U
          </div>
        </div>
        <div className="note-text-container">
          <div
            className={`${boldState && "bold"} ${italicState && "italic"} ${
              underlineState && "underline"
            }`}
            onChange={() => null}
            contentEditable="true"
            suppressContentEditableWarning={true}
            value={divInput}
            onInput={GetDivInput}
          >
            {selectValue === "heading1" ? (
              <h1>{filterNote?.description}</h1>
            ) : selectValue === "heading2" ? (
              <h2>{filterNote?.description}</h2>
            ) : selectValue === "heading3" ? (
              <h3>{filterNote?.description}</h3>
            ) : selectValue === "heading4" ? (
              <h4>{filterNote?.description}</h4>
            ) : selectValue === "heading5" ? (
              <h5>{filterNote?.description}</h5>
            ) : selectValue === "heading6" ? (
              <h6>{filterNote?.description}</h6>
            ) : (
              selectValue === "normal" && filterNote?.description
            )}
          </div>
        </div>
        <div className="save-edited-not">
          <button className="cancel" onClick={CloseEditModel}>
            Cancel
          </button>
          <button className="save" onClick={UpdateDescriptionText}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
