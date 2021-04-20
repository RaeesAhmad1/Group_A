import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from './config'
@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private http: HttpClient, private router: Router) { }

  //course
  getallcourses(): Observable<any> {
    return this.http.get(API_URL + '/courses/get-all');
  }

  getcourses(): Observable<any> {
    return this.http.get(API_URL + '/courses/get-courses');
  }

  createCourse(data): Observable<any> {
    return this.http.post(API_URL + '/courses/create', data);
  }

  deleteCourse(name): Observable<any> {
    return this.http.delete(API_URL + '/courses/delete-course/' + name)
  }

  findCourse(name): Observable<any> {
    return this.http.get(API_URL + '/courses/find-course/' + name);
  }

  getcourseyear(name): Observable<any> {
    return this.http.get(API_URL + '/courses/get-years?name=' + name);
  }

  updatecourse(name, data): Observable<any> {
    return this.http.post(API_URL + '/courses/update-course/' + name, data);
  }
  //Branches

  getallbranches(name): Observable<any> {
    return this.http.get(API_URL + '/courses/get-branches/' + name);
  }

  deletebranches(name, b_name): Observable<any> {
    return this.http.delete(API_URL + '/courses/del-branch/' + name + '&' + b_name);
  }

  addBranch(data, name): Observable<any> {
    return this.http.post(API_URL + '/courses/add-branches/' + name, data);
  }

  //Sybjects

  addSubjects(data, id): Observable<any> {
    return this.http.post(API_URL + '/courses/add-subject/' + id, data);
  }

  getallsubjects(id): Observable<any> {
    return this.http.get(API_URL + '/courses/get-subjects/' + id);
  }

  deleteSubjects(id, subject_name): Observable<any> {
    return this.http.delete(API_URL + '/courses/del-subject/' + id + '&' + subject_name);
  }

  getCoreSubjects(c_name, b_name, sem): Observable<any> {
    return this.http.get(API_URL + '/courses/get-core-subjects/' + c_name + '&' + b_name + '&' + sem);
  }

  getOptionalSubjects(c_name, b_name, sem): Observable<any> {
    return this.http.get(API_URL + '/courses/get-optional-subjects/' + c_name + '&' + b_name + '&' + sem);
  }
}