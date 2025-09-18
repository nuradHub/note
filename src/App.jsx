import { Routes, Route, useNavigate } from "react-router";
import "./App.css";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { AppContext } from "./context/Context";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

const SignUp = React.lazy(()=> import('./pages/SignUp'))
const SignIn = React.lazy(()=> import('./pages/SignIn'))
const ResetPassword = React.lazy(()=> import('./pages/ResetPassword'))
const Dashboard = React.lazy(()=> import('./pages/Dashboard'))

function App() {
  const navigate = useNavigate();

  const {
    setNotes,
    notes,
    deletedNote,
    setDeletedNote,
    pinNotes,
    setPinNotes,
    setFavouriteNotes,
    favouriteNotes,
    StoreUserData,
    tags,
    setTags,
  } = useContext(AppContext);
  const [hasLoad, setHasLoad] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        StoreUserData(user.uid);
        setUserId(user.uid);
      }
    });

    return () => unSubscribe();
  }, [StoreUserData, navigate]);

  useEffect(() => {
    if (!userId) return;

    const getNotes = JSON.parse(localStorage.getItem(`notes${userId}`));
    const deletedNote = JSON.parse(localStorage.getItem(`deletedNote${userId}`));
    const pinNote = JSON.parse(localStorage.getItem(`pinNotes${userId}`));
    const favouriteNote = JSON.parse(localStorage.getItem(`favouriteNotes${userId}`));
    const tag = JSON.parse(localStorage.getItem(`tags${userId}`));

    if (getNotes) {
      const sorted = [...getNotes].sort((a, b) => b.createdAt - a.createdAt);
      setNotes(sorted);
    }
    if (deletedNote) {
      const sorted = [...deletedNote].sort((a, b) => b.createdAt - a.createdAt);
      setDeletedNote(sorted);
    }
    if (pinNote) {
      const sorted = [...pinNote].sort((a, b) => b.createdAt - a.createdAt);
      setPinNotes(sorted);
    }
    if (favouriteNote) {
      const sorted = [...favouriteNote].sort(
        (a, b) => b.createdAt - a.createdAt
      );
      setFavouriteNotes(sorted);
    }
    if (tag) {
      const sorted = [...tag].sort((a, b) => b.createdAt - a.createdAt);
      setTags(sorted);
    }
    setHasLoad(true);
  }, [userId]);

  useEffect(() => {
    if (!userId || !hasLoad) return;

    localStorage.setItem(`notes${userId}`, JSON.stringify(notes));
    localStorage.setItem(`deletedNote${userId}`, JSON.stringify(deletedNote));
    localStorage.setItem(`pinNotes${userId}`, JSON.stringify(pinNotes));
    localStorage.setItem(`favouriteNotes${userId}`, JSON.stringify(favouriteNotes));
    localStorage.setItem(`tags${userId}`, JSON.stringify(tags));
    
  }, [notes, hasLoad, deletedNote, pinNotes, favouriteNotes, tags]);

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<div className="loading-container"><div className="loading-content">Loading...</div></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
