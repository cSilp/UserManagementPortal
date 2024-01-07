import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchUserResponse } from './user-table.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersApi = 'https://dummyjson.com/users';

  constructor(private httpClient: HttpClient) {}

  public getUsers() {
    return this.httpClient.get<FetchUserResponse>(this.usersApi);
  }
}
