import Main from '../components/Main';
import CompraList from '../components/list/CompraList';

  
export default function ListSacas() {
    return (
        <Main icone="fa fa-shopping-bag" title="Lista de compras" subtitle="Visualize as listas de compras e clique no botão de ação para transferir uma compra.">
        <div>
        <CompraList></CompraList>
        </div>
        </Main>
    );
}   