import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/core/models/categorias';
import { Empresa } from 'src/app/core/models/empresa';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { Expediente } from 'src/app/core/models/vagas/expediente';
import { Local } from 'src/app/core/models/vagas/local';
import { Questionario } from 'src/app/core/models/vagas/questionario';
import { Salario } from 'src/app/core/models/vagas/salario';
import { Vagas } from 'src/app/core/models/vagas/vagas';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { EmpresasService } from 'src/app/core/services/empresas.service';
import { VagasService } from 'src/app/core/services/vagas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vagas-inputs',
  templateUrl: './vagas-inputs.component.html',
  styleUrls: ['./vagas-inputs.component.scss']
})
export class VagasInputsComponent {
  public userNotFoundOrSucess: ModalUtility[] = []

  public selecaoCateg: Categorias[] = []
  public categoriaId: number = 0

  public selecaoEmpresa: Empresa[] = []
  public empresaId: number = 0

  private publicacao: Date = new Date()

  isEdit = false

  public erroNoForm: boolean = false

  public mensagemUsuario: boolean = false

  public formModel: Questionario[] = []

  public formVaga: FormGroup = this.formBuilder.group({
    vaga: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
    min: ['', [Validators.required, Validators.minLength(3)]],
    max: ['', [Validators.required, Validators.minLength(4)]],
    quantidade: ['', [Validators.required, Validators.minLength(1)]],
    estado: ['', [Validators.required, Validators.minLength(2)]],
    cidade: ['', [Validators.required, Validators.minLength(2)]],
    descricao: ['', [Validators.required, Validators.minLength(15)]],
    dias: ['', [Validators.required, Validators.minLength(4)]],
    inicio: ['', [Validators.required, Validators.minLength(5)]],
    fim: ['', [Validators.required, Validators.minLength(5)]],
    contratacao: ['', [Validators.required, Validators.minLength(2)]],
    infosAdicionais: ['', [Validators.required, Validators.minLength(10)]]
  });

  idVaga: number = 0

  public tiposPergunta: string[] = [
    'alternativaUnica',
    'alternativaMultipla',
    'texto'
  ]

