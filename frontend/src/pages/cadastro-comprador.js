import Main from '../components/Main';
import CompradorForm from '../components/forms/compradorForm';

export default function CadastroComprador() {
    return (
        <Main icone="fa fa-shopping-bag" title="Cadastro de comprador" subtitle="Cadastre um comprador">
        <div>
             <CompradorForm></CompradorForm>
        </div>
        </Main>
    );
}