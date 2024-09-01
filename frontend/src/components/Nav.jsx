import React from 'react';
import Navegador from './Navegador';

export default function Nav() {
  return (
    <aside className="menuArea">
      <nav className="menu">
        <Navegador destino="/" texto="Início" icone="fa fa-home" />
        <Navegador destino="/users" texto="Usuários" icone="fa fa-users" />
      </nav>
    </aside>
  );
}
