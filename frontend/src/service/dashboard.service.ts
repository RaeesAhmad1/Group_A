import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from './config'

@Injectable({
  providedIn: 'root'
})

export class DashService {

    constructor(private http:HttpClient, private router: Router) { }

    getNotices():Observable<any>{
        return this.http.get(API_URL + '/notice/get-notices')
    }

    getCourse():Observable<any>{
        return this.http.get(API_URL + '/courses/get-count-all')
    }

    gettimeTable():Observable<any>{
        return this.http.get(API_URL + '/time-table/get-count')
    }

    getStudents():Observable<any>{
        return this.http.get(API_URL + '/students/get-count')
    }

    getUsers():Observable<any>{
        return this.http.get(API_URL + '/user/get-count')
    }
}
