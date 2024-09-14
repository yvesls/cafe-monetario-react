import ProdutorRepository from "../repository/ProdutorRepository";
import ColecaoCargaCafe from "./ColecaoCargaCafe"; 

export default class ColecaoProdutor extends ProdutorRepository {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:3001/produtores';
    }

    async salvar(produtor) {
        if (produtor?.id) {
            const response = await fetch(`${this.baseUrl}/${produtor.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtor),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar o produtor.");
            }

            return await response.json();
        } else {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtor),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar o produtor.");
            }

            return await response.json();
        }
    }

    async excluir(produtor) {
        if (!produtor?.id) {
            throw new Error("Produtor inválido, ID é necessário para exclusão.");
        }

        const response = await fetch(`${this.baseUrl}/${produtor.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir o produtor.");
        }
    }

    async obterTodos() {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Erro ao obter os produtores.");
        }

        return await response.json();
    }

    async obterPorId(id) {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Erro ao obter o produtor.");
        }

        return await response.json();
    }

    async obterProdutorESacaPorId(idProdutor) {
        const produtor = await this.obterPorId(idProdutor);
        
        if (!produtor) {
            throw new Error("Produtor não encontrado.");
        }

        const colecaoCargaCafe = new ColecaoCargaCafe();

        const cargasDoProdutor = await colecaoCargaCafe.obterPorProdutorId(idProdutor);

        return {
            produtor: {
                id: produtor.id,
                nomeFazenda: produtor.nomeFazenda,
                saca: cargasDoProdutor[0]
            },
           
        };
    }


    async findCargasComProdutores() {
        const colecaoCargaCafe = new ColecaoCargaCafe();

        const produtores = await this.obterTodos();
        const cargasCafe = await colecaoCargaCafe.obterTodos();

        const result = cargasCafe.map(carga => {
            const produtor = produtores.find(p => p.id === carga.produtorId);
            return {
                codigo: carga.id,
                nomeProdutor: produtor ? produtor.nomeFazenda : 'Produtor não encontrado',
                quantidadeSacas: carga.quantidadeSacas,
                precoUnitario: carga.precoUnitario
            };
        });

        return result;
    }
}
