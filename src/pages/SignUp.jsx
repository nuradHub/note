import { useNavigate } from 'react-router';
import NoteIcon from '../assets/icon/note-icon.jpg'
import './SignUp.css'
import { useContext, useEffect, useState } from 'react';
import { HandleNewUser } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { AppContext } from '../context/Context';

const Signup = () => {

  const {UpdateToast} = useContext(AppContext)

  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checkState, setCheckState] = useState(false)
  const [check, setCheck] = useState(false)

  const NavigateToSignIn = ()=> {
    navigate('/signin')
  }

  const HandleSubmitForm = async (event)=> {
    event.preventDefault()
    if(check === false){
      setCheckState(!checkState)
      return;
    };

    if(password !== confirmPassword){
      toast.error('Password Does not match')
      return;
    }

    console.log(email, password, firstName, lastName, confirmPassword)
    const id = toast.loading('loading...')

    try{

      const user = await HandleNewUser(email, password, firstName, lastName, check)

      console.log(user)
      if(user){
        UpdateToast(id, 'Signup successful', 'success')
        navigate('/signin')
      };

    }catch (error){
      console.log(error.message)
      UpdateToast(id, error.message.split('/')[1].split(')')[0].split('-').join(' '), 'error' )
    }

  }

  useEffect(()=> {
    if(checkState){
      const TimeOut = setTimeout(()=> {
        setCheckState(false)
      },2000)
      
    return ()=> {
      clearTimeout(TimeOut)
    }
    }
   
  },[checkState])

  return (
    <div className="signup-container">
      <div className='signup-contents'>
        <div className='nurad-note-logo'>
        <img src={NoteIcon} alt="note icon" />
        <h4>NuradNote</h4>
      </div>
      <div className='create-new-account'>
        <h4>Sign Up</h4>
        <p>Create your account</p>
      </div>
      <form className='sign-up-form' onSubmit={HandleSubmitForm}>
        <div className='name-field'>
          <input type="text" id="first-name" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value.trim())} required />
          <input type="text" id="last-name" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value.trim())} required />
        </div>
        <input type="email" id="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value.trim())} required />
        <div className='password-field'>
          <input type="password" id="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value.trim())} required />
          <input type="password" id="confirm-password" placeholder="Confirm Password" onChange={(e)=> setConfirmPassword(e.target.value.trim())} required />
        </div>
      
        <div className='terms-conditions'>
         <div className='terms-conditions-contents'>
           <input type="radio"  id="checked" checked={check} onClick={()=> setCheck(true)} onChange={()=> null} required />
          <label htmlFor="checked">I agree with the terms of use</label>
         </div>
          <span className={`check-notify-container ${checkState && 'check-notify' }`}>please check the input field</span>
        </div>
        <div className='submit-field'> 
          <button type="submit">Sign Up</button>
          <p>Already have an Account? <span onClick={NavigateToSignIn}>Sign in</span></p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
