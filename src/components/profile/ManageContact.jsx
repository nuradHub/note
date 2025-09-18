import { useContext } from "react";
import "./ManageContact.css";
import { AppContext } from "../../context/Context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const ManageContact = () => {

 const {setEmail, email, contactNumber, setContactNumber, url, setUrl, userId, UpdateToast} = useContext(AppContext)

  const SubmitContact = async (e)=> {
    e.preventDefault()
    const id = toast.loading('loading...')
    const userRef = doc(db, 'users', userId)

    try{
      await updateDoc(userRef, {
        contactNumber: contactNumber,
        email: email,
        url: url
      })

      UpdateToast(id, 'updated successfully', 'success')

    }catch (error){
      console.log(error.message)
      UpdateToast(id, error.message.split('/')[1].split(')')[0].split('-').join(' '), 'error')
    }
  }

  return (
    <div className="manage-contact-data">
      <h4>Manage Contact</h4>
      <hr />
      <form className="manage-contact-form" onSubmit={SubmitContact}>
        <div className="contact-container">
          <div className="contact-number">
            <label htmlFor="contact-number">Contact Number:</label>
            <input type="tel" id="contact-number" onChange={(e)=> setContactNumber(e.target.value.trim())} value={contactNumber} />
          </div>
          <div className="contact-email">
            <label htmlFor="new-password">Email:</label>
            <input type="email" id="contact-email" onChange={(e)=> setEmail(e.target.value.trim())} value={email} />
          </div>
          <div className="contact-url">
            <label htmlFor="url">URL:</label>
            <input type="link" id="url" onChange={(e)=> setUrl(e.target.value.trim())} value={url} />
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
