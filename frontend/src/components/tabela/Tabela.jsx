import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Tabela() {
    const [sacas, setSacas] = useState([]);
    const router = useRouter();

    

    useEffect(() => {
        const fetchProducers = () => {
            setSacas([
                {
                  "codigo": "1",
                  "nomeProdutor": "Fazenda Santa Clara",
                  "quantidadeSacas": 100,
                  "precoUnitario": 150.0,
                },
                {
                  "codigo": "2",
                  "nomeProdutor": "Fazenda Boa Vista",
                  "quantidadeSacas": 200,
                  "precoUnitario": 140.0,
                },
                {
                  "codigo": "3",
                  "nomeProdutor": "Fazenda Monte Verde",
                  "quantidadeSacas": 150,
                  "precoUnitario": 160.0,
                },
                {
                  "codigo": "4",
                  "nomeProdutor": "Fazenda Verde Campo",
                  "quantidadeSacas": 250,
                  "precoUnitario": 155.0,
                },
                {
                  "codigo": "5",
                  "nomeProdutor": "Fazenda Café do Sul",
                  "quantidadeSacas": 300,
                  "precoUnitario": 145.0,
                }
              ]);
        }

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
              <i className="fa fa-money" onClick={() => mostra(saca.nomeProdutor)}></i>
            </td>
          </tr>
        ));
      }

    function mostra(nomeFazenda) {
        router.push(`/compra?nomeFazenda=${nomeFazenda}`);
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