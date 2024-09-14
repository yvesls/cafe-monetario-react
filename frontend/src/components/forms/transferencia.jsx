import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ColecaoCompra from "../../core/colecao/ColecaoCompra.js";
import ColecaoComprador from "../../core/colecao/ColecaoComprador";
import ColecaoProdutor from "../../core/colecao/ColecaoProdutor";
import TransferenciaService from "../../core/service/transferenciaService.js";
import { useModal } from '../../core/service/ModalService.js';

export default function TransferenciaForm({
  produtorId,
  compradorId,
  compraId,
}) {
  const router = useRouter();
  const { showModal } = useModal();
  const [nomeFazenda, setNomeFazenda] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [nomeComprador, setNomeComprador] = useState("");

  const [compra, setCompra] = useState(null);

  const transferenciaService = new TransferenciaService();

  useEffect(() => {
    const fetchProducers = async () => {
      const colecaoProdutor = new ColecaoProdutor();
      try {

        const result = await colecaoProdutor.obterPorId(produtorId);
        setNomeFazenda(result.nomeFazenda);
      }
      catch(error) {
        showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
      }
    };

    const fetchCompra = async () => {
      const colecaoCompra = new ColecaoCompra();
      try {
        const result = await colecaoCompra.obterPorId(compraId);
        setCompra(result);
        setQuantidade(result.quantidade);
      }
      catch(error) {
        showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
      }
    };

    const fetchComprador = async () => {
      const colecaoComprador = new ColecaoComprador();
      try {
        const result = await colecaoComprador.obterPorId(compradorId);
        setNomeComprador(result.nome);
      }
      catch(error) {
        showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
      }
    };

    fetchProducers();
    fetchCompra();
    fetchComprador();
  }, [produtorId, compradorId, compraId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantidade <= compra.quantidadeComprada) {
      const transferencia = {
        compradorOrigemId: Number(compradorId),
        ProdutoDestinoId: Number(produtorId),
        quantidadeTransferida: Number(quantidade),
        ValorTransferido: Number(getPrecoQuantidade()),
      };
      try {
        await transferenciaService.salvarCompra(transferencia,compraId);
        router.push(`/listCompra`);
      } catch (error) {
        showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
      }
    } else {
      showModal( "Atenção!", `Não pode transferir!`, "info");
    }
  };

  function getPrecoQuantidade() {
    return (compra.valorTotal / compra.quantidadeComprada) * quantidade;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome da Fazenda:</label>
        <input
          type="text"
          value={nomeFazenda || ""}
          onChange={(e) => setNomeFazenda(e.target.value)}
          disabled
        />
      </div>
      <div>
        <label>Quantidade de sacas:</label>
        <input
          type="number"
          value={quantidade || ""}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade de sacas"
          required
        />
      </div>
      <div>
        <label>Comprador:</label>
        <input
          type="text"
          value={nomeComprador || ""}
          onChange={(e) => setNomeComprador(e.target.value)}
          disabled
        />
      </div>
      <div className="div-button">
        <button type="submit">Transferir</button>
      </div>
    </form>
  );
}
