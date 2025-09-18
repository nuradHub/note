import { useContext, useEffect, useState } from "react";
import UserProfile from "../../assets/icon/user-icon.png";
import './PersonalInformation.css'
import { AppContext } from "../../context/Context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

export const PersonalInformation = () => {

  const {firstName, lastName, userName, city, gender, dob, maritalStatus, age, country, state, address, setFirstName, setLastName, setUserName, setCity, setGender, setDob, setMaritalStatus, setAge, setCountry, setState, setAddress, userId, userData, UpdateToast} = useContext(AppContext)


  const UpdatePersonalInfor = async (event)=> {
    event.preventDefault()
    const id = toast.loading('loading...')

    const userRef = doc(db, 'users', userId)
    try{
     await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        city: city,
        gender: gender,
        dob: dob,
        maritalStatus: maritalStatus,
        age: age,
        country: country,
        state: state,
        address: address
      })

      UpdateToast(id, 'update successful', 'success')
    }catch (error){
      console.log(error.message)
      UpdateToast(id, error.message.split('/')[1].split(')')[0].split('-').join(' '), 'error')
    }
  }

  useEffect(()=> {
    if(userData?.gender){
      setGender(userData?.gender)
    }
  },[userData, setGender])
  return (
    <div className="personal-information-data">
      <h4>Personal Information</h4>
      <hr />
      <div className="profile-image">
        <img src={UserProfile} alt="" />
      </div>
      <form className="personal-information-form" onSubmit={UpdatePersonalInfor}>
        <div className="name-container">
          <div className="first-name-container">
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" value={firstName} placeholder="First Name" onChange={(e)=> setFirstName(e.target.value.trim())} />
          </div>
          <div className="last-name-container">
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" id="last-name" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value.trim())} value={lastName} />
          </div>
        </div>
        <div className="username-container">
          <div className="user-name-container">
            <label htmlFor="user-name">User Name:</label>
            <input type="text" id="user-name" placeholder="User Name" onChange={(e)=> setUserName(e.target.value.trim())} value={userName} />
          </div>
          <div className="city-name-container">
            <label htmlFor="city-name">City:</label>
            <input type="text" id="city-name" placeholder="City" onChange={(e)=> setCity(e.target.value.trim())} value={city} />
          </div>
        </div>
        <div className="gender-dob-container">
          <div className="gender-dob-contents">
            <div className="male-input-container">
              <h4>Gender:</h4>
              <div className="gender-dob-text">
                <div className="male-container">
                  <input type="radio" id="male" value='Male' name="gender" onChange={(e)=> setGender(e.target.value)} checked={gender === 'Male'} />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="female-container">
                  <input type="radio" id="female" value='Female' name="gender" onChange={(e)=> setGender(e.target.value)} checked={gender === 'Female'} />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <div className="dob-input-container">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" onChange={(e)=> setDob(e.target.value)} value={dob} />
            </div>
          </div>
        </div>
        <div className="marital-age-container">
          <div className="marital-status-container">
            <label htmlFor="marital-status">Marital Status:</label>
            <select id="marital-status" onChange={(e)=> setMaritalStatus(e.target.value)} value={maritalStatus}>
              <option value="" disabled>Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </div>
          <div className="age-container">
            <label htmlFor="age">Age:</label>
            <select id="age" onChange={(e)=> setAge(e.target.value)} value={age} >
              <option value="" disabled>Select</option>
              <option value="12-18">12-18</option>
              <option value="19-32">19-32</option>
              <option value="33-45">33-45</option>
              <option value="46-62">46-62</option>
              <option value="63 >">63 &gt;</option>
            </select>
          </div>
        </div>
        <div className="country-state-container">
          <div className="country-container">
            <label htmlFor="country">Country:</label>
            <select id="country" onChange={(e)=> setCountry(e.target.value)} value={country} >
              <option value="" disabled>Select</option>
              <option value="Nigeria">Nigeria</option>
              <option value="USA">USA</option>
              <option value="Caneda">Caneda</option>
              <option value="Noida">Egypt</option>
              <option value="India">Niger</option>
            </select>
          </div>
          <div className="state-container">
            <label htmlFor="state">State:</label>
            <select id="state" onChange={(e)=> setState(e.target.value)} value={state} >
              <option value="" disabled>Select</option>
              <option value="FCT">FCT</option>
              <option value="California">California</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Louisiana">Louisiana</option>
            </select>
          </div>
        </div>
        <div className="address-container">
          <label htmlFor="state">Address:</label>
          <textarea placeholder="Address" onChange={(e)=> setAddress(e.target.value)} value={address} />
        </div>
        <div className="submit-button">
          <button type="submit" className="submit" >
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
