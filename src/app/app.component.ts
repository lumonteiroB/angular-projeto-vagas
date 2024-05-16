import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projeto-vagas';

  mudarPosition: string = 'rotaUsuario'

  ngOnInit(): void {
    this.fiscalizarRota()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.fiscalizarRota()
      }
    })    
  }

  constructor(
    private router: Router,
  ) { }

  fiscalizarRota() {
    this.mudarPosition = 'rotaUsuario'
    if( this.router.url.includes('/tabela') ||  this.router.url.includes('/alterar') ) {
      this.mudarPosition = 'rotaAdm'
    }
  }
}
