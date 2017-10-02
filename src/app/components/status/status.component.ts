import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private auth: AuthService) { }
  timeOut: Date;
  myDate: Date;
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.timeOut = this.getTokenExpirationDate(token);
      this.auth.ensureAuthenticated(token)
        .then((user) => {
          console.log(user.json());
          if (user.json().status === 'success') {
            this.isLoggedIn = true;
            setInterval(()=>{
              if (this.myDate >= this.timeOut) {
                this.gotoLogin();
              } else {
                this.myDate = new Date();
              }
            }, 1000);
            console.log(this.timeOut);
          }})
        .catch((err) => {
          console.log(err);
        });
    }
  }
  gotoLogin(): void {
    this.router.navigateByUrl('/login');
  }
  gotoRegister(): void {
    this.router.navigateByUrl('/register');
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }
  public decodeToken(token: string): any {
    let parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }
  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }
  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), (c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
  private b64decode(str: string): string {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output: string = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }

    for (
      // initialize result and counters
      let bc: number = 0, bs: any, buffer: any, idx: number = 0;
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }
}
