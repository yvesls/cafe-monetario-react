export class Comprador {
  
  constructor(cnpj, nome, id, valorDisponivel) {
    this.id = id;
    this.cnpj = cnpj;
    this.nome = nome;
    this.valorDisponivel = valorDisponivel;
  }

  static vazio() {
      return new Cliente('', '', null, '');
  }

  getId() {
    return this.id;
  }


  getCnpj() {
    return this.cnpj;
  }


  getNome() {
    return this.nome;
  }

  getValorDisponivel() {
    return this.valorDisponivel;
  }
}
