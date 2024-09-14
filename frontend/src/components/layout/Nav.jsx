import React from 'react';
import Navegador from './Navegador';


export default function Nav() {

  return (
    <aside className="menu-area">
      <nav className="menu">
        <Navegador destino="/" texto="Início" icone="fa fa-home" />
        <Navegador destino="/cadastroProdutor" texto="Castro de produtor" icone="fa fa-address-card" />
        <Navegador destino="/listComprador" texto="Lista de compradores" icone="fa fa-list-alt" />
        <Navegador destino="/listSacas" texto="Lista de sacas" icone="fa fa-coffee  " />
        <Navegador destino="/listCompra" texto="Lista de compras" icone="fa fa-shopping-bag" />
        <Navegador destino="/historicoTransferencia" texto="Histórico transferência" icone="fa fa-history" />
      </nav>
    </aside>
  );
}
