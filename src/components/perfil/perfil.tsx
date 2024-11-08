import React, { useEffect, useState } from 'react';

interface UserData {
  name: string;
  location: string;
  email: string | null;
  bio: string;
}

export default function Perfil() {
 
    const [userData, setUserData] = useState<UserData | null>(null);
  
    useEffect(() => {
      const storedUserId = localStorage.getItem('githubUserId');
  
      if (storedUserId) {
        fetch(`https://api.github.com/user`, {
          headers: {
            Authorization: `token ${storedUserId}`, 
          },
        })
          .then(response => response.json())
          .then((data: UserData) => {
            setUserData({
              name: data.name,
              location: data.location,
              email: data.email,
              bio: data.bio,
            });
          })
          .catch(error => console.error('Erro ao buscar os dados do GitHub:', error));
      }
    }, []);
  
    if (!userData) {
      return <p>Carregando...</p>;
    }
  
    return (
      <div>
        <h1>{userData.name || 'Nome do usuário'}</h1>
        <p>{userData.location || 'Local do usuário'}</p>
        <p>{userData.email || 'Email do usuário'}</p>
        <p>{userData.bio || 'Descrição do usuário'}</p>
      </div>
    );
  }