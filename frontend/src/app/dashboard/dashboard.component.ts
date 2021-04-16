import { Component , OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


  constructor(private breakpointObserver: BreakpointObserver, private apiService: DashService) {}

  notices:any;
  results:any;
  admin:Boolean;
  isLoading_0=false;
  isLoading_1=false;
  isLoading_2=false;
  isLoading_3=false;
  isLoading_4=false;
  isLoading_5=false;


  ngOnInit(){
    this.isLoading_0=true;
    this.isLoading_1=true;
    this.isLoading_2=true;
    this.isLoading_3=true;
    this.isLoading_4=true;
    this.isLoading_5=true;
    this.apiService.getNotices().subscribe(
      (res)=>{
        this.notices=res;
        this.isLoading_5=false;
      },(err)=>{
        if(err.status!=200){
            window.alert('Error');
          
        }
      }
    )


    this.apiService.getCourse().subscribe(
      (res)=>{
        this.results=res;
        if(localStorage.getItem('priv') == '1'){
          this.admin=true
        }
        else{
          this.admin=false;
        }
        this.isLoading_1=false;

      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        this.isLoading_1=false;

        }
      }
    )

    this.apiService.getStudents().subscribe(
      (res)=>{
        this.results.students=res;
        this.isLoading_3=false;

      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        this.isLoading_3=false;

        }
      }
    )

    this.apiService.gettimeTable().subscribe(
      (res)=>{
        this.results.timeTable=res;
        this.isLoading_4=false;

      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        this.isLoading_4=false;

        }
      }
    )

    this.apiService.getUsers().subscribe(
      (res)=>{
        this.results.user=res;
        this.isLoading_2=false;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        }
        this.isLoading_2=false;
      }
    )
  }


}
