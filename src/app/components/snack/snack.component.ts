import {Component} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';

/**
 * @title Basic snack-bar
 */
@Component({
  selector: 'app-snack-bar-overview-example',
  templateUrl: 'snack.component.html',
})
export class SnackBarOverviewExampleComponent {
  constructor(public snackBar: MdSnackBar, public router: Router) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  gotoLogin(): void {
    this.router.navigateByUrl('/login');
  }
  gotoRegister(): void {
    this.router.navigateByUrl('/register');
  }
  gotoStatus(): void {
    this.router.navigateByUrl('/status');
  }
}
