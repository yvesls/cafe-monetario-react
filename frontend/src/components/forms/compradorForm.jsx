import { useState } from 'react';
import { formatarCNPJ, removerMascaraCNPJ } from '../../utils/maskUtils';
import ColecaoComprador from '../../core/colecao/ColecaoComprador';
import { useModal } from '../../core/service/ModalService.js';

export default function CompradorForm() {
    const [nome, setNome] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [valorInvestimentoTotal, setValorInvestimentoTotal] = useState('');
    const { showModal } = useModal();
    
    const compradorRepo = new ColecaoComprador();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cnpjSemMascara = removerMascaraCNPJ(cnpj);

        const comprador = {
            nome,
            cnpj: cnpjSemMascara,
            valorInvestimentoTotal: Number(valorInvestimentoTotal),
            valorTotalInvestido: 0,
        };

        try {
            await compradorRepo.salvar(comprador);

            setNome('');
            setCNPJ('');
            setValorInvestimentoTotal('');

            showModal("Sucesso!", `Produtor salvo com sucesso!`, "success");
        } catch (error) {
            showModal(error.tipo === "info" ? "Atenção!" : "Erro Inesperado!", `${error.message}`, error.tipo);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nome">Nome do Comprador:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do Comprador"
                    required
                />
            </div>
            <div>
                <label htmlFor="cnpj">CNPJ:</label>
                <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCNPJ(formatarCNPJ(e.target.value))}
                    placeholder="XX.XXX.XXX/XXXX-XX"
                    maxLength={18}
                    required
                />
            </div>
            <div>
                <label htmlFor="valorInvestimentoTotal">Valor Total de Investimento:</label>
                <input
                    type="number"
                    value={valorInvestimentoTotal}
                    onChange={(e) => setValorInvestimentoTotal(e.target.value)}
                    placeholder="Valor de Investimento"
                    required
                />
            </div>
            <div className='div-button'>
                <button type="submit">Cadastrar</button>
            </div>
        </form>
    );
}
