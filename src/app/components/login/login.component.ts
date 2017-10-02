import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MdSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  constructor(
    private router: Router,
    private auth: AuthService,
    public snackBar: MdSnackBar
  ) {}
  onLogin(): void {
    this.auth.login(this.user)
      .then((user) => {
        this.snackBar.open(user.json().message, user.json().status, {
          duration: 2000,
        });
        console.log(user.json());
        localStorage.setItem('token', user.json().auth_token);
        this.gotoStatus();
      })
      .catch((err) => {
        if (err.status === 422) {
          this.snackBar.open(err.json().message, err.json().status, {
            duration: 2000,
          });
          console.log(err.json().status + ': ' + err.json().message);
        } else if (err.status === 404) {
          this.snackBar.open(err.json().message, err.json().status, {
            duration: 2000,
          });
          console.log(err.json().status + ': ' + err.json().message);
        } else {
          this.snackBar.open(err, err.json().status, {
            duration: 2000,
          });
          console.log(err.json().status + ': ' + err.json().message);
        }
      });
  }
  gotoRegister(): void {
    this.router.navigateByUrl('/register');
  }
  gotoStatus(): void {
    this.router.navigateByUrl('/status');
  }
}
