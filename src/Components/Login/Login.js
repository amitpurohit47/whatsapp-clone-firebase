import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from '../../firebase';
import { useStateValue } from "../../StateProvider/StateProvider";
import { actionTypes } from "../../StateProvider/Reducer";

function Login() {

  const [{},dispatch] = useStateValue();

  const signIn = async () => {
    try{
      const result = await auth.signInWithPopup(provider);
      dispatch({
        type : actionTypes.SET_USER,
        user : result.user
      });
    }catch(e){
      alert(e.message)
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
