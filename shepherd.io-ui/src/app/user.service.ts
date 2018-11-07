import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  updateUser(user: User) {
    return this._http.put<User>('/api/users', user);
  }
}
