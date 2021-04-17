import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router: Router) { }

  login(data):Observable<any>{
    return this.http.post(API_URL + '/user/login',data);
  }

  register(data):Observable<any>{
    return this.http.post(API_URL + '/user/register',data);
  }

  getALL():Observable<any>{
    return this.http.get(API_URL + '/user/getall');
  }

  getUser(id):Observable<any>{
    return this.http.get(API_URL + '/user/getuser/'+id);
  }

  delUser(id):Observable<any>{
    return this.http.delete(API_URL + '/user/delete/'+id);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('priv');
    window.location.replace('');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  
}
