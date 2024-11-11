import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styles from './experiences.module.css';
import { CgAdd } from "react-icons/cg";

interface Experience {
  title: string;
  period: string;
  skills: string;
  experiences: string;
  repositoryLink?: string;
}

export default function Experiences() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formData, setFormData] = useState<Experience>({
    title: '',
    period: '',
    skills: '',
    experiences: '',
    repositoryLink: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedExperiences = localStorage.getItem('experiences');
    if (storedExperiences) {
      setExperiences(JSON.parse(storedExperiences));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  }, [experiences]);

  const handleAddExperience = (index: number | null = null) => {
    if (index !== null) {
      setEditIndex(index);
      setFormData(experiences[index]);
    } else {
      setEditIndex(null);
      setFormData({
        title: '',
        period: '',
        skills: '',
        experiences: '',
        repositoryLink: '',
      });
    }
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setFormData({
      title: '',
      period: '',
      skills: '',
      experiences: '',
      repositoryLink: '',
    });
    setEditIndex(null);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = formData;
      setExperiences(updatedExperiences);
    } else {
      setExperiences([...experiences, formData]);
    }
    handleCancel();
  };

  const handleDelete = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.box}>
      <h2 className={styles.name}>Experiências</h2>
      {isLoggedIn ? (
        <div className={styles['card-container']}>
          {experiences.length === 0 ? (
            <p
              onClick={() => handleAddExperience()}
              className="clickable-text"
            >
              <button onClick={() => handleAddExperience()} className={styles.Add}>
                <CgAdd className={styles.icon} />
                Adicionar Card
              </button>
            </p>
          ) : (
            experiences.map((exp, index) => (
              <div key={index} className={styles.Card}>
                <h3 className={styles.title}>{exp.title}</h3>
                <p className={styles.period}>{exp.period}</p>
                <p className={styles.Skills}>{exp.skills}</p>
                <p className={styles.experiences}>{exp.experiences}</p>
                {exp.repositoryLink && (
                  <p>
                    Link do Repositório:{' '}
                    <a href={exp.repositoryLink} target="_blank" rel="noopener noreferrer">
                      {exp.repositoryLink}
                    </a>
                  </p>
                )}
                <button onClick={() => handleAddExperience(index)} className={styles.button}>
                  Editar
                </button>
                <button onClick={() => handleDelete(index)} className={styles.button}>
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className={styles['card-container']}>
          {experiences.length === 0 ? (
            <p className={styles.Name}>Não há nada por aqui.</p>
          ) : (
            experiences.map((exp, index) => (
              <div key={index} className={styles.Card}>
                <h3 className={styles.title}>{exp.title}</h3>
                <p className={styles.period}>{exp.period}</p>
                <p className={styles.Skills}>{exp.skills}</p>
                <p className={styles.experiences}>{exp.experiences}</p>
                {exp.repositoryLink && (
                  <p>
                    Link do Repositório:{' '}
                    <a href={exp.repositoryLink} target="_blank" rel="noopener noreferrer">
                      {exp.repositoryLink}
                    </a>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {isLoggedIn && experiences.length > 0 && (
        <button onClick={() => handleAddExperience()} className={styles.Add}>
          <CgAdd className={styles.icon} />
          Adicionar Card
        </button>
      )}

      {showPopup && (
        <div className={styles.popUp}>
          <h3 className={styles.H3}>{editIndex !== null ? 'Editar Card' : 'Criação de Card'}</h3>
          <label>
            <input
              type="text"
              name="title"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              placeholder="  Título:"
            />
          </label>

          <label>
            <input
              type="text"
              name="period"
              className={styles.input}
              value={formData.period}
              onChange={handleChange}
              placeholder=" Período de Atuação:"
            />
          </label>

          <label>
            <input
              type="text"
              name="skills"
              className={styles.input}
              value={formData.skills}
              onChange={handleChange}
              placeholder=" Habilidades:"
            />
          </label>

          <label>
            <textarea
              name="experiences"
              className={styles.input}
              value={formData.experiences}
              onChange={handleChange}
              placeholder=" Experiências:"
            />
          </label>

          <label>
            <input
              type="text"
              name="repositoryLink"
              className={styles.input}
              value={formData.repositoryLink}
              onChange={handleChange}
              placeholder="   Link do Repositório (opcional):"
            />
          </label>

          <div className={styles.PopuButton}>
            <button onClick={handleSave} className={styles.ButtonP}>Salvar</button>
            <button onClick={handleCancel} className={styles.ButtonP}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
