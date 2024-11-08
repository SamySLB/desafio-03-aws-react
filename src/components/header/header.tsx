import styles from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => {
    if (isLoggedIn) {
        setIsLoggedIn(false);
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
            <Link href="#inicio">Início</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="#minha-historia">Minha História</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="#experiencias">Experiências</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="#contato">Contato</Link>
          </li>
          <li className={styles.navItem}>
            <a className={styles.authButton} onClick={handleAuthClick}>
              {isLoggedIn ? 'Sair' : 'Entrar'}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

