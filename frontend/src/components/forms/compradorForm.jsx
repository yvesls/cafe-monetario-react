import { useState } from 'react';
import { formatarCNPJ, removerMascaraCNPJ } from '../../utils/maskUtils';

export default function CompradorForm() {
    const [nome, setNome] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [valorInvestimentoTotal, setValorInvestimentoTotal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const cnpjSemMascara = removerMascaraCNPJ(cnpj);
        console.log('Nome:', nome);
        console.log('CNPJ:', cnpjSemMascara);
        console.log('Valor Investimento Total:', valorInvestimentoTotal);
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
