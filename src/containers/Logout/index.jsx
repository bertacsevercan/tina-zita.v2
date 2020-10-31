import React, { useState, useEffect } from "react";
import { Auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import { Modal } from 'antd';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default function Logout() {

  const [t,i18n] = useTranslation();
  const [visible, setVisibility] = useState(false);

  const showModal = () => {
    setVisibility(true);
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  const handleOk = () => {
    Auth()
      .signOut()
      .then(function () {
        console.log("Sign-out successful.");
      })
      .catch(function (error) {
        // An error happened.
        alert(error.message);
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
          {t('links.signout')}
        </span>
         <Modal
         title={t('signOut.title')}
         visible={visible}
         onOk={handleOk}
         onCancel={handleCancel}
       >
         <p>{t('signOut.modalMessage')}</p>
       </Modal>
    </>
  );
}
