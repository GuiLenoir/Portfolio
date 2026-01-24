import './EmailModal.css';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  if (!isOpen) return null;

  const email = "guilhermelenoirdev@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert("Email copiado para a área de transferência!");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>Meu Email</h2>
        <p>{email}</p>
        <button onClick={copyToClipboard} className="copy-button">
          Copiar
        </button>
      </div>
    </div>
  );
}
