import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Empresa } from 'src/app/core/models/empresa';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { EmpresasService } from 'src/app/core/services/empresas.service';

@Component({
  selector: 'app-empresa-inputs',
  templateUrl: './empresa-inputs.component.html',
  styleUrls: ['./empresa-inputs.component.scss']
})
export class EmpresaInputsComponent {

  empresaId: number = 0
  public userNotFoundOrSucess: ModalUtility[] = []

  isEdit = false

  public mensagemUsuario: boolean = false

  public erroNoForm: boolean = false

  public formEmpresa: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    logo: ['', [Validators.required]]
  });

  ngOnInit(): void {
    let idItem = localStorage.getItem('idDoItem')
    if (this.router.url.includes('editar')) {
      if (idItem) {
        this.getEmpresa(Number(idItem))
      }
    }
  }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private empresaServ: EmpresasService
  ) { }

  adicionarEmpresa(): void {
    let obj: Empresa = {
      id: 0,
      nome: this.formEmpresa.value.nome,
      logo: this.formEmpresa.value.logo
    }
    if (this.formEmpresa.status === 'VALID') {
      this.empresaServ.post(obj).subscribe({
        next: (res) => {
          this.mensagemUsuario = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Item adicionado com sucesso!',
              tipo: 'alert'
            }
          ]
          this.formEmpresa.get('nome')?.patchValue('')
          this.formEmpresa.get('logo')?.patchValue('')
          setTimeout(() => {
            this.mensagemUsuario = false
            this.router.navigate(['/cms/tabela/empresa'])
          }, 1000);
        }
      })
    } else {
      this.erroNoForm = true
      this.userNotFoundOrSucess = [
        {
          nome: 'Todos os campos são obrigatorios!',
          tipo: 'texto'
        },
        {
          nome: 'OK',
          tipo: 'button'
        }
      ]
    }
  }

  getEmpresa(id: number): void {
    this.empresaServ.getId(id).subscribe({
      next: (res) => {
        this.empresaId = res.id
        this.formEmpresa.get('nome')?.patchValue(res.nome)
        this.formEmpresa.get('logo')?.patchValue(res.logo)
        this.isEdit = true
      }
    })
  }

  editarEmpresa() {
    let empresa: Empresa = {
      id: this.empresaId,
      nome: this.formEmpresa.value.nome,
      logo: this.formEmpresa.value.logo
    }
    if (this.formEmpresa.status === 'VALID') {
      this.empresaServ.editar(empresa).subscribe({
        next: (res) => {
          this.mensagemUsuario = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Item editado com sucesso!',
              tipo: 'sucess'
            }
          ]
          this.formEmpresa.get('nome')?.patchValue('')
          this.formEmpresa.get('logo')?.patchValue('')
          setTimeout(() => {
            this.mensagemUsuario = false
            this.router.navigate(['/cms/tabela/empresa'])
          }, 1000);
        }
      })
    } else {
      this.erroNoForm = true
      this.userNotFoundOrSucess = [
        {
          nome: 'Todos os campos são obrigatorios!',
          tipo: 'texto'
        },
        {
          nome: 'OK',
          tipo: 'button'
        }
      ]
    }
  }

  closeModalErroForm(evento: string): void {
    if (evento) {
      this.erroNoForm = false
    }
  }
}
