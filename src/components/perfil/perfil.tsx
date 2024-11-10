import React, { useEffect, useState, useCallback } from 'react';
import styles from './perfil.module.css';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { HiMiniPencil } from 'react-icons/hi2';

function Perfil() {
  const [userData, setUserData] = useState<any>(null);
  const [githubBio, setGithubBio] = useState<string | null>(null);
  const [githubLocation, setGithubLocation] = useState<string | null>(null);
  const [githubId, setGithubId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();

  const fetchGithubBio = useCallback(async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setGithubBio(data.bio || ' ');
      setGithubLocation(data.location || ' ');
      setGithubId(data.id || null);
    } catch (error) {
      console.error('Erro ao buscar dados do GitHub:', error);
      setGithubBio('Erro ao carregar bio do GitHub');
      setGithubLocation('Erro ao carregar localização');
      setGithubId(null);
    }
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);

      if (parsedData.username) {
        fetchGithubBio(parsedData.username);
      }
    }
  }, [fetchGithubBio]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsEditable(false); 
    });
    return () => unsubscribe();
  }, []);

  const handleEditToggle = () => {
    if (isLoggedIn) {
      setIsEditable((prevEditable) => !prevEditable);
    } else {
      router.push('/');
    }
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        {isLoggedIn && (
          <button onClick={handleEditToggle}>
            <HiMiniPencil className={styles.Pencil} />
          </button>
        )}
        <div className={styles.userInfo}>
          <div className={styles.user}>
            <img
              src={userData.photoURL || '/default-avatar.png'}
              alt="Foto de perfil"
              className={styles.avatar}
            />
            <p className={styles.name}>{userData.username}</p>
            <p className={styles.Name}>{userData.email}</p>
            <p className={styles.Name}>{githubLocation}</p>
            <p className={styles.Name}>{githubId}</p>
          </div>

          <div className={styles.content}>
            <p>
              Hello, I´m <span className={styles.font}>{userData.username}</span>
            </p>
            <p  className={styles.Name}>{githubBio}</p>
            <button
              className={styles.authButton}
              onClick={() => window.open(`https://github.com/${userData.username}`, '_blank')}
            >
              GitHub
            </button>
            {isLoggedIn && (
              <button className={styles.authButton} onClick={handleEditToggle}>
                LinkedIn
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
