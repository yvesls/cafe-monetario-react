export class Cliente {
  private _id: string | null;
  private _nome: string;
  private _idade: number;

  constructor(nome: string, idade: number, id: string | null = null) {
    this._nome = nome;
    this._idade = idade;
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get idade() {
    return this._idade;
  }

  set id(id: string | null) {
    this._id = id;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  set idade(idade: number) {
    this._idade = idade;
  }

  static vazio(): Cliente {
    return new Cliente("", 0);
  }
}
