import Main from '../components/Main';
import ProdutorForm from '../components/forms/ProdutorForm';

export default function CadastroProdutor() {
    return (
        <Main icone="fa fa-address-card" title="Cadastro do Produtor" subtitle="Cadastre um produtor">
        <div>
            <ProdutorForm></ProdutorForm>
        </div>
        </Main>
    );
}