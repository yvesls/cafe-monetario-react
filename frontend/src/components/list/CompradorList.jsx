import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function CompradorList() {
  const router = useRouter();
  const [compradores, setCompradores] = useState([]);

  useEffect(() => {
    const compradoresMockados = [
      {
        id: 1,
        nome: "João da Silva",
        cnpj: "12.345.678/0001-90",
        valorInvestimentoTotal: 15000,
        valorTotalInvestido: 1200,
        valorDisponivelInvestimento: 300,
      },
      {
        id: 2,
        nome: "Maria Pereira",
        cnpj: "98.765.432/0001-10",
        valorInvestimentoTotal: 15000,
        valorTotalInvestido: 1200,
        valorDisponivelInvestimento: 300,
      },
      {
        id: 3,
        nome: "Empresa Café Bom",
        cnpj: "11.222.333/0001-44",
        valorInvestimentoTotal: 15000,
        valorTotalInvestido: 1200,
        valorDisponivelInvestimento: 300,
      },
      {
        id: 4,
        nome: "Café Premium LTDA",
        cnpj: "33.444.555/0001-22",
        valorInvestimentoTotal: 15000,
        valorTotalInvestido: 1200,
        valorDisponivelInvestimento: 300,
      },
    ];

    setCompradores(compradoresMockados);
  }, []);

  const renderizarCompradores = () => {
    return compradores.map((comprador) => (
      <tr key={comprador.id}>
        <td>{comprador.nome}</td>
        <td>{comprador.cnpj}</td>
        <td>R$ {comprador.valorInvestimentoTotal.toFixed(2)}</td>
        <td>R$ {comprador.valorTotalInvestido.toFixed(2)}</td>
        <td>R$ {comprador.valorDisponivelInvestimento.toFixed(2)}</td>
      </tr>
    ));
  };

  function renderizarCabecalho() {
    return (
      <tr>
        <th>Nome do Comprador</th>
        <th>CNPJ</th>
        <th>Valor Investimento Total</th>
        <th>Valor Total Investido </th>
        <th>Valor disponível investimento</th>
      </tr>
    );
  }

  function adicionar(){
    router.push(`/compradorCadastro`);
  }

  return (
    <div>
        <button onClick={() => adicionar()}>Adiconar Comprador</button>
      <table>
        <thead>{renderizarCabecalho()}</thead>
        <tbody>{renderizarCompradores()}</tbody>
      </table>
    </div>
  );
}
