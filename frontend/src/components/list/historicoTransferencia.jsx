import { useEffect, useState } from "react";
import { useModal } from '../../core/service/ModalService.js';
import TransferenciaService from "../../core/service/transferenciaService";

export default function HistoricoTransferencia(){
    const [transferencias, setTransferencias] = useState([]);
    const { showModal } = useModal();

    useEffect(() => {
        const fetchProducers = async () => {
            const service = new TransferenciaService()
            
          try{
            const result = await service.getAllTransferecia();
            setTransferencias(result);
          }
          catch(error) {
            showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
          }
        };
          fetchProducers();
      }, []);
  

      function renderizarCabecalho() {
        return (
            <tr>
                <th>Código</th>
                <th>Nome da Fazenda destino</th>
                <th>Quantidade de saca transferidas</th>
                <th>Comprador origem</th>
                <th>Valor total transferido</th>
            </tr>
        );
    }

    function renderizarDados() {
        return transferencias?.map((transferida) => (
          <tr key={transferida.id}>
            <td>{transferida.id}</td>
            <td>{transferida.nomeFazenda}</td>
            <td>{transferida.quantidadeTransferida}</td>
            <td>{transferida.compradorNome}</td>
            <td>{formatarParaDinheiro(transferida.ValorTransferido)}</td>
          </tr>
        ));
      }
    

    function formatarParaDinheiro(valor) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor);
      }
      
    return (  
        <table>
            <thead>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    );
}