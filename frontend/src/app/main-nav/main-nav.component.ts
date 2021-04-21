import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../../service/user.service'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private apiService: UserService) {}

  isDisplay = true;
  isDisplay1 = true;
  isDisplay2 = true;
  isDisplay3 = true;

  display() {
    this.isDisplay = !this.isDisplay;
    if (this.isDisplay1 == false) this.isDisplay1 = !this.isDisplay1;
    if (this.isDisplay2 == false) this.isDisplay2 = !this.isDisplay2;
    if (this.isDisplay3 == false) this.isDisplay3 = !this.isDisplay3;
  }

  display1() {
    this.isDisplay1 = !this.isDisplay1;
    if (this.isDisplay2 == false) this.isDisplay2 = !this.isDisplay2;
    if (this.isDisplay == false) this.isDisplay = !this.isDisplay;
    if (this.isDisplay3 == false) this.isDisplay3 = !this.isDisplay3;
  }

  display2() {
    this.isDisplay2 = !this.isDisplay2;
    if (this.isDisplay1 == false) this.isDisplay1 = !this.isDisplay1;
    if (this.isDisplay == false) this.isDisplay = !this.isDisplay;
    if (this.isDisplay3 == false) this.isDisplay3 = !this.isDisplay3;
  }

  display3() {
    this.isDisplay3 = !this.isDisplay3;
    if (this.isDisplay1 == false) this.isDisplay1 = !this.isDisplay1;
    if (this.isDisplay == false) this.isDisplay = !this.isDisplay;
    if (this.isDisplay2 == false) this.isDisplay2 = !this.isDisplay2;
  }

  logout(){
    this.apiService.logoutUser();
  }
}
