import { useContext, useState } from "react";
import "./UpdatePassword.css";
import { auth } from "../../firebase/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { AppContext } from "../../context/Context";
import { useNavigate } from "react-router";

export const UpdatePassword = () => {

  const navigate = useNavigate()

  const {UpdateToast} = useContext(AppContext)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const HandleUpdatePassword = async (event)=> {
    event.preventDefault()
    const id = toast.loading('loading...')

    try{
      const user = auth.currentUser
      if(!user)return;

      const cred = EmailAuthProvider.credential(user.email, currentPassword)

      await reauthenticateWithCredential(user, cred)

      if(newPassword !== verifyPassword){
        UpdateToast(id, 'password does not match', 'error')
        return;
      }

      await updatePassword(user, newPassword)

      UpdateToast(id, 'password updated successfully', 'success')
    }catch (error){
      console.log(error.message)
      UpdateToast(id, error.message.split('/')[1].split(')')[0].split('-').join(' '), 'error' )
    }

  }

  return (
    <div className="update-password-data">
      <h4>Change Password</h4>
      <hr />
      <form className="update-password-form" onSubmit={HandleUpdatePassword}>
        <div className="current-password-container">
          <div className="current-password">
            <div className="current-password-options">
              <label htmlFor="current-password">Current Password:</label>
              <p onClick={()=> navigate('/reset')}>Forgot Password?</p>
            </div>
            <input type="password" id="current-password" onChange={(e)=> setCurrentPassword(e.target.value.trim())} />
          </div>
          <div className="new-password">
            <label htmlFor="new-password">New Password:</label>
            <input type="password" id="new-password" onChange={(e)=> setNewPassword(e.target.value.trim())} />
          </div>
          <div className="verify-password">
            <label htmlFor="verify-password">Verify Password:</label>
            <input type="password" id="verify-password" onChange={(e)=> setVerifyPassword(e.target.value)} />
          </div>
        </div>
        
        <div className="submit-button">
          <button type="submit" className="submit">
            Submit
          </button>
          <button type="reset" className="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
