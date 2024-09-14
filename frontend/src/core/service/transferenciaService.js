import ColecaoCargaCafe from "../colecao/ColecaoCargaCafe";
import ColecaoCompra from "../colecao/ColecaoCompra";
import ColecaoComprador from "../colecao/ColecaoComprador";
import ColecaoProdutor from "../colecao/ColecaoProdutor";
import ColecaoTransferencia from "../colecao/ColecaoTransferencia";

export default class TransferenciaService {

  async salvarCompra(transferencia, compraId){
    const transferenciaRepo = new ColecaoTransferencia();
    
    try {
      await transferenciaRepo.salvar(transferencia);
      await this.atualizarProdutor(transferencia)
      await this.atualizarComprador(transferencia)
      await this.atualizarCompra(transferencia,compraId)
      /* console.log("Produtor salvo com sucesso!"); */ //Jogar no modal
    } catch (error) {
      console.error("Erro ao salvar produtor:", error);
    }

  }

  async atualizarProdutor(transferencia){
    const carga = new ColecaoCargaCafe();
    const carg = await carga.obterPorProdutorId(transferencia.ProdutoDestinoId);
    carg[0].quantidadeSacas += transferencia.quantidadeTransferida

    try{
      carga.salvar(carg[0])
    }catch(error){

    }
    
  }

  async atualizarComprador(transferencia){
    const comprador = new ColecaoComprador();
    const comp =  await comprador.obterPorId(transferencia.compradorOrigemId);
    comp.valorTotalInvestido -= transferencia.ValorTransferido

    
    try{
      comprador.salvar(comp)
    }catch(error){

    }

  }

  async atualizarCompra(transferencia,compraId){
    const compra = new ColecaoCompra();
    const comp = await compra.obterPorId(compraId);

    const diferenca = comp.quantidadeComprada - transferencia.quantidadeTransferida
    comp.valorTotal -= (comp.valorTotal / comp.quantidadeComprada) * transferencia.quantidadeTransferida

    if(diferenca <= 0 ){
       try{
        compra.excluir(compraId)
       }catch(error){

       }
    }else{
      try{
        comp.quantidadeComprada = diferenca
        compra.update(comp)
      }catch(error){
  
      }
    }
  }

  _getTransferencia = async () => {
    const trans = new ColecaoTransferencia();
    return await trans.obterTodos();
  };

  _getCargas = async () => {
    const cargas = new ColecaoCargaCafe();
    return await cargas.obterTodos();
  };
   _getProdutor = async () => {
    const produtor = new ColecaoProdutor();
    return await produtor.obterTodos();
  };

  _getComprador = async () => {
    const comprador = new ColecaoComprador();
    return await comprador.obterTodos();
  };

  async getAllTransferecia() {
    const resultado = [];

    const produtores = await this._getProdutor();
    const sacas = await this._getCargas();
    const transferencias = await this._getTransferencia();
    const compradores = await this._getComprador();

    transferencias.map((transferencia) => {
      const comprador = compradores.find(
        (comp) => comp.id == transferencia.compradorOrigemId
      );
      const produtor = produtores.find(
        (prod) => prod.id == transferencia.ProdutoDestinoId
      );
      resultado.push({
        ...transferencia,
        nomeFazenda: produtor.nomeFazenda,
        compradorNome: comprador.nome,
      });
    });
    
    return resultado
  }

}
