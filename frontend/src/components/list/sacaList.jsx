import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ColecaoProdutor from '../../core/colecao/ColecaoProdutor';

export default function SacaList() {
  const [sacas, setSacas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducers = async () => {
      const colecaoProdutor = new ColecaoProdutor();
      const result = await colecaoProdutor.findCargasComProdutores();
      setSacas(result);
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
              onClick={() => disponivel && mostra(saca.nomeProdutor)}
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

  function mostra(nomeFazenda) {
    router.push(`/compra?nomeFazenda=${nomeFazenda}`);
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
