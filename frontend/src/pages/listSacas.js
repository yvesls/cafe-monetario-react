import Main from '../components/Main';
import SacaList from '../components/list/sacaList';

export default function ListSacas() {
    return (
        <Main icone="fa fa-coffee" title="Lista sacas de café" subtitle="Escolha a saca de café de sua preferência e clique no botão de ação para realizar a compra.">
        <div>
         <SacaList></SacaList>
        </div>
        </Main>
    );
}