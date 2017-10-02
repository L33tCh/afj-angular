import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  isLoggedIn: boolean = false;
  canActivate(): boolean {
    let token = localStorage.getItem('token');

    this.auth.ensureAuthenticated(token)
      .then((user) => {
        console.log(user.json());
        if (user.json().status === 'success') {
          this.isLoggedIn = true;
        }})
      .catch((err) => {
        console.log(err);
      });

    if (this.isLoggedIn) {
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
