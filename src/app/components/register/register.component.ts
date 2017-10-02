import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  constructor(private router: Router, private auth: AuthService) { }

  onRegister(): void {
    this.auth.register(this.user)
      .then((user) => {
        console.log(user.json());
        this.gotoLogin();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  gotoLogin(): void {
    this.router.navigateByUrl('/login');
  }
  gotoStatus(): void {
    this.router.navigateByUrl('/status');
  }

}
