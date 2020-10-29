import React, {useState, useEffect} from 'react'
import {Auth} from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import { Modal } from 'antd';

export default function Logout() {

const [visible, setVisibility] = useState(false)

const showModal= ()=>{
  setVisibility(true)
}

const handleCancel = () => {
  setVisibility(false)
};

const handleOk = () => {
  Auth().signOut().then(function() {
    console.log("Sign-out successful.")
  }).catch(function(error) {
    // An error happened.
    alert(error.message)
  });
  history.push("/");
};

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

   let history = useHistory();

    return (
    <>
        <span onClick={showModal} >
            Sign Out
        </span>
         <Modal
         title="Log Out"
         visible={visible}
         onOk={handleOk}
         onCancel={handleCancel}
       >
         <p>Are you sure you want to log out?</p>
       </Modal>
    </>
    )
}
