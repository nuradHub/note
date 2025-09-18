import { useContext } from "react";
import { AppContext } from "../context/Context";
import { HeaderText } from "./header-text/HeaderText";
import { NoteComponent } from "./note-component/NoteComponent";
import { Profile } from "./profile/Profile";
import { AccountSetting } from "./AccountSetting";
import './MiddleSideBar.css'
import { NoteBookTable } from "./note-component/NoteBookTable";
import { DeletedNote } from "./note-component/DeletedNote";
import { CreateNewNote } from "./note-component/CreateNewNote";

export const MiddleSideBar = () => {
  const { headerState } = useContext(AppContext);

  return (
    <div className="middle-side-container">
      <HeaderText />
      {headerState === "Your Note" ?
        <NoteComponent />
      : headerState === "Your Profile" ? 
        <Profile />
       : 
        headerState === "Account Setting" ? <AccountSetting />
       : 
        headerState === "NoteBook" ? <NoteBookTable/>
        :
        headerState === 'Bin' ? <DeletedNote/>
        :
        headerState === 'New Note' && <CreateNewNote />
      }
      <div className="footer-contents">
        <p>NuradNote &copy; 2025 </p>
        <p>
          Designed by <span>nuradHub</span>
        </p>
      </div>
    </div>
  );
};
