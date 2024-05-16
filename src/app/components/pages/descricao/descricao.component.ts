import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/core/models/empresa';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { RespostasQuestionario } from 'src/app/core/models/respostas-questionario';
import { Vagas } from 'src/app/core/models/vagas/vagas';
import { EmpresasService } from 'src/app/core/services/empresas.service';
import { RespostaQuestService } from 'src/app/core/services/resposta-quest.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { VagasService } from 'src/app/core/services/vagas.service';

@Component({
  selector: 'app-descricao',
  templateUrl: './descricao.component.html',
  styleUrls: ['./descricao.component.scss']
})
export class DescricaoComponent {

  dadosVaga: Vagas = new Vagas();

  dadosEmpresa: Empresa = new Empresa()

  modalAvisoLogin: ModalUtility[] = [
    {
      nome: 'Faça o login para responder o questionário',
      tipo: 'texto'
    },
    {
      nome: 'Fazer login',
      tipo: 'button'
    },
    {
      nome: 'OK',
      tipo: 'button'
    }
  ]
  n: number = 0

  // Parte do formulario
  arrayModelResposta: string[][] = []
  indexDasPerguntas: number = 0

  logado: boolean = false

  modalInfoQuest: boolean = false

  modalOpen: boolean = false

  mensagemTamanhoTexto: string = ''

  userLog = JSON.parse(localStorage.getItem('acessUser') as string);
  idDetalhesVaga = JSON.parse(localStorage.getItem('idVagaDetalhes') as string);


  constructor(
    private empresaServ: EmpresasService,
    private vagaServ: VagasService,
    private respServ: RespostaQuestService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.idDetalhesVaga) {
      this.getVaga(this.idDetalhesVaga)
    }
  }

  getVaga(id: number): void {
    this.vagaServ.getId(id).subscribe({
      next: (res) => {
        this.dadosVaga = res
        this.getEmpresa(res.empresa)
        this.indexDasPerguntas = this.dadosVaga.questionario.length
      }
    })
  }

  respAltUnic(arrayPerguntaIndex: number, respUsuario: string) {
    this.arrayModelResposta[arrayPerguntaIndex] = [respUsuario]
  }

  respUsuario(arrayPerguntaIndex: number, respUsuario: string) {
    if (!this.arrayModelResposta[arrayPerguntaIndex]) {
      this.arrayModelResposta[arrayPerguntaIndex] = [];
    }
    if (this.arrayModelResposta[arrayPerguntaIndex].includes(respUsuario)) {
      this.arrayModelResposta[arrayPerguntaIndex] = this.arrayModelResposta[arrayPerguntaIndex].filter((resp) => resp !== respUsuario);
    } else {
      this.arrayModelResposta[arrayPerguntaIndex].push(respUsuario);
    }
  }

  respText(arrayPerguntaIndex: number, respUsuario: string) {
    this.arrayModelResposta[arrayPerguntaIndex] = []
    if (respUsuario.length >= 10) {
      if (this.n === arrayPerguntaIndex) {
        this.mensagemTamanhoTexto = ''
        this.arrayModelResposta[arrayPerguntaIndex] = [respUsuario]
      }
    } else {
      this.mensagemTamanhoTexto = 'Minimo de caracteres: 10'
      this.n = arrayPerguntaIndex
    }
  }

  getEmpresa(id: number): void {
    this.empresaServ.getId(id).subscribe({
      next: (resEmp) => {
        this.dadosEmpresa = resEmp
      }
    })
  }

  finalizarQuestionario() {
    let validar = true
    this.arrayModelResposta.map(
      res => {
        if (res.length === 0) {
          validar = false
        }
      })

    if (validar === true && this.arrayModelResposta.length === this.indexDasPerguntas) {
      const arrayRespUsuario: RespostasQuestionario = {
        id: 0,
        idDaVaga: this.idDetalhesVaga,
        idUsuario: this.userLog.id,
        respostas:
          this.arrayModelResposta,
      }
      this.respServ.postResp(
        arrayRespUsuario
      ).subscribe({
        next: (res) => {
          this.arrayModelResposta = []
          this.modalInfoQuest = true
          this.modalAvisoLogin = [
            {
              nome: 'Formulario incluido com sucesso!',
              tipo: 'texto'
            },
            {
              nome: 'OK',
              tipo: 'button'
            }
          ]
        }
      })
    } else {
      this.modalInfoQuest = true
      this.modalAvisoLogin = [
        {
          nome: 'Todos os campos são obrigatorios!',
          tipo: 'texto'
        },
        {
          nome: 'Continuar',
          tipo: 'button'
        }
      ]
    }
  }

  openModal() {
    this.modalOpen = true
    if (this.userLog !== null) {
      if (this.userLog.tipo === 'cliente') {
        this.logado = true
      }
      if (this.userLog.tipo === 'admin') {
        this.modalAvisoLogin = [
          {
            nome: 'Você está logado como adm, faça o login como usuario para responder o questionário',
            tipo: 'texto'
          },
          {
            nome: 'Fazer login',
            tipo: 'button'
          },
          {
            nome: 'OK',
            tipo: 'button'
          }
        ]
      }
    }
  }

  closeModal() {
    this.modalOpen = false
    this.arrayModelResposta = []
  }

  closeModalQuestOk(resp: string) {

    if (resp === 'OK') {
      this.modalInfoQuest = false
      setTimeout(() => {
        this.modalOpen = false
      }, 300)
    } if (resp === 'Continuar') {
      this.modalInfoQuest = false
    }
  }

  closeOrLogin(evento: string) {
    if (evento == 'Fazer login') {
      localStorage.removeItem('acessUser');
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 500)
    } if (evento == 'OK') {
      this.modalOpen = false
    }
  }

}
