import React, { useEffect, useState } from 'react';
import styles from './perfil.module.css';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { HiMiniPencil } from "react-icons/hi2";


function Perfil() {
  const [userData, setUserData] = useState<any>(null);
  const [githubBio, setGithubBio] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
   
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);

      
      if (parsedData.username) {
        fetch(`https://api.github.com/users/${parsedData.username}`)
          .then(response => response.json())
          .then(data => {
            setGithubBio(data.bio || ' ');
          })
          .catch(error => console.error('Erro ao buscar dados do GitHub:', error));
      }
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleAuthClick = () => {
    const router = useRouter();
    if (isLoggedIn) {
      setIsLoggedIn(false);
    
      const auth = getAuth();
      auth.signOut();
    } else {
      setIsLoggedIn(true);
      router.push('/login'); 
    }
  };


  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
   <>
    <span className={styles.Pencil} onClick={handleAuthClick}>
          {isLoggedIn ? <HiMiniPencil /> : ' ' }
        </span>
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div  className={styles.user}>
        <img
          src={userData.photoURL || '/default-avatar.png'}
          alt="Foto de perfil"
          className={styles.avatar}
        />
        <p className={styles.name}>{userData.username}</p>
        <p className={styles.name}> {userData.email}</p>
        </div>

        <div className={styles.content}>
        <p> Hello, I´m {userData.username}</p>

        <p> {githubBio}</p>

        <button>Github</button>
        <button className={styles.authButton} onClick={handleAuthClick}>
              {isLoggedIn ? 'linkedin ' : ' ' }
            </button>
            </div>
      </div>
    </div>
    </>
  );
}

export default Perfil;
