import Modal from 'react-modal';

Modal.setAppElement('#__next');

export default function ErrorModal({ errorMessage, onClose }) {
  return (
    <Modal
      isOpen={!!errorMessage}
      onRequestClose={onClose}
      contentLabel="Erro"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Erro</h2>
      <p>{errorMessage}</p>
      <button onClick={onClose}>Fechar</button>
    </Modal>
  );
}
