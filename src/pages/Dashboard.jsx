import { useContext } from "react";
import { LeftSideBar } from "../components/LeftSideBar";
import { MiddleSideBar } from "../components/MiddleSideBar";
import { ViewNote } from "../components/note-component/ViewNote";
import './Dashboard.css'
import { AppContext } from "../context/Context";
import { EditNote } from "../components/note-component/EditNote";
import { TagComponent } from "../components/tag-component/TagComponent";
import { CreateNewTag } from "../components/tag-component/CreateNewTag";
import { RenameTag } from "../components/tag-component/RenameTag";
import { DeleteTag } from "../components/tag-component/DeleteTag";
import { ViewDeleteNote } from "../components/note-component/ViewDeleteNote";

const Dashboard = () => {

  const {viewCard, editCard, newTag, renameTag, deleteTag, viewDeleteNote} = useContext(AppContext)

  return (
    <>
      {viewCard && <ViewNote/> }
      {viewDeleteNote && <ViewDeleteNote/> }
      {editCard && <EditNote/> }
      {newTag && <CreateNewTag/> }
      {renameTag && <RenameTag/> }
      {deleteTag && <DeleteTag/> }
      <div className="dashboard-container">
        <LeftSideBar/>
        <MiddleSideBar />
        <TagComponent/>
      </div>
    </>
  );
};
export default Dashboard;
