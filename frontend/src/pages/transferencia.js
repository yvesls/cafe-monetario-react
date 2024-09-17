import Main from '../components/Main';
import TransferenciaForm from '../components/forms/transferenciaForm.jsx';

export async function getServerSideProps(context) {
    const { produtorId, compradorId, compraId} = context.query;
    return {
      props: { produtorId, compradorId, compraId}, 
    };
  }


export default function Transferencia({produtorId, compradorId, compraId}) {
    return (
            <Main icone="fa fa-retweet" title="Transferencia de compra" subtitle="Escolha a quantidade que quer transferir ">
            <div>
                <TransferenciaForm compraId={compraId} compradorId={compradorId} produtorId={produtorId}></TransferenciaForm>
            </div>
            </Main>
        );
    }
