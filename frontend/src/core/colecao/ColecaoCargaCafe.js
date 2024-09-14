import CargaCafeRepository from "../repository/CargaCafeRepository";
import ErrorException from "../Exception/ErrorException.jsx";
import ColecaoProdutor from "./ColecaoProdutor.js";

export default class ColecaoCargaCafe extends CargaCafeRepository {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:3001/cargasCafe';
    }

    async salvar(cargaCafe) {
        if (cargaCafe?.id) {
            this.valida(cargaCafe);

            const response = await fetch(`${this.baseUrl}/${cargaCafe.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cargaCafe),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar a carga de café.");
            }

            return await response.json();
        } else {
            this.valida(cargaCafe);

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cargaCafe),
            });

            if (!response.ok) {
                throw new ErrorException("error", "Erro ao criar a carga de café.");
            }
        
            return await response.json();
        }
    }

    async excluir(cargaCafe) {
        if (!cargaCafe?.id) {
            throw new ErrorException("error", "Carga de café inválida, ID é necessário para exclusão.");
        }

        const response = await fetch(`${this.baseUrl}/${cargaCafe.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao excluir a carga de café.");
        }
    }

    async obterTodos() {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao obter as cargas de café.");
        }

        return await response.json();
    }

    async obterPorId(id) {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao obter a carga de café.");
        }

        return await response.json();
    }

    async obterPorProdutorId(produtorId) {
        const response = await fetch(`${this.baseUrl}?produtorId=${produtorId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao obter cargas de café do produtor.");
        }

        return await response.json();
    }

    async valida(cargaCafe) {
        const { produtorId, quantidadeSacas, precoUnitario } = cargaCafe;
        const erros = [];

        if (!produtorId || typeof produtorId !== 'number' || produtorId <= 0) {
            erros.push("O ID do produtor é inválido ou está ausente.");
        }

        if (!quantidadeSacas || typeof quantidadeSacas !== 'number' || quantidadeSacas <= 0) {
            erros.push("A quantidade de sacas deve ser um número maior que zero.");
        }

        if (quantidadeSacas > 1000000) {
            erros.push("A quantidade de sacas é muito alta. O máximo permitido é 1.000.000 sacas.");
        }

        if (!precoUnitario || typeof precoUnitario !== 'number' || precoUnitario <= 0) {
            erros.push("O preço unitário deve ser um número maior que zero.");
        }

        if (precoUnitario > 10000) {
            erros.push("O preço unitário é muito alto. O máximo permitido é 10.000.");
        }

        if (erros.length > 0) {
            const colecaoProdutor = new ColecaoProdutor();
            await colecaoProdutor.excluir(produtorId);

            throw new ErrorException("info", erros.join(" "));
        }
    }
}
