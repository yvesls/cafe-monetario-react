import ColecaoCargaCafe from "../colecao/ColecaoCargaCafe";
import ColecaoCompra from "../colecao/ColecaoCompra";
import ColecaoComprador from "../colecao/ColecaoComprador";
import ColecaoProdutor from "../colecao/ColecaoProdutor";

export default class CompraService {
  _getCompras = async () => {
    const compra = new ColecaoCompra();
    return await compra.obterTodos();
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

  async ProdutoreSaca() {
    const resultado = [];
    
    const produtores = await this._getProdutor();
    const sacas = await this._getCargas();
    const compras = await this._getCompras();
    const compradores = await this._getComprador();

    compras.map((compra) => {
      const comprador = compradores.find(
        (comp) => comp.id == compra.compradorId
      );
      const sacaCafe = sacas.find((sac) => compra.cargaId == sac.id);
      const produtor = produtores.find(
        (prod) => prod.id == sacaCafe.produtorId
      );
      resultado.push({
        ...compra,
        produtorId: produtor.id,
        nomeFazenda: produtor.nomeFazenda,
        compradorNome: comprador.nome,
      });
    });
    
    return resultado
  }

}
