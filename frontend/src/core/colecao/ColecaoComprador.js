export default class ColecaoComprador {
    constructor() {
        this.baseUrl = 'http://localhost:3001/comprador';
    }

    async salvar(comprador) {
        if (comprador?.id) {
            // Atualizar comprador existente
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
            // Criar novo comprador
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comprador),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar o comprador.");
            }

            return await response.json();
        }
    }

    async excluir(comprador) {
        if (!comprador?.id) {
            throw new Error("comprador inválido, ID é necessário para exclusão.");
        }

        const response = await fetch(`${this.baseUrl}/${comprador.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir o comprador.");
        }
    }

    async obterTodos() {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Erro ao obter a lista de compradores.");
        }

        return await response.json();
    }
}
