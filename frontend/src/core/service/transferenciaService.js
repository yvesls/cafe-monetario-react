import ColecaoCargaCafe from "../colecao/ColecaoCargaCafe";
import ColecaoCompra from "../colecao/ColecaoCompra";
import ColecaoComprador from "../colecao/ColecaoComprador";
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
      console.error("Erro ao salvar produtor:", error); //Levantar a exeção
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
    console.log(comp)
  
  }

  async atualizarCompra(transferencia,compraId){
    const compra = new ColecaoCompra();
    const comp = await compra.obterPorId(compraId);
    console.log(comp)
  }

}
