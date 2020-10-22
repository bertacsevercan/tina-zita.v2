import React, {useState, useEffect} from 'react'
import {Auth} from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
export default function Logout() {
    //to change log status and routing
const [isLogged, setLog] = useState(false)
   
//we need the user state in other components too   
const [user, setUser] = useState("");
const authListener = () => {
    Auth().onAuthStateChanged((user) => {

        setUser("");
    });
  };
  
  useEffect(() => {
    authListener();
  }, []);

  function handleLogout (){
    Auth().signOut().then(function() {
      console.log("Sign-out successful.")
    //   setLog(false)
    }).catch(function(error) {
      // An error happened.
    });
    history.push("/");
  }
   let history = useHistory();
    return (
        <span onClick={handleLogout} >
            Sign Out
        </span>
    )
}
