import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from './config'

@Injectable({
  providedIn: 'root'
})

export class NoticeService {

    constructor(private http:HttpClient, private router: Router) { }

    getNotices():Observable<any>{
        return this.http.get(API_URL + '/notice/get-notices')
    }

    addNotices(data):Observable<any>{
        return this.http.post(API_URL + '/notice/add-notice',data);
    }

    getImage(id):Observable<any>{
        return this.http.get(API_URL + '/notice/get-pdf?id='+id,{ responseType : 'blob'});
    }
}