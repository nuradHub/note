import { doc, getDoc } from "firebase/firestore";
import { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";

export const AppContext = createContext()

const AppContextProvider = (prop)=> {

  const [headerState, setHeaderState] = useState('Your Note')
  const [viewCard, setViewCard] = useState(false)
  const [editCard, setEditCard] = useState(false)
  const [deleteCard, setDeleteCard] = useState(false)
  const [newTag, setNewTag] = useState(false)
  const [renameTag, setRenameTag] = useState(false)
  const [deleteTag, setDeleteTag] = useState(false)
  const [tagContainer, setTagContainer] = useState(false);
  const [boldState, setBoldState] = useState(false);
  const [italicState, setItalicState] = useState(false);
  const [underlineState, setUnderlineState] = useState(false);
  const [viewDeleteNote, setViewDeleteNote] = useState(false);
  const [togglePinNote, setTogglePinNote] = useState(false);
  const [selectValue, setSelectValue] = useState("normal");
  const [noteCollection, setNoteCollection] = useState("all");
  const [tableCollection, setTableCollection] = useState("all-note-table");
  const [priority, setPriority] = useState("");
  const [tagId, setTagId] = useState("");
  const [filterNote, setFilterNote] = useState(null)
  const [deletedNote, setDeletedNote] = useState([])
  const [matchDeletedNote, setMatchDeletedNote] = useState(null);
  const [pinNotes, setPinNotes] = useState([]);
  const [favouriteNotes, setFavouriteNotes] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState(userData?.gender || '')
  const [dob, setDob] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [url, setUrl] = useState('')
  const [altEmail, setAltEmail] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [google, setGoogle] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  const [language, setLanguage] = useState([])
  const [english, setEnglish] = useState(userData?.language?.english === 'French' || '')
  const [french, setFrench] = useState(userData?.language?.french === 'French' || '')
  const [spanish, setSpanish] = useState(userData?.language?.spanish === 'French' || '')
  const [arabic, setArabic] = useState(userData?.language?.arabic === 'French' || '')
  const [italian, setItalian] = useState(userData?.language?.italian === 'French' || '')
  const [toggle, setToggle] = useState(false)

  const [notes, setNotes] = useState([/*{
    id: '1',
    title: 'HTML',
    description: 'HyperText MarkUp Language',
    reminderDate: '12-december-2025',
    icon: 'chat',
    priority: 'medium',
    createdAt: Date.now(),
    isPinned: false,
    boldState: boldState
  },{
    id: '2',
    title: 'CSS',
    description: 'Cascading Stylesheet',
    reminderDate: '14-december-2025',
    icon: 'card',
    priority: 'low',
    createdAt: Date.now(),
    isPinned: false,
    boldState: false
  }*/])

  const [tags, setTags] = useState([
    /*{
      id: "123",
      text: "Afternoon",
      createdAt: Date.now(),
    },{
      id: "456",
      text: "Morning",
      createdAt: Date.now(),
    },{
      id: "789",
      text: "Evening",
      createdAt: Date.now(),
  }*/]);

  const bcolor = {
    blow: "blow",
    bveryLow: "bvery-low",
    bhigh: "bhigh",
    bveryHigh: "bvery-high",
    bmedium: "bmedium",
    bdefault: "bdefault",
  };

  const color = {
    low: "low",
    veryLow: "very-low",
    high: "high",
    veryHigh: "very-high",
    medium: "medium",
    default: "default",
  };

  const UpdateToast = (id, message, type, isLoading= false )=> {
    toast.update(id, {render: message, type: type, autoClose: 2000, isLoading: isLoading})
  }

  const StoreUserData = useCallback(async (id)=> {
    setUserId(id)  
    const userRef = doc(db, 'users', id)
    const request = await getDoc(userRef)
    const user = request.data()
    setUserData(user)
    //console.log(user)
    if(user){
      setAddress(user.address)
      setAge(user.age)
      setCity(user.city)
      setContactNumber(user.contactNumber)
      setCountry(user.country)
      setDob(user.dob)
      setEmail(user.email)
      setFacebook(user.facebook)
      setFirstName(user.firstName)
      //setGender(user.gender)
      setGoogle(user.google)
      setInstagram(user.instagram)
      setLanguage(user.language)
      setLastName(user.lastName)
      setMaritalStatus(user.maritalStatus)
      setState(user.state)
      setTwitter(user.twitter)
      setUrl(user.url)
      setUserName(user.userName)
      setYoutube(user.youtube)
    }
  },[])

  const value = {
    headerState, setHeaderState, AppContext, viewCard,
    setViewCard, editCard, setEditCard, deleteCard,
    setDeleteCard, noteCollection, setNoteCollection,
    newTag, setNewTag, tags, setTags, tagContainer,
    setTagContainer, renameTag, setRenameTag, deleteTag, setDeleteTag,
    tagId, setTagId, tableCollection, setTableCollection,
    notes, setNotes, color, bcolor, priority, setPriority,
    filterNote, setFilterNote, boldState, setBoldState,
    italicState, setItalicState, underlineState, setUnderlineState,
    selectValue, setSelectValue, deletedNote, setDeletedNote,
    matchDeletedNote, setMatchDeletedNote, viewDeleteNote, setViewDeleteNote,
    togglePinNote, setTogglePinNote, pinNotes, setPinNotes,
    setFavouriteNotes, favouriteNotes, searchResult, setSearchResult,
    UpdateToast,userData, setUserData, StoreUserData, firstName, setFirstName
    ,lastName, setLastName, userName, setUserName, city, setCity, gender, 
    setGender, dob, setDob, maritalStatus, setMaritalStatus, age, setAge, 
    country, setCountry, state, setState, address, setAddress, userId, email, setEmail,
    setContactNumber, contactNumber, url, setUrl, altEmail, setAltEmail, facebook, 
    setFacebook, twitter, setTwitter, google, setGoogle, instagram, setInstagram, 
    youtube, setYoutube, language, setLanguage, english, setEnglish, french, setFrench, 
    spanish, setSpanish, arabic, setArabic, italian, setItalian,
    toggle, setToggle
  }

  return(
    <AppContext.Provider value={value} >
      {prop.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider