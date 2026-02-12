import './Header.css';
import foto from '../assets/GuiFernandes.jpg';
import { useEffect, useState } from 'react';

interface HeaderProps {
  name?: string;
  description?: string;
  profileImage?: string;
}

export function Header({
  name = 'Guilherme Henrique Fernandes',
  description = 'Estudante de Sistemas de Informações na PUC Minas',
  profileImage = foto,
}: HeaderProps) {
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="portfolio-header">
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-pressed={theme === 'dark'}
        aria-label="Alternar tema"
        title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      >
        <span className="theme-toggle-icon" aria-hidden="true">
          {theme === 'dark' ? '☀️' : '🌙'}
        </span>
        <span className="theme-toggle-text">
          {theme === 'dark' ? 'Escuro' : 'Claro'}
        </span>
      </button>
      <div className="header-content">
        <div className="profile-section">
          <img
            src={profileImage}
            alt={name}
            className="profile-pic"
          />
        </div>
        <div className="header-text">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    </header>
  );
}
