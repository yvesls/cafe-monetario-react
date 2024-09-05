import { useEffect, useState } from 'react';

export default function CaragaSacaForm() {

    const [producers, setProducers] = useState([]);
    const [selectedProducerId, setSelectedProducerId] = useState('');
    const [quantity, setQuantity] = useState('s');
    const [unitPrice, setUnitPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducers = () => {
   
                setProducers([
                    {
                        "id": "1",
                        "name": "Fazenda Santa Clara"
                    },
                    {
                        "id": "2",
                        "name": "Fazenda Boa Vista"
                    },
                    {
                        "id": "3",
                        "name": "Fazenda Monte Verde"
                    },
                    {
                        "id": "4",
                        "name": "Fazenda Verde Campo"
                    },
                    {
                        "id": "5",
                        "name": "Fazenda Café do Sul"
                    }
                ]); 
        }

        fetchProducers(); // Chama a função para carregar os produtores
    }, []); // 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedProducerId)

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastrar Carga de Café</h2>
            <div>
                <label htmlFor="producer">Selecione o Produtor:</label>
                <select
                    id="producer"
                    value={selectedProducerId}
                    onChange={(e) => setSelectedProducerId(e.target.value)}
                    required
                    placeholder="Selecione o produtor"
                >
                    {producers.map((producer) => (
                        <option key={producer.id} value={producer.id}>
                            {producer.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="quantity">Quantidade de Sacas:</label>
                <input
                    type="number"
                    id="quantity"
                    placeholder='Informe a quantidade de saca'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="unitPrice">Preço Unitário (R$):</label>
                <input
                    type="number"
                    id="unitPrice"
                    value={unitPrice}
                    placeholder='Informe um preço'
                    onChange={(e) => setUnitPrice(e.target.value)}
                    required
                />
            </div>
            <div className='div-button'> 
                <button>Cadastrar</button>
            </div>
{/*             <button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </form>
    );

}