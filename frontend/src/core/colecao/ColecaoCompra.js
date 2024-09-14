import CompraRepository from "../repository/CompraRepositoy";
import ColecaoCargaCafe from "./ColecaoCargaCafe";
import ColecaoComprador from "./ColecaoComprador";
import ErrorException from "../Exception/ErrorException.jsx";

export default class ColecaoCompra extends CompraRepository {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:3001/compra';
    }

    async salvar(compra) {
        const { compradorId, cargaId, quantidadeComprada } = compra;
        const erros = [];

        const colecaoCarga = new ColecaoCargaCafe();
        const carga = await colecaoCarga.obterPorId(cargaId);
        
        if (!carga) {
            throw new ErrorException("error", "Carga de café não encontrada.");
        }

        const colecaoComprador = new ColecaoComprador();
        const comprador = await colecaoComprador.obterPorId(compradorId);

        if (!comprador) {
            throw new ErrorException("error", "Comprador não encontrado.");
        }

        if (!quantidadeComprada || typeof quantidadeComprada !== 'number' || quantidadeComprada <= 0 || quantidadeComprada > 100000000) {
            erros.push("A quantidade comprada deve ser um número maior que zero e menor que 100.000.000.");
        }

        const valorTotalCompra = quantidadeComprada * carga.precoUnitario;

        if ((comprador.valorInvestimentoTotal - comprador.valorTotalInvestido) < valorTotalCompra) {
           erros.push("Saldo insuficiente para realizar a compra.");
        }

        if (quantidadeComprada > carga.quantidadeSacas) {
            erros.push("Quantidade de sacas insuficiente na carga.");
        }

        if (erros.length > 0) {
            throw new ErrorException("info", erros.join(" "));
        }

        carga.quantidadeSacas -= quantidadeComprada;
        
        comprador.valorTotalInvestido += valorTotalCompra;

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(compra),
        });
        console.log(!response.ok)
        if (!response.ok) {
            throw new ErrorException("error", "Erro ao registrar a compra.");
        }

        await colecaoCarga.salvar(carga);
        await colecaoComprador.salvar(comprador);

        return await response.json();
    }   

    async excluir(compraId) {
        if (!compraId) {
            throw new ErrorException("error", "Compra inválida, ID é necessário para exclusão.");
        }

        const response = await fetch(`${this.baseUrl}/${compraId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao excluir a compra.");
        }
    }

    async obterTodos() {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new ErrorException("error", "Erro ao obter a lista de compras.");
        }

        return await response.json();
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


    async update(compra){
        if (compra?.id) {
            const response = await fetch(`${this.baseUrl}/${compra.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compra),
            });

            if (!response.ok) {
                throw new ErrorException("error", "Erro ao atualizar a compra.");
            }

            return await response.json();
        } 
    }


}