  ngOnInit(): void {
    let idItem = localStorage.getItem('idDoItem')
    if (this.router.url.includes('editar')) {
      if (idItem) {
        this.getVaga(Number(idItem))
      }
    }
    this.getCateg()
    this.getEmpresa()
  }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private vagasServ: VagasService,
    private categServ: CategoriasService,
    private empresaServ: EmpresasService,

  ) { }

  getVaga(id: number): void {
    this.formModel = []
    this.vagasServ.getId(id).subscribe({
      next: (res) => {
        this.isEdit = true
        this.idVaga = res.id
        this.formVaga.get('vaga')?.patchValue(res.vaga)
        this.categoriaId = res.categoria
        this.empresaId = res.empresa
        this.publicacao = res.publicacao
        this.formVaga.get('min')?.patchValue(res.salario.min)
        this.formVaga.get('max')?.patchValue(res.salario.max)
        this.formVaga.get('estado')?.patchValue(res.local.estado)
        this.formVaga.get('cidade')?.patchValue(res.local.cidade)
        this.formVaga.get('dias')?.patchValue(res.expediente.dias)
        this.formVaga.get('inicio')?.patchValue(res.expediente.inicio)
        this.formVaga.get('fim')?.patchValue(res.expediente.fim)
        this.formVaga.get('descricao')?.patchValue(res.descricao)
        this.formVaga.get('contratacao')?.patchValue(res.contratacao)
        this.formVaga.get('infosAdicionais')?.patchValue(res.infosAdicionais)
        this.formVaga.get('quantidade')?.patchValue(res.quantidade)
        this.formModel = res.questionario
      }
    })
  }

  adicionarVaga(): void {
    let salarioObj: Salario = {
      min: this.formVaga.value.min,
      max: this.formVaga.value.max,
    }
    let localObj: Local = {
      estado: this.formVaga.value.estado,
      cidade: this.formVaga.value.cidade,
    }
    let expedienteObj: Expediente = {
      dias: this.formVaga.value.dias,
      inicio: this.formVaga.value.inicio,
      fim: this.formVaga.value.fim,
    }

    this.publicacao = new Date()

    let empresa: Vagas = {
      vaga: this.formVaga.value.vaga,
      empresa: this.empresaId,
      categoria: this.categoriaId,
      salario: salarioObj,
      local: localObj,
      expediente: expedienteObj,
      publicacao: this.publicacao,
      descricao: this.formVaga.value.descricao,
      contratacao: this.formVaga.value.contratacao,
      infosAdicionais: this.formVaga.value.infosAdicionais,
      quantidade: this.formVaga.value.quantidade,
      id: this.idVaga,
      questionario: this.formModel
    }
    let validarAdd = true    
    this.formModel.map(
      quest => {
        if (quest.pergunta.length === 0 || quest.tipoPergunta.length === 0) {
          validarAdd = false          
        }
        if (quest.tipoPergunta !== 'texto') {
          if (quest.alternativas.length === 0) {
            validarAdd = false
          }

          quest.alternativas.map(
            resAlt => {
              if (resAlt.length === 0) {
                validarAdd = false
              }
            }
          )
        }
      }
    )

    if ( this.categoriaId === 0 || this.empresaId === 0 ) {
      validarAdd = false
    }

    if (this.formVaga.status === 'VALID' && validarAdd === true) {
      this.vagasServ.post(empresa).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Item adicionado com sucesso!',
            text: 'Você sera redirecionado para a Tabela.',
            icon: 'success',
            confirmButtonText: 'OK!'
          }).then( (result) => {
            this.router.navigate(['/cms/tabela/vaga'])
          })
          this.formVaga.get('idVaga')?.patchValue('')
          this.formVaga.get('idUsuario')?.patchValue('')
        }
      })
    } else {
        Swal.fire({
        title: 'Falha ao adicionar.',
        text: 'Todos os campos são obrigatorios!',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }
  }

  getEmpresa(): void {
    this.empresaServ.getAll().subscribe({
      next: res => {
        this.selecaoEmpresa = res
      }
    })
  }

  getCateg(): void {
    this.categServ.getAll().subscribe({
      next: res => {
        this.selecaoCateg = res
      }
    })
  }

  editarVaga(): void {
    let salarioObj: Salario = {
      min: this.formVaga.value.min,
      max: this.formVaga.value.max,
    }
    let localObj: Local = {
      estado: this.formVaga.value.estado,
      cidade: this.formVaga.value.cidade,
    }
    let expedienteObj: Expediente = {
      dias: this.formVaga.value.dias,
      inicio: this.formVaga.value.inicio,
      fim: this.formVaga.value.fim,
    }

    let empresa: Vagas = {
      vaga: this.formVaga.value.vaga,
      empresa: this.empresaId,
      categoria: this.categoriaId,
      salario: salarioObj,
      local: localObj,
      expediente: expedienteObj,
      publicacao: this.publicacao,
      descricao: this.formVaga.value.descricao,
      contratacao: this.formVaga.value.contratacao,
      infosAdicionais: this.formVaga.value.infosAdicionais,
      quantidade: this.formVaga.value.quantidade,
      id: this.idVaga,
      questionario: this.formModel
    }

    let validarEdit = true
    this.formModel.map(
      res => {
        if (res.pergunta.length === 0 || res.tipoPergunta.length === 0) {
          validarEdit = false
        }
        if (res.tipoPergunta !== 'texto') {
          if (res.alternativas.length === 0) {
            validarEdit = false
          }

          res.alternativas.map(
            resAlt => {
              if (resAlt.length === 0) {
                validarEdit = false
              }
            }
          )

        }
      }
    )

    if ( this.categoriaId === 0 || this.empresaId === 0 ) {
      validarEdit = false      
    }

    if (this.formVaga.status === 'VALID' && validarEdit === true) {

      this.vagasServ.editar(empresa).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Item editado com sucesso!',
            text: 'Você sera redirecionado para a Tabela.',
            icon: 'success',
            confirmButtonText: 'OK!'
          }).then( (result) => {
            this.router.navigate(['/cms/tabela/vaga'])
          })
          this.formVaga.get('nome')?.patchValue('')
          this.formVaga.get('logo')?.patchValue('')
        }
      })
    } else {
      Swal.fire({
        title: 'Falha ao editar.',
        text: 'Todos os campos são obrigatorios!',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }
  }

  excluirPergunta(questIndex: number): void {
    this.formModel.splice(questIndex, 1)
  }

  adicionarPergunta() {
    let objPergunta: Questionario = {
      tipoPergunta: 'alternativaUnica',
      pergunta: '',
      alternativas: []
    }
    this.formModel.push(objPergunta)
  }

  trackByFn(index: number): number {
    return index;
  }

  adicionarAlternativa(questIndex: number): void {
    if (this.formModel[questIndex]) {
      this.formModel[questIndex].alternativas.push('');
    }
  }

  apagarAlternativa(questIndex: number, altIndex: number): void {
    this.formModel[questIndex].alternativas.splice(altIndex, 1);
  }

  closeModalErroForm(evento: string): void {
    if (evento) {
      this.erroNoForm = false
    }
  }

  validarCampo(alternativa: string): boolean {
    return alternativa.trim().length >= 1;
  }
}
