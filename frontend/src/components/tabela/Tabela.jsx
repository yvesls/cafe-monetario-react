import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ColecaoProdutor from '../../core/colecao/ColecaoProdutor'

export default function Tabela() {
    const [sacas, setSacas] = useState([]);
    const router = useRouter();

    useEffect(() => {
      const fetchProducers = async () => {
          const colecaoProdutor = new ColecaoProdutor();
          const result = await colecaoProdutor.findCargasComProdutores();
          setSacas(result);
      };
        fetchProducers();
    }, []);

    function renderizarCabecalho() {
        return (
            <tr>
                <th>Código</th>
                <th>Nome da Fazenda</th>
                <th>Quantidade de saca</th>
                <th>Preco Unitário</th>
                <th>Ação</th>
            </tr>
        );
    }

    function renderizarDados() {
        return sacas?.map((saca) => (
          <tr key={saca.codigo}>
            <td>{saca.codigo}</td>
            <td>{saca.nomeProdutor}</td>
            <td>{saca.quantidadeSacas}</td>
            <td>{formatarParaDinheiro(saca.precoUnitario)}</td>
            <td>
              <i className="fa fa-money" onClick={() => mostra(saca.nomeProdutor, saca.precoUnitario, saca.codigo)}></i>
            </td>
          </tr>
        ));
      }

    function mostra(nomeProdutor, precoUnitario, codigo) {
      router.push(`/compra?codigo=${codigo}&nomeProdutor=${nomeProdutor}&precoUnitario=${precoUnitario}`);
    }


    function formatarParaDinheiro(valor) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor);
      }
      


    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-purple-800 text-black">
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    );
}