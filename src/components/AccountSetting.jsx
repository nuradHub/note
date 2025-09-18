import { useContext, useEffect } from "react";
import "./AccountSetting.css";
import { AppContext } from "../context/Context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

export const AccountSetting = () => {

  const {email, userName, setEmail, setUserName, altEmail, setAltEmail, facebook, setFacebook, twitter, setTwitter, google, setGoogle, instagram, setInstagram, youtube, setYoutube, userData, userId, UpdateToast, english, setEnglish, french, setFrench, spanish, setSpanish, arabic, setArabic, italian, setItalian } = useContext(AppContext)

  const HandleAccountSetting = async (event)=> {
    event.preventDefault()
    const id = toast.loading('loading...')
    const userRef = doc(db, 'users', userId)

    try{
      await updateDoc(userRef, {
        userName: userName,
        email: email,
        altEmail: altEmail,
        language: {
          english: english,
          french: french,
          spanish: spanish,
          arabic: arabic,
          italian: italian
        }
      })

       UpdateToast(id, 'Account updated successfully', 'success')
    }catch (error){
      console.log(error.message)
      UpdateToast(id, error.message.split('/')[1].split(')')[0].split('-').join(' '), 'error' )
    }
    
  }

  const HandleSocialMedia = async (event)=> {
    event.preventDefault()

    const id = toast.loading('loading...')
    const userRef = doc(db, 'users', userId)

    try{
      await updateDoc(userRef, {
        facebook: facebook,
        twitter: twitter,
        google: google,
        instagram: instagram,
        youtube: youtube
      })

       UpdateToast(id, 'Social updated successfully', 'success')
    }catch (error){
      console.log(error.message)
      UpdateToast(id, error.message.split('/')[1].split(')')[0].split('-').join(' '), 'error' )
    }
  }

  useEffect(()=> {
    if(userData?.language){
      if(userData?.language?.english) setEnglish(userData.language.english)
      if(userData?.language?.italian) setItalian(userData.language.italian)
      if(userData?.language?.french) setFrench(userData.language.french)
      if(userData?.language?.arabic) setArabic(userData.language.arabic)
      if(userData?.language?.spanish) setSpanish(userData.language.spanish)
    }

  },[userData])

  return (
    <div className="account-setting-container">
      <div className="account-setting-data">
        <h4>Account Setting</h4>
        <hr />
        <form className="account-setting-form" onSubmit={HandleAccountSetting}>
          <div className="user-name">
            <label htmlFor="contact-number">User Name:</label>
            <input type="text" id="user-name" onChange={(e)=> setUserName(e.target.value.trim())} value={userName} />
          </div>
          <div className="account-email-container">
            <label htmlFor="account-email">Email:</label>
            <input type="email" id="account-email" onChange={(e)=> setEmail(e.target.value.trim())} value={email} />
          </div>
          <div className="alternative-email-container">
            <label htmlFor="alternative-email">Alternative Email:</label>
            <input type="email" id="alternative-email" onChange={(e)=> setAltEmail(e.target.value)} value={altEmail} />
          </div>

          <div className="language-container">
            <h5>Language Known:</h5>
            <div className="language-contents">
              <div className="english-container">
                <input type="radio" value='English' id="english" onChange={(e)=> setEnglish(e.target.value)} checked={english === 'English'} />
                <label htmlFor="english">English</label>
              </div>
              <div className="french-container">
                <input type="radio" id="french" value='French' onChange={(e)=> setFrench(e.target.value)}  checked={french === 'French'} />
                <label htmlFor="french">French</label>
              </div>
              <div className="spanish-container">
                <input type="radio" id="spanish" value='Spanish' onChange={(e)=> setSpanish(e.target.value)} checked={spanish === 'Spanish'} />
                <label htmlFor="spanish">Spanish</label>
              </div>
              <div className="arabic-container">
                <input type="radio" id="arabic" value='Arabic' onChange={(e)=> setArabic(e.target.value)}  checked={arabic === 'Arabic'}  />
                <label htmlFor="arabic">Arabic</label>
              </div>
              <div className="italian-container">
                <input type="radio" id="italian" value='Italian' onChange={(e)=> setItalian(e.target.value)} checked={italian === 'Italian'} />
                <label htmlFor="italian">Italian</label>
              </div>
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
      <div className="social-media-data">
        <h4>Social Media</h4>
        <hr />
        <form className="social-media-form" onSubmit={HandleSocialMedia}>
          <div className="facebook-container">
            <label htmlFor="facebook">Facebook:</label>
            <input type="link" id="facebook" onChange={(e)=> setFacebook(e.target.value.trim())} value={facebook} />
          </div>
          <div className="twitter-container">
            <label htmlFor="twitter">Twitter:</label>
            <input type="link" id="twitter" onChange={(e)=> setTwitter(e.target.value.trim())} value={twitter} />
          </div>
          <div className="google-container">
            <label htmlFor="google">Google:</label>
            <input type="link" id="google" onChange={(e)=> setGoogle(e.target.value.trim())} value={google} />
          </div>
          <div className="instagram-container">
            <label htmlFor="intagram">Instagram:</label>
            <input type="link" id="instagram" onChange={(e)=> setInstagram(e.target.value)} value={instagram} />
          </div>
          <div className="youtube-container">
            <label htmlFor="youtube">Youtube:</label>
            <input type="link" id="youtube" onChange={(e)=> setYoutube(e.target.value.trim())} value={youtube} />
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
    </div>
  );
};
