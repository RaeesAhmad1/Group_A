import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ViewSubjectsComponent , SubjectDialogModel } from '../view-subjects/view-subjects.component';
import { ManageSubjectsComponent , ManageSubjectDialogModel } from '../manage-subjects/manage-subjects.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';


export interface CourseList {
  _id:string;
  name:string;
  code:string;
  duration:number;
  semesters:number;
}
@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  constructor(private dialog: MatDialog,private apiService:CourseService) { }

  courses:CourseList[];
  admin:boolean;
  total=0;
  tableData:CourseList[];
  displayedColumns: string[] = ['name', 'code', 'duration', 'semester', 'actions'];
  isLoading=false;

  ngOnInit(): void {
    this.isLoading=true;
    this.admin=false;
    this.apiService.getallcourses().subscribe(
      (res)=>{
        this.courses=res;
        if(localStorage.getItem('priv') == '1'){
          this.admin=true
        }
        else{
          this.admin=false;
        }
        this.total=this.courses.length;
        if(this.total>=10){
          this.tableData= this.courses.slice(0,10);
        }
        else{
          this.tableData= this.courses.slice(0,this.total);
          
        }
        this.isLoading=false;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error Loading Courses!')
        }
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
    this.tableData = this.courses.slice(StartIndex, endIndex);
  }

  viewSubjects(id){
    const course_id = new SubjectDialogModel(id);
    this.dialog.open(ViewSubjectsComponent,{
      width: "856px",
      height:"476px",
      data: course_id
    })
  }

  manageSubjects(id,name){
    const course_id = new ManageSubjectDialogModel(id,name);
    this.dialog.open(ManageSubjectsComponent,{
      width: "700px",
      height:"496px",
      data: course_id
    })
  }

}
