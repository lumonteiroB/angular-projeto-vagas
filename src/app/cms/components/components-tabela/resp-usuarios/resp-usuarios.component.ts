import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/core/models/usuarios';
import { Vagas } from 'src/app/core/models/vagas/vagas';
import { RespostaQuestService } from 'src/app/core/services/resposta-quest.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { VagasService } from 'src/app/core/services/vagas.service';

@Component({
  selector: 'app-resp-usuarios',
  templateUrl: './resp-usuarios.component.html',
  styleUrls: ['./resp-usuarios.component.scss']
})
export class RespUsuariosComponent implements OnInit {
  linhaResp: string[][] = []
  arrIds: number[] = []

  vagas: Vagas[] = []
  usuarios: Usuarios[] = []

  modalVisualizar: boolean = false
  linhaVisualizar: string[] = []

  constructor(
    private respServ: RespostaQuestService,
    private vagasServ: VagasService,
    private userServ: UsuariosService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getDadosRespUser(): void {
    this.respServ.getAll().subscribe({
      next: (resp) => {
        this.linhaResp = []
        this.arrIds = []
        for (let respUser of resp) {
          
          let opa = []
          let linhaArr: string[] = []
          linhaArr.push(this.acharVaga(respUser.idDaVaga))
          linhaArr.push(this.acharUsuario(respUser.idUsuario))
          for( let resp of respUser.respostas) {
            for( let j = 0; j < resp.length; j ++) {
              opa.push(resp[j])
            }
          }
          let ops = []
          ops.push(opa.toString())          
          linhaArr.push(ops[0].replaceAll(',', ', '))              
          this.linhaResp.push(linhaArr)
          
          this.arrIds.push(respUser.id)
        }
      }
    })
  }

  getVaga(): void {
    this.vagasServ.getAll('').subscribe({
      next: (resVaga) => {
        this.vagas = resVaga
        this.getDadosRespUser()
      }
    })
  }
  getUsuarios() {
    this.userServ.getAll().subscribe({
      next: (resUser) => {
        this.usuarios = resUser
        this.getVaga()
      }
    })
  }

  acharUsuario(id: number): string {
    let user = this.usuarios.filter((filtro: Usuarios) => filtro.id == id)    
    return user[0].username
  }

  acharVaga(id: number): string {
    let vaga = this.vagas.filter((filtro: Vagas) => filtro.id == id)
    return vaga[0].vaga
  }

  deletarItem(event: number) {
    this.respServ.deleteId(event).subscribe((data) => {
      this.getUsuarios();
    })
  }

  visualizarItem(event: number) {
    this.linhaVisualizar = []
    this.respServ.getId(event).subscribe({
      next: res => {
        this.linhaVisualizar.push(String(res.id))
        this.linhaVisualizar.push(String(res.idDaVaga))
        this.linhaVisualizar.push(String(res.idUsuario))
        for(let respUser of res.respostas) {
          this.linhaVisualizar.push(respUser.toString().replaceAll(',', ', '))
        }
        this.abrirModalVisualizar()
      }
    })
  }

  abrirModalVisualizar(){
    this.modalVisualizar = true
  }

  closeModalVisualizar(event: string) {
    if(event === 'close') {
      this.modalVisualizar = false
    } 
  }

  editarItem(event: number) {
    localStorage.removeItem('idDoItem')
    
    if(event) {
      this.router.navigate(['/cms/tabela/alterar/editar/resposta-usuario'])
      localStorage.setItem('idDoItem', JSON.stringify(event))
    }
  }
}
