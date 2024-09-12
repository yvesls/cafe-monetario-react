import React from 'react';
import Navegador from './Navegador';


export default function Nav() {

  return (
    <aside className="menu-area">
      <nav className="menu">
        <Navegador destino="/" texto="Início" icone="fa fa-home" />
        <Navegador destino="/compradorCadastro" texto="Castro de Produtor" icone="fa fa-address-card" />
        <Navegador destino="/listComprador" texto="Cadastro de Comprador" icone="fa fa-shopping-bag" />
        <Navegador destino="/listSacas" texto="Lista de Sacas" icone="fa fa-coffee  " />
      </nav>
    </aside>
  );
}
