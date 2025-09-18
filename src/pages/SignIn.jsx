import { useNavigate } from 'react-router';
import NoteIcon from '../assets/icon/note-icon.jpg'
import './SignIn.css'
import { useContext, useState } from 'react';
import { HandleSignIn } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { AppContext } from '../context/Context';

const SignIn = () => {

  const navigate = useNavigate()
  const {UpdateToast} = useContext(AppContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const NavigateToSignup = ()=> {
    navigate('/signup')
  }

  const NavigateToPasswordReset = ()=> {
    navigate('/reset')
  }

  const HandleSignForm = async (event)=> {
    event.preventDefault()

    const id = toast.loading('loading...')

    try{
      const user = await HandleSignIn(email, password)
      if(user){
        UpdateToast(id, 'Signin successful', 'success')
        navigate('/')
      }
    }catch(error){
      console.log(error.message)
      UpdateToast(id, error.message.split('/')[1].split(')')[0].split('-').join(' '), 'error' )
    }
  }

  return (
    <div className="signin-container">
      <div className='signin-contents'>
        <div className='nurad-note-logo'>
        <img src={NoteIcon} alt="note icon" />
        <h4>NuradNote</h4>
      </div>
      <div className='create-new-account'>
        <h4>Sign In</h4>
        <p>Login to your account</p>
      </div>
      <form className='sign-in-form' onSubmit={HandleSignForm} autoComplete='on' >
        <input type="email" id="email" placeholder="Email" required onChange={(e)=> setEmail(e.target.value.trim())} />
        <input type="password" id="password" placeholder="Password" required onChange={(e)=> setPassword(e.target.value.trim())} />
      
        <div className='terms-condition'>
          <div className='signin-label'>
            <input type="radio"  id="checked"/>
            <label htmlFor="checked">Remember Me</label>
          </div>
          <div className='password-reset' onClick={NavigateToPasswordReset}>Forget Password?</div>
        </div>
        <div className='signin-field'> 
          <button type="submit">Sign In</button>
          <p>Dont have an account? <span onClick={NavigateToSignup}>Sign Up</span></p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
