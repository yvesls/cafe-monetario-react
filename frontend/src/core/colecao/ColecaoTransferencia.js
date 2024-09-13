import TransferenciaRepository from '../repository/Transferencia';

export default class ColecaoTransferencia extends TransferenciaRepository {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:3001/transferencia';
    }

    async salvar(transferencia) {
        if (transferencia?.id) {
            const response = await fetch(`${this.baseUrl}/${transferencia.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transferencia),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar a transferencia.");
            }

            return await response.json();
        } else {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transferencia),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar a transferencia.");
            }

            return await response.json();
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
            throw new Error("Erro ao obter a transferencia.");
        }

        return await response.json();
    }

}
