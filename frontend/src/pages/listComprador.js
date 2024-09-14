import Main from '../components/Main';
import CompradorList from '../components/list/CompradorList';

export default function ListComprador() {
    return (
        <Main icone="fa fa-list-alt" title="Listagem de comprador" subtitle="Consulte a lista de compradores registrados e adicione novos compradores conforme necessário.">
        <div>
         <CompradorList></CompradorList>
        </div>
        </Main>
    );
}