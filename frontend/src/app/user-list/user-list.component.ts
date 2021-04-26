import { Component, OnInit } from '@angular/core';
import { ManageUserComponent,UserDialogModel } from '../manage-user/manage-user.component';
import { MatDialog } from '@angular/material/dialog';
import {UserService } from '../../service/user.service';
import { PageEvent } from '@angular/material/paginator';



export interface UserList {
  _id:string;
  name:string;
  email:string;
  privilege:string;
  department:string;
}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private dialog: MatDialog, private apiService: UserService) { }

  displayedColumns: string[] = ['name', 'email', 'privilege', 'department', 'action'];
  results:UserList[];
  tableData:UserList[];
  total;
  isLoading=false;
  page:number=1;
  privilege=['-','Administrator','Faculty']

  ngOnInit(): void {
    this.isLoading=true;
    this.apiService.getALL().subscribe(
      (data)=>{
        this.results=data;
        this.total=data.length;
        if(this.total>=10){
          this.tableData= this.results.slice(0,10);
        }
        else{
          this.tableData= this.results.slice(0,this.total);
          
        }
        this.isLoading=false;
      },(err)=>{
        window.alert(err);
        this.isLoading=false;
      }
    )
  }

  OnpageEvent(event:PageEvent){
    const StartIndex = event.pageIndex * event.pageSize;
    let endIndex = StartIndex + event.pageSize;
    if(endIndex > this.total){
      endIndex = this.total;
    }
    this.tableData = this.results.slice(StartIndex, endIndex);
  }


  openDialog(id){
    const user_id = new UserDialogModel(id);
    this.dialog.open(ManageUserComponent,{
      width: "700px",
      height:"476px",
      data: user_id
    })
  }

}
