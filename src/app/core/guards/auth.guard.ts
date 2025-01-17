import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();
    console.log('¿Usuario autenticado?', isAuth);

    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
