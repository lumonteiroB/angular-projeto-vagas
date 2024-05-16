import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FazerLogin } from 'src/app/core/models/fazer-login';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { Usuarios } from 'src/app/core/models/usuarios';
import { FazerLoginService } from 'src/app/core/services/fazer-login.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  formAuth: FormGroup;


  public userNotFoundOrSucess: ModalUtility[] = []

  public mensagemUsuario: boolean = false

  ngOnInit(): void {
  }

  constructor(
    private userServ: UsuariosService,
    private loginServ: FazerLoginService,
    private router: Router
  ) {
    this.formAuth = new FormGroup({
      user: new FormControl('', [Validators.required]),
      nomeComp: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      confirmSenha: new FormControl('', [Validators.required])
    }, this.validatePassword)
  }

  validatePassword(form: AbstractControl): {[ct: string]: boolean } | null {
    const pw = form.get('senha') as FormControl
    const cpw = form.get('confirmSenha') as FormControl
    if (pw.value !== cpw.value) {
      return { passwordInvalido: true }
    }
    return null
  }

  autenticacaoUsername(): void {
    let user: string = this.formAuth.value.user
    this.userServ.getUsername(
      user
    ).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.mensagemUsuario = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Usuario já existente',
              tipo: 'texto'
            },
            {
              nome: 'OK',
              tipo: 'button'
            }
          ]
        } else {
          this.postUsuario()
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }


  postUsuario(): void {
    let UserCadastro: Usuarios = {
      id: 0,
      nomeCompleto: this.formAuth.value.nomeComp,
      username: this.formAuth.value.user,
      tipo: 'cliente'
    }
    this.userServ.postUser(
      UserCadastro
    ).subscribe({
      next: (res) => {
        this.postFazerLogin(res.id)
      }
    })

  }

  postFazerLogin(idUsuario: number) {
    let userLogin: FazerLogin = {
      username: this.formAuth.value.user,
      senha: this.formAuth.value.confirmSenha,
      id: 0,
      idUsuario: idUsuario
    }
    this.loginServ.postLogin(
      userLogin
    ).subscribe({
      next: (res) => {
        this.mensagemUsuario = true
        this.userNotFoundOrSucess = [
          {
            nome: 'Cadastro feito com sucesso!',
            tipo: 'texto'
          },
          {
            nome: 'Direcionando para tela de login...',
            tipo: 'alert'
          }
        ]
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1800)
      }
    })
  }

  closeModal(evento: string) {
    if (evento) {
      this.mensagemUsuario = false
    }
  }

}
