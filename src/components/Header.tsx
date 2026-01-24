import './Header.css';
import foto from '../assets/GuiFernandes.jpg';

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
  return (
    <header className="portfolio-header">
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
