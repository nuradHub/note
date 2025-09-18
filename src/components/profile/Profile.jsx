import { useState } from "react";
import { PersonalInformation } from "./PersonalInformation";
import './Profile.css'
import { UpdatePassword } from "./UpdatePassword";
import { ManageContact } from "./ManageContact";

export const Profile = () => {
  const [profileState, setProfileState] = useState('personal-information')

  const NavigateToProfile = ()=> {
    setProfileState('personal-information')
  }
  const NavigateToPassword = ()=> {
    setProfileState('update-password')
  }
  const NavigateToContact = ()=> {
    setProfileState('manage-contact')
  }

  return (
    <div className="personal-information-container">
      <div className="personal-information">
        <p onClick={NavigateToProfile} className={profileState === 'personal-information' ? 'personal-information-select' : '' }>Personal Information</p>
        <p onClick={NavigateToPassword} className={profileState === 'update-password' ? 'personal-information-select' : '' } >Change Password</p>
        <p onClick={NavigateToContact} className={profileState === 'manage-contact' ? 'personal-information-select' : '' }>Manage Contact</p>
      </div>
      {
      profileState === 'personal-information' ? 
      <PersonalInformation/>
      :
      profileState === 'update-password' ? 
      <UpdatePassword/>
      :
      <ManageContact/>
      }
    </div>
  );
};
