import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from '../models/user'
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  private BASE_URL: string = environment.BASE_URL;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private url: string;
  constructor(private http: Http) {}
  login(user: User): Promise<any> {
    this.url = `${this.BASE_URL}/login`;
    return this.http.post(this.url, user, {headers: this.headers}).toPromise();
  }
  register(user: User): Promise<any> {
    this.url = `${this.BASE_URL}/register`;
    return this.http.post(this.url, user, {headers: this.headers}).toPromise();
  }
  ensureAuthenticated(token): Promise<any> {
    this.url = `${this.BASE_URL}/status`;
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(this.url, {headers: headers}).toPromise();
  }
}
