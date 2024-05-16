import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogado: string = ''

  mudarPosition: string = 'rotaUsuario'

  ngOnInit(): void {
    this.nomeUser()
    this.fiscalizarRota()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.nomeUser()
        this.fiscalizarRota()
      }
    })    
  }

  constructor(
    public router: Router,
    private userServ: UsuariosService
  ) { }

  nomeUser() {
    let user = JSON.parse(localStorage.getItem('acessUser') as string)
    if (user) {
      if (user.nomeCompleto.length > 0) {
        this.userLogado = user.nomeCompleto
      }
    }
  }

  fiscalizarRota() {
    this.mudarPosition = 'rotaUsuario'
    if( this.router.url.includes('/tabela') || this.router.url.includes('/alterar')  ) {
      this.mudarPosition = 'rotaAdm'
    }
  }

  public mudarRota() {
    if(this.router.url.includes('/cms')) {
      this.router.navigate(['/cms/login']),
      this.logout()
    }else {
      this.router.navigate(['/login'])
      this.logout()
    }
  }

  public logout() {
    this.userServ.logout()
    this.userLogado = ''
  }
}
