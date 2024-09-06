import CargaCafeRepository from "../repository/CargaCafeRepository";

export default class ColecaoCargaCafe extends CargaCafeRepository {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:3001/cargasCafe';
    }

    async salvar(cargaCafe) {
        if (cargaCafe?.id) {
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
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cargaCafe),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar a carga de café.");
            }

            return await response.json();
        }
    }

    async excluir(cargaCafe) {
        if (!cargaCafe?.id) {
            throw new Error("Carga de café inválida, ID é necessário para exclusão.");
        }

        const response = await fetch(`${this.baseUrl}/${cargaCafe.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir a carga de café.");
        }
    }

    async obterTodos() {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Erro ao obter as cargas de café.");
        }

        return await response.json();
    }

    async obterPorId(id) {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Erro ao obter a carga de café.");
        }

        return await response.json();
    }

    async obterPorProdutorId(produtorId) {
        const response = await fetch(`${this.baseUrl}?produtorId=${produtorId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Erro ao obter cargas de café do produtor.");
        }

        return await response.json();
    }
}
