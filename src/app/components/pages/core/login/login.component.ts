import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { FazerLogin } from '../../../../core/models/fazer-login';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { Router } from '@angular/router';
import { FazerLoginService } from 'src/app/core/services/fazer-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public messageAccessError: boolean = false

  public logado: boolean = false

  public formAuth: FormGroup = this.formBuilder.group({
    user: ['', [Validators.required]],
    senha: ['', [Validators.required]]
  });

  userNotFoundOrSucess: ModalUtility[] = [
    {
      nome: 'Usuario ou senha incorretos',
      tipo: 'texto'
    },
    {
      nome: 'OK',
      tipo: 'button'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private userServ: UsuariosService,
    private loginServ: FazerLoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  submitForm(): void {
    if (this.formAuth.valid) {
      this.loginServ.getLogin({
        user: this.formAuth.value.user,
        senha: this.formAuth.value.senha
      }).subscribe({
        next: (res: FazerLogin[]) => {
          if (res.length) {
            this.pegarUsuario(res[0].idUsuario)
            this.messageAccessError = false

          } else {
            this.messageAccessError = true
            this.logado = false
            this.timeOutCloseModal()
          }
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

  pegarUsuario(id: number): void {
    this.userServ.getUser(id).subscribe({
      next: (resUser) => {
        if (resUser.tipo === 'cliente') {
          localStorage.removeItem('acessUser');
          localStorage.setItem('acessUser', JSON.stringify(resUser))
          this.logado = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Login feito com sucesso',
              tipo: 'texto'
            },
            {
              nome: 'Direcionando para a navegação...',
              tipo: 'alert'
            }
          ]
          this.timeOutCloseModal()
          setTimeout(() => {
            this.loginOk('ok')
          }, 1800)
        } else {
          this.messageAccessError = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Para acessar login admin clique no link "Acessar sitema de administração"',
              tipo: 'texto'
            },
            {
              nome: 'OK',
              tipo: 'button'
            }
          ]
        }
      }
    })
  }

  timeOutCloseModal() {
    setTimeout(() => {
      this.messageAccessError = false
      this.logado = false
    }, 5000)
  }

  closeModal(evento: string) {
    if (evento) {
      this.messageAccessError = false
      this.logado = false
    }
  }

  loginOk(evento: string) {
    let idDaDetalhes = localStorage.getItem('idVagaDetalhes')
    if (evento) {
      if (idDaDetalhes) {
        this.router.navigate(['detalhes']);
      } else {
        this.router.navigate([''])
      }
    }
  }
}