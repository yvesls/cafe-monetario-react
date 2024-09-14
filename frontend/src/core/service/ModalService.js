import React, { createContext, useContext, useState } from 'react';
import Modal from '../../components/utils/modal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({ open: false, titulo: '', descricao: '', tipo: '' });

  const showModal = (titulo, descricao, tipo) => {
    setModalInfo({ open: true, titulo, descricao, tipo });
  };

  const hideModal = () => {
    setModalInfo(prevState => ({ ...prevState, open: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalInfo.open && (
        <Modal onClose={hideModal} titulo={modalInfo.titulo} tipo={modalInfo.tipo}>
          <p>{modalInfo.descricao}</p>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
