import { useContext, useState } from "react";
import NoteIcon from "../assets/icon/note-icon.jpg";
import "./ResetPassword.css";
import { AppContext } from "../context/Context";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const { UpdateToast } = useContext(AppContext);

  const [email, setEmail] = useState("");

  const PasswordReset = async (event) => {
    event.preventDefault()

    const id = toast.loading("loading...");

    try {

    if(!email) return;

     await sendPasswordResetEmail(auth, email)

    UpdateToast(id, "Check your inbox to proceed", "success");
    
    } catch (error) {
      console.log(error.message)
      UpdateToast(
        id,
        error.message.split("/")[1].split(")")[0].split("-").join(" "),
        "error"
      );
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-contents">
        <div className="nurad-note-logo">
          <img src={NoteIcon} alt="note icon" />
          <h4>NuradNote</h4>
        </div>
        <div className="create-new-account">
          <h4>Reset Password</h4>
          <p>
            Enter your email address and we'll send you an email with
            instructions to reset your password
          </p>
        </div>
        <form onSubmit={PasswordReset}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
          <button type="submit">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
