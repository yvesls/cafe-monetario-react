import CompradorRepository from "../repository/CompradorRepository";
import ErrorException from "../Exception/ErrorException.jsx";

export default class ColecaoComprador extends CompradorRepository {
    constructor() {
        super()
        this.baseUrl = 'http://localhost:3001/comprador';
    }

    async salvar(comprador) {
        if (comprador?.id) {
            const response = await fetch(`${this.baseUrl}/${comprador.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comprador),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar o comprador.");
            }

            return await response.json();
        } else {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comprador),
            });

            if (!response.ok) {
                throw new ErrorException("error", "Erro ao criar o comprador.");
            }

            return await response.json();
        }
    }

    async excluir(compradorId) {
        if (!compradorId) {
            throw new ErrorException("error", "comprador inválido, ID é necessário para exclusão.");
        }

        const response = await fetch(`${this.baseUrl}/${compradorId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao excluir o comprador.");
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao obter o produtor.");
        }

        return await response.json();
    }

    async obterTodos() {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao obter a lista de compradores.");
        }

        return await response.json();
    }
}
