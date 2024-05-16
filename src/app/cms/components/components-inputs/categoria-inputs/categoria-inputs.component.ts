import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/core/models/categorias';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { CategoriasService } from 'src/app/core/services/categorias.service';

@Component({
  selector: 'app-categoria-inputs',
  templateUrl: './categoria-inputs.component.html',
  styleUrls: ['./categoria-inputs.component.scss']
})
export class CategoriaInputsComponent implements OnInit {

  categId: number = 0

  isEdit = false

  public erroNoForm: boolean = false

  public userNotFoundOrSucess: ModalUtility[] = []

  public mensagemUsuario: boolean = false

  public formCateg: FormGroup = this.formBuilder.group({
    nomeCateg: ['', [Validators.required]],
    iconeCateg: ['', [Validators.required]]
  });

  ngOnInit(): void {
    let idItem = localStorage.getItem('idDoItem')

    if (this.router.url.includes('editar')) {
      if (idItem) {
        this.getCateg(Number(idItem))
      }
    }
  }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private categServ: CategoriasService
  ) { }

  getCateg(id: number): void {
    this.categServ.getId(id).subscribe({
      next: (res) => {
        this.categId = res.id
        this.formCateg.get('iconeCateg')?.patchValue(res.icone)
        this.formCateg.get('nomeCateg')?.patchValue(res.categoria)
        this.isEdit = true
      }
    })
  }

  adicionarCateg(): void {
    let obj: Categorias = {
      id: 0,
      categoria: this.formCateg.value.nomeCateg,
      icone: this.formCateg.value.iconeCateg
    }

    if (this.formCateg.status === 'VALID') {
      this.categServ.post(obj).subscribe({
        next: (res) => {
          this.mensagemUsuario = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Item adicionado com sucesso!',
              tipo: 'alert'
            }
          ]
          this.formCateg.get('iconeCateg')?.patchValue('')
          this.formCateg.get('nomeCateg')?.patchValue('')
          setTimeout(() => {
            this.mensagemUsuario = false
            this.router.navigate(['/cms/tabela/categoria'])
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

  editarCateg() {
    let categ: Categorias = {
      id: this.categId,
      categoria: this.formCateg.value.nomeCateg,
      icone: this.formCateg.value.iconeCateg
    }
    if (this.formCateg.status === 'VALID') {
      this.categServ.editar(categ).subscribe({
        next: (res) => {
          this.mensagemUsuario = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Item editado com sucesso!',
              tipo: 'sucess'
            }
          ]
          this.formCateg.get('iconeCateg')?.patchValue('')
          this.formCateg.get('nomeCateg')?.patchValue('')
          setTimeout(() => {
            this.mensagemUsuario = false
            this.router.navigate(['/cms/tabela/categoria'])
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
