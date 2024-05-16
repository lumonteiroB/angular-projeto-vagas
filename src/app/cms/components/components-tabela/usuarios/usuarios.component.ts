import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FazerLoginService } from 'src/app/core/services/fazer-login.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  linhaUser: string[][] = []
  arrIds: number[] = []

  modalVisualizar: boolean = false

  linhaVisualizar: string[] = []

  constructor(
    private usuariosServ: UsuariosService,
    private loginServ: FazerLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDadosLogin()
  }

  getDadosLogin(): void {
    this.usuariosServ.getAll().subscribe({
      next: (resp) => {
        this.linhaUser = []
        this.arrIds = []
        for (let login of resp) {
          let linhaArr: string[] = []
          linhaArr.push(login.nomeCompleto)
          linhaArr.push(login.username)
          linhaArr.push(login.tipo)
          this.linhaUser.push(linhaArr)
          this.arrIds.push(login.id)
        }
      }
    })
  }

  deletarItem(event: number) {
    this.usuariosServ.delete(event).subscribe((data) => {
      this.loginServ.deleteId(event).subscribe((data) => {
        this.getDadosLogin();
      })
    })
  }

  visualizarItem(event: number) {
    this.linhaVisualizar = []
    this.usuariosServ.getId(event).subscribe({
      next: res => {
        this.linhaVisualizar.push(String(res.id))
        this.linhaVisualizar.push(String(res.nomeCompleto))
        this.linhaVisualizar.push(res.username)
        this.linhaVisualizar.push(res.tipo)
        this.abrirModalVisualizar()
      }
    })
  }

  closeModalVisualizar(event: string) {
    if(event === 'close') {
      this.modalVisualizar = false
    } 
  }

  abrirModalVisualizar(){
    this.modalVisualizar = true
  }

  editarItem(event: number) {
    localStorage.removeItem('idDoItem')
    
    if(event) {
      this.router.navigate(['/cms/tabela/alterar/editar/usuario'])
      localStorage.setItem('idDoItem', JSON.stringify(event))
    }
  }
}
