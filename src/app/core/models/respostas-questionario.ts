export class RespostasQuestionario {
  public id: number;
  public idDaVaga: number;
  public idUsuario: number;
  public respostas: Array<Array<string>>;

  constructor() {
    this.id = 0
    this.idDaVaga = 0
    this.idUsuario = 0
    this.respostas = [[]]
  }
}
