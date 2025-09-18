import { useContext } from "react";
import PenIcon from "../../assets/icon/pen-icon.png";
import "./HeaderText.css";
import { AppContext } from "../../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBookBookmark } from "@fortawesome/free-solid-svg-icons";

export const HeaderText = () => {
  const { headerState, notes, deletedNote, toggle, setToggle } = useContext(AppContext);

  return (
    <div className="header-container">
      <div>
        {headerState === "Your Note" ? (
          <div className="header-contents">
            <FontAwesomeIcon icon={faBookBookmark} />
            Your Note {`(${notes.length} Notes)`}
          </div>
        ) : headerState === "NoteBook" ? (
          <div className="header-contents">
            <img src={PenIcon} alt="" />
            NoteBook {`(${notes.length} Notes)`}
          </div>
        ) : headerState === "Bin" ? (
          <div className="header-contents">
            <img src={PenIcon} alt="" />
            Your Deleted Items {`(${deletedNote.length} Notes)`}
          </div>
        ) : headerState === "Your Profile" ? (
          <div className="header-contents">
            <img src={PenIcon} alt="" />
            Your Profile
          </div>
        ) : headerState === "Account Setting" ? (
          <div className="header-contents">
            <img src={PenIcon} alt="" />
            Account Setting
          </div>
        ) : (
          headerState === "New Note" && (
            <div className="header-contents">
              <img src={PenIcon} alt="" />
              New Note
            </div>
          )
        )}
      </div>
      <div className="font-awesome-container">
        {!toggle && <FontAwesomeIcon icon={faBars} onClick={()=> setToggle(true)} />}
      </div>
    </div>
  );
};
