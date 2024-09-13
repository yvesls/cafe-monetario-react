import { useEffect, useState } from "react";
import ColecaoComprador from "../../core/colecao/ColecaoComprador";
import ColecaoCompra from "../../core/colecao/ColecaoCompra";
import ColecaoProdutor from "../../core/colecao/ColecaoProdutor";
import { useRouter } from 'next/router';
import Modal from '../utils/modal';

export default function CompraForm({ codigoProdutor }) {
  const [compradores, setCompradores] = useState([]);
  const [selectedCompradorId, setSelectedCompradorId] = useState(null);
  const [compradorSelecionado, setCompradorSelecionado] = useState(null);
  const [produtor, setProdutor] = useState(null);
  const [qtdSaca, setQtdSaca] = useState("");
  const [modalInfo, setModalInfo] = useState({ open: false, titulo: '', descricao: '', tipo: '' });
  const router = useRouter();
  
  useEffect(() => {
    const fetchProdutorESaca = async () => {
      try {
        const colecaoProdutor = new ColecaoProdutor();
        const result = await colecaoProdutor.obterProdutorESacaPorId(codigoProdutor);
        setProdutor(result.produtor);
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

  useEffect(() => {
    if (selectedCompradorId) {
      const comprador = compradores.find(c => c.id === selectedCompradorId);
      setCompradorSelecionado(comprador || null);
    }
  }, [selectedCompradorId, compradores]);

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
      await colecaoCompra.salvar(compra);

      setQtdSaca("");
      setSelectedCompradorId(null);
      
      router.push(`/listSacas`);
    } catch (error) {
      setModalInfo({
        open: true,
        titulo: 'Erro',
        descricao: `Erro ao salvar a compra: ${error.message}`,
        tipo: 'error',
      });
    }
  };

  const handleCloseModal = () => {
    setModalInfo(prevState => ({
      ...prevState,
      open: false,
    }));
  };

  const valorInvestimentoTotal = compradorSelecionado?.valorInvestimentoTotal || 0;
  const valorTotalInvestido = compradorSelecionado?.valorTotalInvestido || 0;
  const valorDisponivelInvestimento = valorInvestimentoTotal - valorTotalInvestido;

  const valorDecrementado = qtdSaca && produtor?.saca?.precoUnitario 
    ? valorDisponivelInvestimento - (qtdSaca * produtor.saca.precoUnitario) 
    : valorDisponivelInvestimento;

  return (
    <div>
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
            value={produtor?.saca?.precoUnitario} 
            disabled
          />
        </div>
        <div>
          <label htmlFor="comprador">Comprador: </label>
          <select
            id="comprador"
            value={selectedCompradorId || ""}
            onChange={(e) => setSelectedCompradorId(Number(e.target.value))}
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

        {compradorSelecionado && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Valor Investimento Total</th>
                <th>Valor Total Investido</th>
                <th>Valor Disponível Investimento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{compradorSelecionado.id}</td>
                <td>{compradorSelecionado.nome}</td>
                <td>{compradorSelecionado.cnpj}</td>
                <td>{valorInvestimentoTotal.toFixed(2)}</td>
                <td>{valorTotalInvestido.toFixed(2)}</td>
                <td>{valorDecrementado.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}

        <div className="div-button">
          <button type="submit">Comprar</button>
        </div>
      </form>

      {modalInfo.open && (
        <Modal 
          onClose={handleCloseModal} 
          titulo={modalInfo.titulo} 
          tipo={modalInfo.tipo}
        >
          <p>{modalInfo.descricao}</p>
        </Modal>
      )}
    </div>
  );
}
