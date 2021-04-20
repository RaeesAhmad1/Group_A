import { Component, OnInit } from '@angular/core';
import { ManageStudentsComponent,StudentDialogModel } from '../manage-students/manage-students.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../service/student.service'
import { PageEvent } from '@angular/material/paginator';

export interface StudentList {
  _id:string;
  name:string;
  course:string;
  branch:string;
  year:string;
  std_no:number;
}


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private dialog: MatDialog, private apiService: StudentService) { }

  displayedColumns: string[] = ['name', 'course', 'branch', 'year', 'std_no', 'actions'];
  results:StudentList[];
  total;
  privilege=['-','Administrator','Faculty']
  years=['','First','Second','Third','Fourth','Fifth'];
  isLoading=false;
  tableData:StudentList[];

  ngOnInit(): void {
    this.isLoading=true;
    this.apiService.getAllStudents().subscribe(
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
    const user_id = new StudentDialogModel(id);
    this.dialog.open(ManageStudentsComponent,{
      width: "900px",
      height:"576px",
      data: user_id
    })
  }

}
