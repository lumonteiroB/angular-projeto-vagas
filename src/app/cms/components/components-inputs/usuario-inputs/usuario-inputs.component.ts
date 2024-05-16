import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FazerLogin } from 'src/app/core/models/fazer-login';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { Usuarios } from 'src/app/core/models/usuarios';
import { FazerLoginService } from 'src/app/core/services/fazer-login.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-usuario-inputs',
  templateUrl: './usuario-inputs.component.html',
  styleUrls: ['./usuario-inputs.component.scss']
})
export class UsuarioInputsComponent {
  dados: Usuarios = new Usuarios()

  public userNotFoundOrSucess: ModalUtility[] = []

  public senha: string = ''

  public erroNoForm: boolean = false

  public tipoAcesso: string[] = [
    'cliente',
    'admin'
  ]

  public acessoDefinido: string = ''

  isEdit = false

  public mensagemUsuario: boolean = false

  public formUsuario: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    nomeCompleto: ['', [Validators.required]],
  });

  ngOnInit(): void {
    let idItem = localStorage.getItem('idDoItem')
    if (this.router.url.includes('editar')) {
      if (idItem) {
        this.getUsuarios(Number(idItem))
      }
    }
  }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private usuarioServ: UsuariosService,
    private loginServ: FazerLoginService
  ) { }

  adicionarUsuario(): void {
    let obj: Usuarios = {
      id: 0,
      username: this.formUsuario.value.username,
      nomeCompleto: this.formUsuario.value.nomeCompleto,
      tipo: this.acessoDefinido,
    }
    if (this.formUsuario.status === 'VALID' && this.senha.length > 0 && this.acessoDefinido.length > 0) {
      this.usuarioServ.post(obj).subscribe({
        next: (res) => {
          let objFazerLogin: FazerLogin = {
            id: res.id,
            username: res.username,
            idUsuario: res.id,
            senha: this.senha
          }
          this.loginServ.postLogin(objFazerLogin).subscribe({
            next: (resLogin) => {
              this.mensagemUsuario = true
              this.userNotFoundOrSucess = [
                {
                  nome: 'Item adicionado com sucesso!',
                  tipo: 'alert'
                }
              ]
            }
          })
          this.formUsuario.get('nome')?.patchValue('')
          this.formUsuario.get('logo')?.patchValue('')
          setTimeout(() => {
            this.mensagemUsuario = false
            this.router.navigate(['/cms/tabela/usuario'])
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

  getUsuarios(id: number): void {
    this.usuarioServ.getId(id).subscribe({
      next: (res) => {
        this.dados = res
        this.formUsuario.get('username')?.patchValue(res.username)
        this.formUsuario.get('nomeCompleto')?.patchValue(res.nomeCompleto)
        this.acessoDefinido = res.tipo
        this.isEdit = true
        this.getFazerLogin(res.id)
      }
    })
  }

  getFazerLogin(id: number): void {
    this.loginServ.getId(id).subscribe({
      next: res => {
        this.senha = res.senha
      }
    })
  }

  editarUsuario(): void {
    let usuario: Usuarios = {
      id: this.dados.id,
      username: this.formUsuario.value.username,
      nomeCompleto: this.formUsuario.value.nomeCompleto,
      tipo: this.acessoDefinido ,
    }
    if (this.formUsuario.status === 'VALID' && this.acessoDefinido.length > 0) {
      this.usuarioServ.editar(usuario).subscribe({
        next: (res) => {
          let objFazerLogin: FazerLogin = {
            id: res.id,
            username: res.username,
            idUsuario: res.id,
            senha: this.senha
          }
          this.loginServ.editar(objFazerLogin).subscribe({
            next: (resLogin) => {
              this.mensagemUsuario = true
              this.userNotFoundOrSucess = [
                {
                  nome: 'Item editado com sucesso!',
                  tipo: 'sucess'
                }
              ]
            }
          })
          this.formUsuario.get('username')?.patchValue('')
          this.formUsuario.get('nomeCompleto')?.patchValue('')
          setTimeout(() => {
            this.mensagemUsuario = false
            this.router.navigate(['/cms/tabela/usuario'])
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
