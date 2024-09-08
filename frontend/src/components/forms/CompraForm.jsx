import { useEffect, useState } from "react";

export default function CompraForm({ nomeFazenda }) {
  const [compradores, setCompradores] = useState([]);
  const [selectedCompradorId, setSelectedCompradorId] = useState("");
  const [qtdSaca, setQtdSaca] = useState("");

  useEffect(() => {
    const fetchCompradores = () => {
      setCompradores([
        {
          id: "1",
          name: "Marcos Antonio",
        },
        {
          id: "2",
          name: "Tadeu Morais",
        },
        {
          id: "3",
          name: "Ferando da Silva",
        },
      ]);
    };

    fetchCompradores();
  }, []); //

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCompradorId);
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
        <label htmlFor="producer">Comprador: </label>
        <select
          id="comprador"
          value={selectedCompradorId}
          onChange={(e) => setSelectedCompradorId(e.target.value)}
          required
          placeholder="Selecione o produtor"
        >
          <option value="" disabled>
            Selecione um comprador
          </option>
          {compradores.map((comprador) => (
            <option key={comprador.id} value={comprador.id}>
              {comprador.name}
            </option>
          ))}
        </select>
      </div>
      <div className="div-button">
        <button>Comprar</button>
      </div>
    </form>
  );
}
