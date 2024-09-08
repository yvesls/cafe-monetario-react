import { useState } from 'react';


export default function ProdutorForm() {
    const [nomeFazenda, setNomeFazenda] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nomeFazenda)
      
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Nome da Fazenda:</label>
                <input /* className={"w70"} */ type="text" value={nomeFazenda} onChange={(e) => setNomeFazenda(e.target.value)} placeholder="Nome da Fazenda" required />
            </div>
            <div>
                <label htmlFor="">Quantidade de sacas: </label>
                <input /* className={"w50"} */ type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Quantidade de sacas" required />
            </div>
            <div>
                <label htmlFor="">Preço por saca: </label>
                <input /* className={"w50"}  */type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço por saca" required />
            </div>
            <div className='div-button'> 
                <button>Cadastrar</button>
            </div>
        </form>
    );
}
