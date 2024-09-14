import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ColecaoProdutor from '../../core/colecao/ColecaoProdutor';
import { useModal } from '../../core/service/ModalService.js';

export default function SacaList() {
  const [sacas, setSacas] = useState([]);
  const router = useRouter();
  const { showModal } = useModal();

  useEffect(() => {
    const fetchProducers = async () => {
      const colecaoProdutor = new ColecaoProdutor();
      
      try{
        const result = await colecaoProdutor.findCargasComProdutores();
        setSacas(result);
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
        <th>Nome da Fazenda</th>
        <th>Quantidade de Saca</th>
        <th>Preço Unitário</th>
        <th>Status</th>
        <th>Ação</th>
      </tr>
    );
  }

  function renderizarDados() {
    return sacas?.map((saca) => {
      const disponivel = saca.quantidadeSacas > 0;

      return (
        <tr key={saca.codigo}>
          <td>{saca.codigo}</td>
          <td>{saca.nomeProdutor}</td>
          <td>{saca.quantidadeSacas}</td>
          <td>{formatarParaDinheiro(saca.precoUnitario)}</td>

          <td
            style={{
              color: disponivel ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {disponivel ? 'Disponível' : 'Indisponível'}
          </td>

          <td>
            <i
              className="fa fa-money"
              onClick={() => disponivel &&mostra(saca.codigo)}
              style={{
                cursor: disponivel ? 'pointer' : 'not-allowed',
                color: disponivel ? 'black' : 'gray',
                pointerEvents: disponivel ? 'auto' : 'none',
              }}
            ></i>
          </td>
        </tr>
      );
    });
  }

  
  function mostra(codigoProdutor) {
    router.push(`/compra?codigoProdutor=${codigoProdutor}`);
  }

  function formatarParaDinheiro(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  return (
    <table>
      <thead>{renderizarCabecalho()}</thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
