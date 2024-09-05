import Main from '../components/Main';
import Tabela from '../components/Tabela';

export default function Cadastro() {
    return (
        <Main icone="fa fa-address-card" title="Cadastro do Produtor" subtitle="Cadastre um produtor">
        <div>
            {/* <ProdutorForm></ProdutorForm> */}
            {/* <CaragaSacaForm></CaragaSacaForm> */}
            <Tabela></Tabela>
        </div>
        </Main>
    );
}