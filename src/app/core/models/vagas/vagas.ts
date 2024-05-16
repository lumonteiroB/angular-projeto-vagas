import { Expediente } from "./expediente";
import { Local } from "./local";
import { Questionario } from "./questionario";
import { Salario } from "./salario";

export class Vagas {
  public id: number;
  public vaga: string;
  public categoria: number;
  public empresa: number;
  public salario: Salario;
  public quantidade: number;
  public local: Local;
  public publicacao: Date;
  public descricao: string;
  public expediente: Expediente;
  public contratacao: string;
  public infosAdicionais: string;
  public questionario: Array<Questionario>;
  
  constructor() {
    this.id = 0;
    this.vaga = '';
    this.categoria = 0;
    this.empresa = 0;
    this.salario = new Salario;
    this.quantidade = 0;
    this.local = new Local;
    this.publicacao = new Date;
    this.descricao = '';
    this.expediente = new Expediente;
    this.contratacao = '';
    this.infosAdicionais = '';
    this.questionario = [];
  }
}
