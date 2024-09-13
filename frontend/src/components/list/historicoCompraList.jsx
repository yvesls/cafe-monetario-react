import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import compraService from '../../core/service/compraService';

export default function HistoricoCompraList(){
    const router = useRouter();
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const fetchProducers = async () => {
            const service = new compraService()
            const result = await service.ProdutoreSaca();
            setCompras(result);
        };
          fetchProducers();
      }, []);
  

      function renderizarCabecalho() {
        return (
            <tr>
                <th>Código</th>
                <th>Nome da Fazenda</th>
                <th>Quantidade de saca compradas</th>
                <th>Nome do comprador</th>
                <th>Valor total</th>
                <th>Ação</th>
            </tr>
        );
    }

    function renderizarDados() {
        return compras?.map((compra) => (
          <tr key={compra.id}>
            <td>{compra.id}</td>
            <td>{compra.nomeFazenda}</td>
            <td>{compra.quantidadeComprada}</td>
            <td>{compra.compradorNome}</td>
            <td>{formatarParaDinheiro(compra.valorTotal)}</td>
            <td>
              <i className="fa fa-retweet" onClick={() => mostra(compra.produtorId, compra.compradorId, compra.id)}></i>
            </td>
          </tr>
        ));
      }

      function mostra(produtorId, compradorId, compraId) {
        router.push(`/transferencia?produtorId=${produtorId}&compradorId=${compradorId}&compraId=${compraId}`);
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