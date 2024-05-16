export class Questionario {
  public tipoPergunta: string
  public pergunta: string
  public alternativas: Array<string>

  constructor() {
    this.tipoPergunta = ''
    this.pergunta = ''
    this.alternativas = []
  }
}
