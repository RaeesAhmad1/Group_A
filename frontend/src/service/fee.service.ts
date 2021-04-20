import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from './config'

@Injectable({
  providedIn: 'root'
})

export class FeeService {

    constructor(private http:HttpClient, private router: Router) { }

    getAll():Observable<any>{
        return this.http.get(API_URL + '/fees/get-all');
    }

    getcourse(course,year):Observable<any>{
        return this.http.get(API_URL + '/fees/get-filter?course='+course+"&year="+year);
    }

    deletecourse(course,branch,year):Observable<any>{
        return this.http.delete(API_URL + '/fees/delete?course='+course+"&year="+year+"&branch"+branch);
    }

    create(data):Observable<any>{
        return this.http.post(API_URL + '/fees/create',data);
    }
}