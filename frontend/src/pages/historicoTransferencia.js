import HistoricoTransferencia from '../components/list/historicoTransferencia';
import Main from '../components/Main';

  
export default function Historico() {
    return (
        <Main icone="fa fa-history" title="Histórico de transferência" subtitle="Visualize o hitórico de transfêrencia realizado.">
        <div>
        <HistoricoTransferencia></HistoricoTransferencia>
        </div>
        </Main>
    );
}   