import React, { useState, useEffect, ChangeEvent } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styles from '../footer/footer.module.css';
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareYoutube } from "react-icons/fa6";
import { IoIosPin } from "react-icons/io";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        const storedEmail = localStorage.getItem("email") || user.email || "";
        setEmail(storedEmail);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn && email) {
      localStorage.setItem("email", email);
    }
  }, [email, isLoggedIn]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  return (
    <div className={styles.footer}>
      {isLoggedIn ? (
        <>
          <p>Sinta-se livre para me contatar a qualquer momento!</p>
          <input
            type="text"
            placeholder="Adicione um email adicional"
            value={email}
            onChange={handleEmailChange}
          />
        </>
      ) : ( ''
      )}
      <div className={styles.headerIcon}>
       <p>Assim que possível, me envie um email para que possamos trabalhar felizes juntos!</p>
      <div className={styles.Body}>
        <div className={styles.bodyIcon}><FaInstagramSquare className={styles.Icon} /></div>
        <div className={styles.bodyIcon}><ImFacebook2 className={styles.Icon} /></div>
        <div className={styles.bodyIcon}><FaTwitterSquare className={styles.Icon} /></div>
        <div className={styles.bodyIcon}><FaSquareYoutube className={styles.Icon} /></div>
      </div>
      
      <div className={styles.end}>
        <IoIosPin />
        <p>Brasil</p>
        <p>© 2024, All Rights By Compass UOL</p>
      </div>
    </div>
    </div>
  );
}
