import NoteIcon from "../assets/icon/note-icon.png";
import UserProfile from "../assets/icon/user-icon.png";
import UserIcon from "../assets/icon/user-icon-1.jpg";
import UserIcon2 from "../assets/icon/user-icon-2.png";
import LogOutIcon from "../assets/icon/logout-icon.jpg";
import NoteIcon1 from "../assets/icon/note-icon-2.jpg";
import NoteIcon2 from "../assets/icon/note-icon-3.jpg";
import TagIcon from "../assets/icon/tag-icon.jpg";
import BinIcon from "../assets/icon/bin-icon.jpg";
import DropDown from "../assets/icon/dropdown-icon.png";
import "./LeftSideBar.css";
import { useContext, useState } from "react";
import { AppContext } from "../context/Context";
import { auth, HandleSignOut } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LeftSideBar = () => {
  const navigate = useNavigate();

  const [menuState, setMenuState] = useState(false);

  const {
    setHeaderState,
    tagContainer,
    setTagContainer,
    notes,
    setSearchResult,
    setNoteCollection,
    toggle, setToggle
  } = useContext(AppContext);

  const DropDownMenu = () => {
    setMenuState(!menuState);
  };

  const RenderNotes = () => {
    setHeaderState("Your Note");
    setToggle(false)
  };
  const RenderNoteBook = () => {
    setHeaderState("NoteBook");
    setToggle(false)
  };
  const RenderTag = () => {
    setTagContainer(!tagContainer);
    setToggle(false)
  };
  const RenderBin = () => {
    setHeaderState("Bin");
    setToggle(false)
  };
  const RenderProfile = () => {
    setHeaderState("Your Profile");
    setToggle(false)
  };
  const RenderAccountSetting = () => {
    setHeaderState("Account Setting");
    setToggle(false)
  };

  const AddNewNote = () => {
    setHeaderState("New Note");
    setToggle(false)
  };

  const SearchNote = (event) => {
    const searchInput = event.target.value.trim().toLowerCase();
    if (searchInput && searchInput !== "") {
      const matchNote = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchInput) ||
          note.description.toLowerCase().includes(searchInput)
      );
      setNoteCollection("all");
      setSearchResult([...matchNote]);
    }
  };

  const SignOut = async () => {
    await HandleSignOut();
    navigate("/signin");
  };

  return (
    <div className={`left-side-container ${toggle && 'toggle-side-bar'}`}>
      <div className="left-icon-format">
        <div className="left-side-header">
        <img src={NoteIcon} alt="" />
        <p>NuradNote</p>
        </div>
        {toggle && <FontAwesomeIcon icon={faTimes} onClick={()=> setToggle(false)} />}
      </div>
      <hr />
      <div className="left-side-contents">
        <div className="profile-container">
          <div className="profile-details">
            <img src={UserProfile} alt="" />
            <p>Nurudeen</p>
          </div>
          <div className="profile-drop-down-container">
            <img src={DropDown} alt="" onClick={DropDownMenu} />
          </div>
        </div>
        <div
          className={` user-profile-container-preview  ${
            menuState && "user-profile-container"
          }`}
        >
          <div className="user-profile" onClick={RenderProfile}>
            <img src={UserIcon} alt="" />
            <p>My Profile</p>
          </div>
          <div className="user-account-setting" onClick={RenderAccountSetting}>
            <img src={UserIcon2} alt="" />
            <p>Account Settings</p>
          </div>
          <hr />
          <div className="user-logout" onClick={SignOut}>
            <img src={LogOutIcon} alt="" />
            <p>Logout</p>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            onChange={SearchNote}
            id="search"
          />
        </div>
        <div className="new-note-button">
          <button onClick={AddNewNote}>Add New Note</button>
        </div>
        <div className="note-contents" onClick={RenderNotes}>
          <img src={NoteIcon1} alt="" />
          <p>Your Notes</p>
        </div>
        <div className="note-book" onClick={RenderNoteBook}>
          <img src={NoteIcon2} alt="" />
          <p>Notebooks</p>
        </div>
        <div className="tags" onClick={RenderTag}>
          <img src={TagIcon} alt="" />
          <p>Tags</p>
        </div>
        <div className="bin" onClick={RenderBin}>
          <img src={BinIcon} />
          <p>Bin</p>
        </div>
      </div>
    </div>
  );
};
