import React from 'react';
import Navegador from './Navegador';


export default function Nav() {

  return (
    <aside className="menu-area">
      <nav className="menu">
        <Navegador destino="/" texto="Início" icone="fa fa-home" />
        <Navegador destino="/cadastro-produtor" texto="Castro de produtor" icone="fa fa-address-card" />
        <Navegador destino="/cadastro-comprador" texto="Cadastro de comprador" icone="fa fa-shopping-bag" />
        <Navegador destino="/listaSacas" texto="Lista de saca" icone="fa fa-coffee  " />
      </nav>
    </aside>
  );
}
