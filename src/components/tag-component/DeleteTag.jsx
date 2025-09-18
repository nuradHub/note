import TagIcon from "../../assets/icon/tag-icon.jpg";
import { useContext, useState } from "react";
import "./DeleteTag.css";
import { AppContext } from "../../context/Context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'

export const DeleteTag = () => {
  const { setTags, tags, setDeleteTag, tagId } = useContext(AppContext);

  const UnRenderDeleteTag = () => {
    setDeleteTag(false);
  };

  const DeleteSelectedTag = () => {
    const matchingTag = tags.filter((tag) => tag.id !== tagId)
    setTags(matchingTag)
    setDeleteTag(false)
  };

  return (
    <div className="delete-tag-container">
      <div className="delete-tag-contents">
        <FontAwesomeIcon icon={faCircleExclamation} />
        <h4>Are you sure?</h4>
        <p>You won't be able to revert this!</p>
        <div className="create-new-tag-buttons">
          <button className="create-button" onClick={DeleteSelectedTag}>
            Yes, delete it!
          </button>
          <button className="cancel-button" onClick={UnRenderDeleteTag}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
