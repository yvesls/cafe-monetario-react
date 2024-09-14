import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ColecaoComprador from "../../core/colecao/ColecaoComprador";
import { useModal } from '../../core/service/ModalService.js';

export default function CompradorList() {
  const router = useRouter();
  const [compradores, setCompradores] = useState([]);
  const { showModal } = useModal();

  useEffect(() => {
    const fetchCompradores = async () => {
      const colecaoComprador = new ColecaoComprador();
      try {
        const result = await colecaoComprador.obterTodos();
        setCompradores(result);
      }
      catch(error) {
        showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
      }
    };

    fetchCompradores();
  }, []);

  const valorDisponivelInvestimento = (comprador) => {
    return (comprador.valorInvestimentoTotal - comprador.valorTotalInvestido)
  }


  const renderizarCompradores = () => {
    return compradores?.map((comprador) => (
      <tr key={comprador.id}>
        <td>{comprador.nome}</td>
        <td>{comprador.cnpj}</td>
        <td>R$ {comprador.valorInvestimentoTotal?.toFixed(2)}</td>
        <td>R$ {comprador.valorTotalInvestido?.toFixed(2)}</td>
        <td>R$ {valorDisponivelInvestimento(comprador).toFixed(2)}</td>
        <td>
          <i className="fa fa-trash" style={{ cursor: 'pointer', color: 'red' }} 
             onClick={() => excluirComprador(comprador.id)}></i>
        </td>
      </tr>
    ));
  };

  
  const excluirComprador = async (compradorId) => {
    try {
      const colecaoComprador = new ColecaoComprador();
      await colecaoComprador.excluir(compradorId)
      setCompradores(compradores.filter(comprador => comprador.id !== compradorId));
      alert('Comprador excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o comprador:', error);
      alert('Erro ao excluir o comprador. Tente novamente.');
    }
  };

  function renderizarCabecalho() {
    return (
      <tr>
        <th>Nome do Comprador</th>
        <th>CNPJ</th>
        <th>Valor Investimento Total</th>
        <th>Valor Total Investido</th>
        <th>Valor disponível investimento</th>
        <th>Ações</th>
      </tr>
    );
  }

  function adicionar() {
    router.push(`/compradorCadastro`);
  }

  return (
    <div>
      <button onClick={() => adicionar()}>Adicionar Comprador</button>
      <table>
        <thead>{renderizarCabecalho()}</thead>
        <tbody>{renderizarCompradores()}</tbody>
      </table>
    </div>
  );
}
