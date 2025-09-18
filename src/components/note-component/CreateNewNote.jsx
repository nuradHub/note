import { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import EditIcon from "../../assets/icon/edit-icon.png";
import Slider from "../../assets/icon/slider-icon.png";
import "./CreateNewNote.css";
import { AppContext } from "../../context/Context";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { auth } from "../../firebase/firebase";

export const CreateNewNote = () => {

  const navigate = useNavigate()

  const {setNotes, notes, color, priority, setPriority, setHeaderState} = useContext(AppContext)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [remiderDate, setReminderDate] = useState("");
  const [cardValue, setCardValue] = useState("");
  //const [saveNoteState, setSaveNoteState] = useState(false)

  const GetTitleText = (event) => {
    setTitle(event.target.value);
  };
  const GetDescriptionText = (event) => {
    setDescription(event.target.value);
  };
  const GetDateText = (event) => {
    setReminderDate(event.target.value);
  };
  const GetPriorityText = (event) => {
    setPriority(event.target.value);
  };
  const GetCardValue = (event) => {
    setCardValue(event.target.value)
  };
 
  const SaveNote = (e) => {
    //e.preventDefault()
    if(!title)return;
    if(!description)return;
    if(!remiderDate)return;

    const noteObject = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      reminderDate: remiderDate,
      icon: cardValue,
      priority: priority,
      createdAt: Date.now(),
      isPinned: false
    }
    
    if(!auth.currentUser){
      navigate('/signin') 
      return
    }

    setNotes((prevState)=> [...notes, noteObject])
    setTitle('')
    setDescription('')
    setReminderDate('')
    setPriority('')
    setHeaderState('Your Note')
    //setSaveNoteState(true)
  };

  const ResetNoteField = ()=> {
    setTitle('')
    setDescription('')
    setReminderDate('')
    setPriority('')
  }

  return (
    <div className="new-note-container">
      <div className="new-note-content">
        <div className="left-content-container" >
          <div className="title-container">
            Title
            <input type="text" id="title" value={title} required onChange={GetTitleText} />
          </div>
          <div className="description-container">
            Description
            <textarea type="text" id="description" required value={description} onChange={GetDescriptionText}></textarea>
          </div>
          <div className="reminder-container">
            Reminder Date
            <input type="date" id="date" required value={remiderDate} onChange={GetDateText} />
          </div>
          <div className="icon-container">
            Icon
            <div className="icon-images">
              <label>
                <input type="radio" value='card' onClick={GetCardValue} />
                <img src={EditIcon} alt="" />
              </label>
              <label>
                <input type="radio" value='chat' onClick={GetCardValue}/>
                <img src={Slider} alt="" />
              </label>
            </div>
          </div>
          <div className="priority-container" >
            Priority
            <select id="priority" value={priority} onChange={GetPriorityText}>
              <option value="default">Default</option>
              <option value="low">Low</option>
              <option value="very-low">Very Low</option>
              <option value="high">High</option>
              <option value="very-high">Very High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <div className="button-container">
            <button onClick={ResetNoteField}>
              <img src={EditIcon} alt="" className="reset-button" />
              Reset
            </button>
            <button type="button" className="save-button" onClick={SaveNote}>
              <img src={EditIcon} alt="" />
              Save
            </button>
          </div>
        </div>

        <div
          className={`right-content-container
          ${
            priority === "low"
              ? "container-low"
              : priority === "very-low"
              ? "container-very-low"
              : priority === "high"
              ? "container-high"
              : priority === "very-high"
              ? "container-very-high"
              : priority === "medium"
              ? "container-medium"
              : priority === "default" ? "container-default"
              : "container-default"
          }
          
          `}
        >
          <div className="right-content">
            <div className="right-content-icons">
              {cardValue === 'card' ? <img src={EditIcon} alt="" /> :
              cardValue === 'chat' && <img src={Slider} alt="" />}
            </div>
            <div className="right-content-data">
              {title.length === 0 ? <h3>Title Template</h3> : <h3>{title}</h3>}
              {description.length === 0 ? <p>Description Template</p> : <p>{description}</p>}
              
            </div>
          </div>

          <div className="right-footer-container">
            <div className="right-footer-content">
              <div className="user-access">
                <FontAwesomeIcon icon={faUser} className={`
                  ${
                priority === "low"
                  ? color.low
                  : priority === "very-low"
                  ? color.veryLow
                  : priority === "high"
                  ? color.high
                  : priority === "very-high"
                  ? color.veryHigh
                  : priority === "medium"
                  ? color.medium
                  : priority === "default" ? color.default
                  : color.default
              }
              `} />
                Only Me
              </div>
              <div className="date-current">
                <FontAwesomeIcon icon={faCalendarWeek} className={`
                  ${
                priority === "low"
                  ? color.low
                  : priority === "very-low"
                  ? color.veryLow
                  : priority === "high"
                  ? color.high
                  : priority === "very-high"
                  ? color.veryHigh
                  : priority === "medium"
                  ? color.medium
                  : priority === "default" ? color.default
                  : color.default
              }
              `} />
                {remiderDate.split('-').join('/')}
              </div>
            </div>
            <div
              className={`priority-color-line
              ${
                priority === "low"
                  ? color.low
                  : priority === "very-low"
                  ? color.veryLow
                  : priority === "high"
                  ? color.high
                  : priority === "very-high"
                  ? color.veryHigh
                  : priority === "medium"
                  ? color.medium
                  : priority === "default" ? color.default
                  : color.default
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
