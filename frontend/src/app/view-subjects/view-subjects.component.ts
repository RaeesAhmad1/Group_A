import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { PageEvent } from '@angular/material/paginator';


export interface SubjectList {
  subject_name:string;
  subject_code:string;
  subject_type:string;
  subject_branch:string;
  subject_semester:number;
  theory_marks:number;
  practical_marks:number;
}

@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.css']
})
export class ViewSubjectsComponent implements OnInit {

  id:any;
  subjects:SubjectList[];
  page:number=1;
  total:number;
  tableData:SubjectList[];
  displayedColumns: string[] = ['name', 'code', 'type','branch', 'semester','th_mrks','pr_mrks' ];
  isLoading=false;

  constructor( private apiService: CourseService,public dialogRef2: MatDialogRef<ViewSubjectsComponent>,@Inject(MAT_DIALOG_DATA) public data: SubjectDialogModel) 
  {this.id=data.user_id; }

  ngOnInit(): void {
    this.isLoading=true;
    this.apiService.getallsubjects(this.id).subscribe(
      (res)=>{
        this.subjects=res;
        this.total=this.subjects.length;
        if(this.total>=10){
          this.tableData= this.subjects.slice(0,10);
        }
        else{
          this.tableData= this.subjects.slice(0,this.total);
          
        }
        this.isLoading=false;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error Loading Subjects!')
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
    this.tableData = this.subjects.slice(StartIndex, endIndex);
  }

}

export class SubjectDialogModel {

  constructor(public user_id: string) {
  }
}