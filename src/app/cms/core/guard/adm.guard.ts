import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdmGuard implements CanActivateChild {
  constructor(
    public router: Router,
    public authService: UsuariosService
  ) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/cms/login']);
      return false
    }
    return true;
  }
}
