import { useState, useEffect } from 'react';
import styles from './myHistory.module.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface UserData {
  username: string;
  email: string;
  photoURL?: string;
}

export default function MyHistory() {
  const [history, setHistory] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); 
      if (user) {
        const storedHistory = localStorage.getItem('userHistory');
        setHistory(storedHistory || ''); 
      }
    });
    return () => unsubscribe();
  }, []);

  
  const saveHistory = (newHistory: string): void => {
    if (isLoggedIn) {
      localStorage.setItem('userHistory', newHistory);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setHistory(e.target.value);
  };

  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && isLoggedIn) {
      e.preventDefault(); 
      saveHistory(history);
    }
  };

  return (
    <div className={styles.box}>
      <h2 className={styles.name}>Minha história</h2>
      <textarea
        value={history}
        onChange={handleTextareaChange}
        onKeyDown={handleKeyPress}
        placeholder="Não há nenhuma história para contar"
        className={styles.textarea}
        readOnly={!isLoggedIn} 
      />
    </div>
  );
}
