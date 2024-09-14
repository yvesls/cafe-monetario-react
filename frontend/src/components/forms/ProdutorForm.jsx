import { useState } from 'react';
import ColecaoProdutor from '../../core/colecao/ColecaoProdutor';
import ColecaoCargaCafe from '../../core/colecao/ColecaoCargaCafe';
import { useModal } from '../../core/service/ModalService.js';

export default function ProdutorForm() {
    const [nomeFazenda, setNomeFazenda] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
  const { showModal } = useModal();
  
    const produtorRepo = new ColecaoProdutor();
    const cargaCafeRepo = new ColecaoCargaCafe();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const produtor = {
            nomeFazenda,
        };

        try {
            const produtorId = (await produtorRepo.salvar(produtor)).id;

            const cargaCafe = {
                produtorId,
                quantidadeSacas: Number(quantidade),
                precoUnitario: Number(preco),
            }
            
            await cargaCafeRepo.salvar(cargaCafe);

            setNomeFazenda('');
            setQuantidade('');
            setPreco('');
            showModal("Sucesso!", `Produtor salvo com sucesso!`, "success");
        } catch (error) {
            showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome da Fazenda:</label>
                <input
                    type="text"
                    value={nomeFazenda}
                    onChange={(e) => setNomeFazenda(e.target.value)}
                    placeholder="Nome da Fazenda"
                    required
                />
            </div>
            <div>
                <label>Quantidade de sacas:</label>
                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder="Quantidade de sacas"
                    required
                />
            </div>
            <div>
                <label>Preço por saca:</label>
                <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="Preço por saca"
                    required
                />
            </div>
            <div className='div-button'> 
                <button type="submit">Cadastrar</button>
            </div>
        </form>
    );
}
