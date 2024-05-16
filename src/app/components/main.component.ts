import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {


  espacoPag: string = 'rotaUsuario'
  
  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {    
    this.fiscalizarRota()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.fiscalizarRota()
      }
    })   
  }

  fiscalizarRota() {
    this.espacoPag = 'rotaUsuario'
    if( this.router.url.includes('/login') || this.router.url.includes('/sign-up') ) {
      this.espacoPag = 'rotaLogin'
    }
    if( this.router.url.includes('/home')) {
      this.espacoPag = 'rotaHome'
    }
  }
}
