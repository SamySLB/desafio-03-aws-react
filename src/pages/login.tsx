import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import { FiArrowRight } from "react-icons/fi";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FiAlertTriangle } from "react-icons/fi";
import { app } from '../config/firebaseConfig';
import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

function Login() {
  const router = useRouter();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth(app);

  const [searchTerm, setSearchTerm] = useState('');
  const [storedUsernames, setStoredUsernames] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const users: string[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('username_')) {
        const username = localStorage.getItem(key);
        if (username) users.push(username);
      }
    });
    setStoredUsernames(users);
  }, []);

  const githubSignUp = () => {
    signInWithPopup(auth, githubProvider)
      .then((response) => {
        const username = response.user.displayName || '';
        const email = response.user.email || '';
        const photoURL = response.user.photoURL || '';
        const uid = response.user.uid;
        
        localStorage.setItem('userData', JSON.stringify({ username, email, photoURL, uid }));
        
        if (username && !storedUsernames.includes(username)) {
          const userIndex = storedUsernames.length;
          localStorage.setItem(`username_${userIndex}`, username);
          setStoredUsernames([...storedUsernames, username]);
        }

        console.log('Usuário autenticado com sucesso:', response.user);
        router.push('/profile'); 
      })
      .catch((error) => console.error('Erro ao autenticar com GitHub:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const suggestions = storedUsernames.filter((username) =>
      username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(suggestions);

    setErrorMessage(false);
  };

  const handleSearch = () => {
    if (storedUsernames.includes(searchTerm)) {
      alert(`Exibindo portfólio do usuário: ${searchTerm}`);
      router.push(`/profile/`);
    } else {
      setErrorMessage(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <header></header>

      <h1 className={styles.h1}>Digite o nome do usuário que deseja buscar?</h1>

      <div className={styles.body}>
        <div className={styles.Bar}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite o nome do usuário"
            className={styles.SearchBar}
          />

          <button
            type="button"
            disabled={!searchTerm}
            className={styles.input}
            onClick={handleSearch}
          >
            <FiArrowRight className={styles.searchIcon} />  
          </button>
        </div>

        <div className={styles.error} id="error-message">
          {errorMessage && (
            <>
              <FiAlertTriangle />
              O nome que você digitou não existe ou não está cadastrado!
            </>
          )}
        </div>

        {searchTerm && filteredSuggestions.length > 0 && (
          <ul className={styles.listContainer}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                className={styles.li}
                key={index}
                onClick={() => setSearchTerm(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.bars}>
        <div className={styles.barOne}></div>
        <p className={styles.p}> ou </p>
        <div className={styles.barTwo}></div>
      </div>

      <div className={styles.buttons}>
        <p className={styles.text}>Acesse sua conta com</p>
        <button className={styles.button} onClick={githubSignUp}>
          <TbBrandGithubFilled className={styles.githubIcon} /> 
          GitHub 
        </button>
      </div>

      <footer></footer>
    </div>
  );
}

export default Login;
