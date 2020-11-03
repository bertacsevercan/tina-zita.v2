import React, { useState, useEffect } from "react";
import { Auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

const Logout = ({clearInputs}) => {

  const {t} = useTranslation();
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
        clearInputs()
      })
      .catch(function (error) {
        alert(error.message);
      });
    history.push("/");
  };

  const [user, setUser] = useState("");
  
  const authListener = () => {
    Auth().onAuthStateChanged((user) => {
      setUser("");
    });
  };

  useEffect(() => {
    authListener();
  }, [user]);

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
         footer={[
          <Button key="Cancel" onClick={handleCancel}>{t("signOut.cancel")}</Button>,
           <Button key="Ok" onClick={handleOk}>{t("signOut.ok")}</Button>,
         ]}
       >
         <p>{t('signOut.modalMessage')}</p>
       </Modal>
    </>
  );
}
export default Logout;