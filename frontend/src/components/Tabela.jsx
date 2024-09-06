import { useEffect, useState } from 'react';
import ColecaoProdutor from '../core/colecao/ColecaoProdutor'; // Verifique o caminho

export default function Tabela() {
    const [sacas, setSacas] = useState([]);

    console.log('Componente renderizado');

    useEffect(() => {
        console.log('Componente montado');
        const fetchProducers = async () => {
            console.log('Chamando fetchProducers...');
            const colecaoProdutor = new ColecaoProdutor();
            const result = await colecaoProdutor.findCargasComProdutores();
            console.log('Dados recebidos:', result);
            setSacas(result);
        };

        console.log('Entrou no useEffect');
        fetchProducers();
    }, []);

    function renderizarCabecalho() {
        return (
            <tr>
                <th>Código</th>
                <th>Nome da Fazenda</th>
                <th>Quantidade de Sacas</th>
                <th>Preço Unitário</th>
                <th>Ação</th>
            </tr>
        );
    }

    function renderizarDados() {
        return sacas.map(saca => (
            <tr key={saca.codigo}>
                <td>{saca.codigo}</td>
                <td>{saca.nomeProdutor}</td>
                <td>{saca.quantidadeSacas}</td>
                <td>{saca.precoUnitario.toFixed(2)}</td>
                <td>
                    <button
                        onClick={() => mostra(saca.codigo)}
                        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0', fontSize: '1.5em' }}
                        aria-label={`Ver detalhes da carga ${saca.codigo}`}
                    >
                        <i className="fa fa-money" />
                    </button>
                </td>
            </tr>
        ));
    }

    function mostra(codigo) {
        console.log("Código selecionado:", codigo);
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-purple-800 text-white">
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    );
}
