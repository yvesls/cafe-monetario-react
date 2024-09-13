import CompraRepository from "../repository/CompraRepositoy";
import ColecaoCargaCafe from "./ColecaoCargaCafe";
import ColecaoComprador from "./ColecaoComprador";

export default class ColecaoCompra extends CompraRepository {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:3001/compra';
    }

    async salvar(compra) {
        const { compradorId, cargaId, quantidadeComprada } = compra;

        const colecaoCarga = new ColecaoCargaCafe();
        const carga = await colecaoCarga.obterPorId(cargaId);
        
        if (!carga) {
            throw new Error("Carga de café não encontrada.");
        }

        const colecaoComprador = new ColecaoComprador();
        const comprador = await colecaoComprador.obterPorId(compradorId);

        if (!comprador) {
            throw new Error("Comprador não encontrado.");
        }

        const valorTotalCompra = quantidadeComprada * carga.precoUnitario;

        if (comprador.valorInvestimentoTotal < valorTotalCompra) {
            throw new Error("Saldo insuficiente para realizar a compra.");
        }

        if (quantidadeComprada > carga.quantidadeDisponivel) {
            throw new Error("Quantidade de sacas insuficiente na carga.");
        }

        carga.quantidadeDisponivel -= quantidadeComprada;
        
        if (carga.quantidadeDisponivel === 0) {
            carga.disponivel = false;
        }

        comprador.valorInvestimentoTotal -= valorTotalCompra;

        comprador.totalInvestido = comprador.totalInvestido
            ? comprador.totalInvestido + valorTotalCompra
            : valorTotalCompra;

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(compra),
        });

        if (!response.ok) {
            throw new Error("Erro ao registrar a compra.");
        }

        await colecaoCarga.salvar(carga);
        await colecaoComprador.salvar(comprador);

        return await response.json();
    }

    async excluir(compra) {
        if (!compra?.id) {
            throw new Error("Compra inválida, ID é necessário para exclusão.");
        }

        const response = await fetch(`${this.baseUrl}/${compra.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir a compra.");
        }
    }

    async obterTodos() {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Erro ao obter a lista de compras.");
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

}
