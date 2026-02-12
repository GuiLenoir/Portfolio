import './Footer.css';
import githubIcon  from '../assets/githubicon.svg';
import linkedinIcon  from '../assets/linkedin.svg';
import emailIcon from '../assets/email.svg';
import instagramIcon from '../assets/instagram.svg';
import { useState } from 'react';
import { EmailModal } from './EmailModal';

export function Footer() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/GuiLenoir',
      icon: <img src={githubIcon} alt="GitHub"/>,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/guilherme-lenoir-fernandes',
      icon: <img src={linkedinIcon} alt="LinkedIn" />,
    },
    {
      name: 'Email',
      url: 'mailto:guilhermelenoirdev@gmail.com',
      icon: <img src={emailIcon} alt="Email" />,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/guilhermelenoir', 
      icon: <img src={instagramIcon} alt="Instagram" />,
    },
  ];

  const handleEmailIconClick = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Guilherme Henrique Fernandes</h3>
          <p>Estudante de Sistema de Informações</p>
        </div>

        <div className="footer-section">
          <h4>Sociais</h4>
          <div className="social-links">
            {socialLinks.map((link) =>
              link.name === 'Email' ? (
                <button
                  key={link.name}
                  type="button"
                  onClick={handleEmailIconClick}
                  className="social-link"
                  title={link.name}
                >
                  <span>{link.icon}</span>
                  <span className="tooltip">{link.name}</span>
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : "_blank"}
                  rel={link.url.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                  className="social-link"
                  title={link.name}
                >
                  <span>{link.icon}</span>
                  <span className="tooltip">{link.name}</span>
                </a>
              )
            )}
          </div>
        </div>
      </div>
              
      <div className="footer-bottom">
        <p>
          &copy; 2026 Guilherme Henrique Fernandes. Todos os direitos reservados.
        </p>
      </div>

      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
    </footer>
  );
}
