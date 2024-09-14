export default class ErrorException extends Error {
  constructor(tipo, message) {
    super(message);
    this.tipo = tipo;
    this.name = "ErrorException";
  }
}