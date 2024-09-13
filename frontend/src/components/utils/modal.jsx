import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, children, titulo, tipo }) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalClass = `modal-${tipo}`;

    const iconClass = {
        error: 'fas fa-exclamation-circle',
        success: 'fas fa-check-circle',
        info: 'fas fa-info-circle'
    }[tipo] || '';

    const modalContent = (
        <div className={`modal-overlay ${modalClass}`}>
            <div className="modal-wrapper">
                <div className="modal-header">
                    <i className={iconClass}></i>
                    <h1 className="modal-title">{titulo}</h1>
                    <a href="#" onClick={handleCloseClick} aria-label="Close Modal">
                        &times;
                    </a>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );

    if (typeof document !== 'undefined') {
        const modalRoot = document.getElementById('modal-root');
        return ReactDOM.createPortal(modalContent, modalRoot);
    }

    return null;
};

export default Modal;
