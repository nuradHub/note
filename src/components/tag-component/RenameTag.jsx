import { useContext, useState } from "react";
import "./RenameTag.css";
import { AppContext } from "../../context/Context";

export const RenameTag = () => {
  const { setTags, tags, setRenameTag, tagId } = useContext(AppContext);

  const [inputText, setInputText] = useState("");

  const UnRenderNewTag = () => {
    setRenameTag(false);
  };

  const GetInputText = (event) => {
    setInputText(event.target.value);
  };

  const ChangeTagName = () => {
    if (inputText && inputText !== "") {
      const matchingTag = tags.map((tag) =>
        tag.id === tagId ? { ...tag, text: inputText } : tag
      );
      setTags(matchingTag);
      setRenameTag(false);
    }
  };

  const RenameTagWithKey = (e) => {
    if (e.key === "Enter") {
      ChangeTagName();
    }
  };

  return (
    <div className="rename-tag-container">
      <div className="rename-tag-contents">
        <h4>Rename Your Tag</h4>
        <input
          type="text"
          id="tag-name"
          placeholder="Enter Tag Name"
          onChange={GetInputText}
          onKeyDown={RenameTagWithKey}
        />
        <div className="create-new-tag-buttons">
          <button className="create-button" onClick={ChangeTagName}>
            Rename
          </button>
          <button className="cancel-button" onClick={UnRenderNewTag}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
