import React, { useState } from 'react';
import Navegador from './Navegador';


export default function Nav() {
  const [showElement, setShowElement] = useState(false)
  const showOrHide = () => {
    showElement ? setShowElement(false) : setShowElement(true)
  }
  return (
    <aside className="menu-area">
      <nav className="menu">
        <Navegador destino="/" texto="Início" icone="fa fa-home" />
        <Navegador destino="/cadastro" texto="Usuários" icone="fa fa-users" />
      </nav>
    </aside>
  );
}
