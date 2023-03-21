import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { IUser } from '../components/dashboard/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  signup(userData: any) {
    return this.http
      .post(`${this.url}/auth/signup`, userData)
      .pipe(tap((userInfo) => console.log(userInfo)));
  }

  login(userData: any) {
    return this.http
      .post(`${this.url}/auth/login`, userData)
      .pipe(tap((userInfo) => console.log(userInfo)));
  }

  getSuggestedMatches() {
    return this.http
      .get(`${this.url}/search/suggested-matches`)
      .pipe(tap((response) => console.log(response)));
  }

  likeUser(userData: IUser) {
    return this.http
      .post(`${this.url}/search/like-user`, userData)
      .pipe(tap((response) => console.log(response)));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
  }

  setUserInfo(userInfo: any) {
    console.log(userInfo);
    localStorage.setItem('userId', userInfo.user._id);
    localStorage.setItem('token', userInfo.token);
    localStorage.setItem('name', userInfo.user.name);
  }

  getName() {
    return (localStorage.getItem('name') || '') as string;
  }

  isLoggedIn() {
    return Boolean(localStorage.getItem('token'));
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
