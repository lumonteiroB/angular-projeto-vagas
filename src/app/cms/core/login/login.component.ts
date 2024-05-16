import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { FazerLogin } from 'src/app/core/models/fazer-login';
import { ModalUtility } from 'src/app/core/models/modal-utility';
import { FazerLoginService } from 'src/app/core/services/fazer-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public messageError: boolean = false

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
          if (res.length > 0) {
            this.pegarUsuario(res[0].idUsuario)
            this.messageError = false

          } else {
            this.messageError = true
            this.logado = false
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
        if (resUser.tipo === 'admin') {
          localStorage.removeItem('acessUser');
          localStorage.setItem('acessUser', JSON.stringify(resUser))
          this.logado = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Login feito com sucesso',
              tipo: 'sucess'
            },
            {
              nome: 'Direcionando para o cms...',
              tipo: 'texto'
            }
          ]
          setTimeout(() => {
            this.router.navigate(['/cms'])
          }, 1800)
        } else {
          this.messageError = true
          this.userNotFoundOrSucess = [
            {
              nome: 'Sistema de acesso restrito ⚠️',
              tipo: 'alert'
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

  closeModal(evento: string) {
    if (evento) {
      this.messageError = false
      this.logado = false
    }
  }

  loginOk(evento: string) {
    if (evento) {
      this.router.navigate(['/cms/tabela/empresa']);
    }
  }

}
