import Main from '../components/Main';

import HistoricoCompraList from '../components/list/historicoCompraList';
  
export default function ListSacas() {
    return (
        <Main icone="fa fa-history" title="Histórico de compras" subtitle="Visualize o hitórico de compras e clique no botão de ação para transferir uma compra.">
        <div>
        <HistoricoCompraList></HistoricoCompraList>
        </div>
        </Main>
    );
}