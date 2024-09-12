import { useEffect, useState } from "react";
import ColecaoComprador from "../../core/colecao/ColecaoComprador";
import ColecaoCompra from "../../core/colecao/ColecaoCompra";
import ColecaoProdutor from "../../core/colecao/ColecaoProdutor";

export default function CompraForm({ codigoProdutor }) {
  const [compradores, setCompradores] = useState([]);
  const [selectedCompradorId, setSelectedCompradorId] = useState();
  const [produtor, setProdutor] = useState();
  const [qtdSaca, setQtdSaca] = useState("");
  
  useEffect(() => {
    const fetchProdutorESaca = async () => {
      try {
        const colecaoProdutor = new ColecaoProdutor();
        const result = await colecaoProdutor.obterProdutorESacaPorId(codigoProdutor);
        setProdutor(result);  
        console.log("Produtor carregado:", result);
       
      } catch (error) {
        console.error("Erro ao buscar dados do produtor:", error);
      }
    };
  
    const fetchCompradores = async () => {
      try {
        const colecaoComprador = new ColecaoComprador();
        const result = await colecaoComprador.obterTodos();
        setCompradores(result);
      } catch (error) {
        console.error("Erro ao buscar compradores:", error);
      }
    };
  
    fetchProdutorESaca();
    fetchCompradores();
  }, [codigoProdutor]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantidadeComprada = Number(qtdSaca);
    const valorTotal = quantidadeComprada * Number(produtor.saca.precoUnitario);

    const compra = {
      compradorId: selectedCompradorId,
      produtorId: produtor.id,
      quantidadeComprada,
      valorTotal,
    };

    try {
      const colecaoCompra = new ColecaoCompra();
      const compraSalva = await colecaoCompra.salvar(compra);
      console.log("Compra salva com sucesso:", compraSalva);

      setQtdSaca("");
      setSelectedCompradorId("");
    } catch (error) {
      console.error("Erro ao salvar a compra:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nomeFazenda">Nome da Fazenda:</label>
        <input 
          type="text" 
          id="nomeFazenda" 
          value={produtor?.nomeFazenda || ''} 
          disabled 
        />
      </div>
      <div>
        <label htmlFor="qtdSacas">Quantidade de saca:</label>
        <input
          type="number"
          id="qtdSacas"
          value={qtdSaca}
          placeholder="Informe a quantidade de saca"
          onChange={(e) => setQtdSaca(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="valorSaca">Valor por saca:</label>
        <input
          type="number"
          id="valorSaca"
          placeholder="Informe o valor por saca"
          value={produtor?.saca?.precoUnitario || ''} 
          disabled
        />
      </div>
      <div>
        <label htmlFor="comprador">Comprador: </label>
        <select
          id="comprador"
          value={selectedCompradorId}
          onChange={(e) => setSelectedCompradorId(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecione um comprador
          </option>
          {compradores.map((comprador) => (
            <option key={comprador.id} value={comprador.id}>
              {comprador.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="div-button">
        <button type="submit">Comprar</button>
      </div>
    </form>
  );  
}
