import { useState } from 'react';
import './ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
if (!phoneNumber) { alert("Número do WhatsApp não configurado!"); return; }
const whatsappMessage = `Nome: ${formData.name}%0AMensagem: ${formData.message}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappLink, "_blank");

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', message: '' });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {isSubmitted ? (
          <div className="success-message">
            <h2>Obrigado!</h2>
            <p>Sua mensagem foi enviada pelo WhatsApp. Eu vou responder em breve!</p>
          </div>
        ) : (
          <>
            <h2>Entre em Contato</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              {}
              <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome aqui"
                />
              </div>


    

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Me conte mais..."
                  rows={5}
                />
              </div>

              <button type="submit" className="submit-button">
                Enviar pelo WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
