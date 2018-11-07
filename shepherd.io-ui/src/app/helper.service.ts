import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sheep } from './sheep';
import { AppStatus } from './app-status';
import { User } from './user';

@Injectable()
export class HelperService {

  public static readonly TOKEN_KEY = 'shepherd.token';
  private _appStatus: AppStatus = { appName: '', appVersion: '' };

  constructor(private _http: HttpClient) {
    this._http.get<AppStatus>('/api/appstatus').subscribe(
      data => this._appStatus = data
    );
  }

  get appStatus() {
    return this._appStatus;
  }

  get currentYear() {
    return new Date().getFullYear();
  }

  get currentUser(): User {
    const token = localStorage.getItem(HelperService.TOKEN_KEY);
    if (token && token !== null) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return {
        email: payload.email,
        name: payload.name,
        isAdmin: payload.isAdmin,
        exp: new Date(payload.exp)
      };
    }
  }

  get isLoggedIn(): boolean {
    const user = this.currentUser;
    if (!user) {
      return false;
    }
    return user.exp >= new Date();
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post<any>('/api/login', {
      email: username,
      password: password
    });
  }

  cleanToken() {
    localStorage.removeItem(HelperService.TOKEN_KEY);
  }

  getCountries() {
    return this._http.get('/api/countries');
  }

  getDocuments() {
    return this._http.get<Array<any>>('/api/documents');
  }

  getDocument(doc: string, sheep: Sheep) {
    return this._http.get(`/api/documents/${doc}/${sheep._id}`, { responseType: 'blob' });
  }
}
