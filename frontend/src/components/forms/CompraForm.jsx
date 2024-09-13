import { useEffect, useState } from "react";
import ColecaoCompra from "../../core/colecao/ColecaoCompra";
import ColecaoComprador from "../../core/colecao/ColecaoComprador";

export default function CompraForm({ nomeFazenda }) {
  const [compradores, setCompradores] = useState([]);
  const [selectedCompradorId, setSelectedCompradorId] = useState("");
  const [qtdSaca, setQtdSaca] = useState("");
  const [valorSaca, setValorSaca] = useState("");
  const [cargaId, setCargaId] = useState("");
  
  useEffect(() => {
    const fetchCompradores = async () => {
      const colecaoComprador = new ColecaoComprador();
      const result = await colecaoComprador.obterTodos();
      setCompradores(result);
    };

    fetchCompradores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantidadeComprada = Number(qtdSaca);
    const valorTotal = quantidadeComprada * Number(valorSaca);

    const compra = {
      compradorId: selectedCompradorId,
      cargaId: cargaId || "1",
      quantidadeComprada,
      valorTotal,
    };

    try {
      const colecaoCompra = new ColecaoCompra();
      const compraSalva = await colecaoCompra.salvar(compra);
      console.log("Compra salva com sucesso:", compraSalva);

      setQtdSaca("");
      setValorSaca("");
      setSelectedCompradorId("");
      setCargaId("");
    } catch (error) {
      console.error("Erro ao salvar a compra:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nomeFazenda">Nome da Fazenda:</label>
        <input type="text" id="nomeFazenda" value={nomeFazenda} disabled />
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
          value={valorSaca}
          placeholder="Informe o valor por saca"
          onChange={(e) => setValorSaca(e.target.value)}
          required
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
