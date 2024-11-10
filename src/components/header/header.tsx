import styles from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosLogOut } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';




export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    if (isLoggedIn) {
      setIsLoggedIn(false);
    
      const auth = getAuth();
      auth.signOut();
    } else {
      setIsLoggedIn(true);
      router.push('/login'); 
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link className={styles.navItem} href="inicio">Início</Link>
          </li>
          <li className={styles.navItem}>
            <Link  className={styles.navItem} href="#minha-historia">Minha História</Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navItem} href="#experiencias">Experiências</Link>
          </li>
          <li className={styles.navItem}>
            <Link  className={styles.navItem} href="#contato">Contato</Link>
          </li>
          <li className={styles.navItem}>
            <a className={styles.authButton} onClick={handleAuthClick}>
            {isLoggedIn ?  ` `:  <IoIosLogOut className={styles.LogIn} />}
              {isLoggedIn ? 'Sair' :  `Entrar`}
              {isLoggedIn ? <FaCircle className={styles.Logout}/> :  ` `}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
