import Main from '../components/Main';
import Tabela from '../components/tabela/Tabela';

export default function ListaSacas() {
    return (
        <Main icone="fa fa-coffee" title="Lista sacas de café" subtitle="Escolha a saca de café de sua preferência e clique no botão de ação para realizar a compra.">
        <div>
            <Tabela></Tabela>
        </div>
        </Main>
    );
}