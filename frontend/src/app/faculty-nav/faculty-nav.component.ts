import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {UserService } from '../../service/user.service'

@Component({
  selector: 'app-faculty-nav',
  templateUrl: './faculty-nav.component.html',
  styleUrls: ['./faculty-nav.component.css']
})
export class FacultyNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private apiService: UserService) {}

  logout(){
    this.apiService.logoutUser();
  }

}
