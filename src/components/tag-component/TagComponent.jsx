import {useContext, useState } from "react";
import PenIcon from "../../assets/icon/pen-icon.png";
import "./TagComponent.css";
import { AppContext } from "../../context/Context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsis, faCircleXmark, faPlus, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

export const TagComponent = () => {
  const {
    newTag,
    setNewTag,
    tags,
    tagContainer,
    setTagContainer,
    renameTag,
    setRenameTag,
    tagId,
    setTagId,
    deleteTag,
    setDeleteTag,
  } = useContext(AppContext);

  const [displayTag, setDisplayTag] = useState(false);

  const RenderTag = (id) => {
    let matchingTag = tags.find(tag=> {
      if(tag.id === id){
        return tag
      }
    })
    setTagId(matchingTag.id)
    setDisplayTag(!displayTag)
  };

  const TagDisplay = () => {
    displayTag === true && setDisplayTag(false);
  };
  const CloseTagBar = ()=> {
    setTagContainer(!tagContainer)
  }
  const RenderCreatedTag = () => {
    setNewTag(!newTag);
  };

  const RenderRenameTag = () => {
    setRenameTag(!renameTag);
  };

  const RenderDeleteTag = () => {
    setDeleteTag(!deleteTag);
  };

  return (
    <div
      className={`tag-container ${tagContainer && "display-tag-container"}`}
      onClick={TagDisplay}
    >
      <div className="tag-contents">
        <FontAwesomeIcon icon={faCircleXmark} onClick={CloseTagBar}/>

        <div className="tag-list-header">
          <h4>Tag List</h4>
          <FontAwesomeIcon icon={faPlus} onClick={RenderCreatedTag}/>
        </div>

        <div className="tag-list-text-container">
          {tags &&
           tags.sort((a,b)=> b.createdAt - a.createdAt).map((tag) => {
              return (
                <div key={tag.id} className="tag-lists">
                  <div  className="tag-list-text">
                    <h3>{tag.text.split('')[0].toUpperCase()}</h3>
                    <p>{tag.text}</p>
                  </div>
                  <div className="tag-image">
                    <FontAwesomeIcon icon={faEllipsis} onClick={()=> RenderTag(tag.id)} />
                  </div>
                 {tag.id === tagId && 
                  <div className={`edit-tag-container ${displayTag && "display-tag"}`} >
                  <div className="tag-edit-content" onClick={RenderRenameTag} >
                    <FontAwesomeIcon icon={faPenToSquare}/>
                    Rename
                  </div>
                  <div className="tag-edit-content" onClick={RenderDeleteTag} >
                    <FontAwesomeIcon icon={faTrash}/>
                    Delete
                  </div>
                </div>
                }
                </div>
                
              );
            })}
        </div>
      </div>
    </div>
  );
};

/*



*/
