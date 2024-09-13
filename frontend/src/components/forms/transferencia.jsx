import { useEffect, useState } from "react";
import ColecaoCompra from "../../core/colecao/ColecaoCompra.js";
import ColecaoComprador from "../../core/colecao/ColecaoComprador";
import ColecaoProdutor from "../../core/colecao/ColecaoProdutor";
import TransferenciaService from "../../core/service/transferenciaService.js";

export default function TransferenciaForm({
  produtorId,
  compradorId,
  compraId,
}) {
  const [nomeFazenda, setNomeFazenda] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [nomeComprador, setNomeComprador] = useState("");

  const [compra, setCompra] = useState(null); // Para saber qual o valor unitario por quantindade daquela compra

  const transferenciaService = new TransferenciaService();

  useEffect(() => {
    const fetchProducers = async () => {
      const colecaoProdutor = new ColecaoProdutor();
      const result = await colecaoProdutor.obterPorId(produtorId);
      setNomeFazenda(result.nomeFazenda);
    };

    const fetchCompra = async () => {
      const colecaoCompra = new ColecaoCompra();
      const result = await colecaoCompra.obterPorId(compraId);
      setCompra(result);
      setQuantidade(result.quantidade);
    };

    const fetchComprador = async () => {
      const colecaoComprador = new ColecaoComprador();
      const result = await colecaoComprador.obterPorId(compradorId);
      setNomeComprador(result.nome);
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
        /* console.log("Produtor salvo com sucesso!"); */ //Jogar no modal
      } catch (error) {
        console.error("Erro ao salvar produtor:", error);
      }
    } else {
      console.log("Não pode comprar");
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
