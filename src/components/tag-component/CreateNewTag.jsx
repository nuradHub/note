import { useContext, useState } from 'react'
import './CreateNewTag.css'
import { AppContext } from '../../context/Context'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router'

export const CreateNewTag = ()=> {

  const navigate = useNavigate()

  const {setNewTag, setTags, tags} = useContext(AppContext)

  const [inputText, setInputText] = useState('')

  const UnRenderNewTag = ()=> {
    setNewTag(false)
  }

  const GetInputText = (event)=> {
    setInputText(event.target.value)
  }

  const AddNewTag = ()=> {

    if(!auth.currentUser){
      navigate('signin')
      return;
    }

    if(inputText && inputText !== ''){
      setTags([...tags, {
      id: crypto.randomUUID(),
      text: inputText,
      createdAt: new Date()
    }])
       setNewTag(false)
    }
  }

  const AddTagWithKey = (e)=> {
    if(e.key === 'Enter'){
      AddNewTag()
    }
  }

  return(
    <div className='create-new-tag-container'>
      <div className='create-new-tag-contents'>
        <h4>Create New Tag</h4>
        <input type="text" id="tag-name" placeholder='Enter Tag Name' onChange={GetInputText} onKeyDown={AddTagWithKey} />
        <div className='create-new-tag-buttons'>
          <button className='create-button' onClick={AddNewTag} >Create</button>
          <button className='cancel-button' onClick={UnRenderNewTag}>Cancel</button>
        </div>
      </div>
    </div>
  )
}