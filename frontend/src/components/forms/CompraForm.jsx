import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ColecaoCompra from "../../core/colecao/ColecaoCompra";
import ColecaoComprador from "../../core/colecao/ColecaoComprador";
import ColecaoProdutor from "../../core/colecao/ColecaoProdutor";
import { useModal } from '../../core/service/ModalService.js';

export default function CompraForm({ codigoProdutor }) {
  const [compradores, setCompradores] = useState([]);
  const [selectedCompradorId, setSelectedCompradorId] = useState(null);
  const [compradorSelecionado, setCompradorSelecionado] = useState(null);
  const [produtor, setProdutor] = useState(null);
  const [qtdSaca, setQtdSaca] = useState("");
  const [valorDisponivelCompra, setValorDisponivelCompra] = useState(0)
  const [valorCompraAtual, setValorCompraAtual] = useState(0)
  const { showModal } = useModal();
  const router = useRouter();
  
  useEffect(() => {
    const fetchProdutorESaca = async () => {
      try {
        const colecaoProdutor = new ColecaoProdutor();
        const result = await colecaoProdutor.obterProdutorESacaPorId(codigoProdutor);
        setProdutor(result.produtor);
      } catch (error) {
        showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
      }
    };
  
    const fetchCompradores = async () => {
      try {
        const colecaoComprador = new ColecaoComprador();
        const result = await colecaoComprador.obterTodos();
        setCompradores(result);
      } catch (error) {
        showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
      }
    };
  
    fetchProdutorESaca();
    fetchCompradores();
  }, [codigoProdutor]);

  useEffect(() => {
    console.log(selectedCompradorId)
    if (selectedCompradorId && selectedCompradorId != 0) {
      const comprador = compradores.find(c => c.id === selectedCompradorId);
      setCompradorSelecionado(comprador || null);
      setValorDisponivelCompra(Number(comprador.valorInvestimentoTotal - comprador.valorTotalInvestido))
      setValorCompraAtual(qtdSaca * produtor?.saca?.precoUnitario)
    }else{
      setCompradorSelecionado(null)
    }

  }, [selectedCompradorId, compradores]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantidadeComprada = Number(qtdSaca);
    const valorTotal = quantidadeComprada * Number(produtor?.saca?.precoUnitario);

    const compra = {
      compradorId: selectedCompradorId,
      cargaId: produtor?.saca?.id,
      quantidadeComprada,
      valorTotal,
    };

    try {
      const colecaoCompra = new ColecaoCompra();
      await colecaoCompra.salvar(compra);

      setQtdSaca("");
      setSelectedCompradorId(null);
      
      router.push(`/listSacas`);
    } catch (error) {
      showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
    }
  };

  const chageValorCompraAtual = (e) =>{
    console.log(e)
    setValorCompraAtual(e * produtor.saca.precoUnitario)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nomeFazenda">Nome da Fazenda:</label>
        <input 
          type="text" 
          id="nomeFazenda" 
          value={produtor?.nomeFazenda} 
          disabled 
        />
      </div>
      <div>
        <label htmlFor="comprador">Comprador: </label>
        <select
          id="comprador"
          value={selectedCompradorId || ""}
          onChange={(e) => {setSelectedCompradorId(Number(e.target.value));}}
          required
        >
          <option value="">Selecione um comprador</option>
          {compradores.map((comprador) => (
            <option key={comprador.id} value={comprador.id}>
              {comprador.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="qtdSacas">Quantidade de saca:</label>
        <input
          type="number"
          id="qtdSacas"
          value={qtdSaca}
          placeholder="Informe a quantidade de saca"
          onChange={(e) => {setQtdSaca(e.target.value); chageValorCompraAtual(e.target.value) }}
          required
        />
      </div>
      <div>
        <label htmlFor="valorSaca">Valor por saca (R$):</label>
        <input
          type="number"
          id="valorSaca"
          placeholder="Informe o valor por saca"
          value={produtor?.saca?.precoUnitario} 
          disabled
        />
      </div>
      

      {compradorSelecionado && (
        <table>
          <thead>
            <tr>
              <th>Nome do comprador</th>
              <th>Valor disponível investimento</th>
              <th>Valor da compra atual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{compradorSelecionado.nome}</td>
              <td> R$ {valorDisponivelCompra}</td>
              <td> R$ {valorCompraAtual}</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="div-button">
        <button type="submit">Comprar</button>
      </div>
    </form>
  );
}
