import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.css']
})
export class ManageSubjectsComponent implements OnInit {

  id:any;
  name:any;
  isvalues=false;

  constructor(private fb:FormBuilder, private apiService: CourseService,public dialogRef2: MatDialogRef<ManageSubjectsComponent>,@Inject(MAT_DIALOG_DATA) public data: ManageSubjectDialogModel) {
    this.id=data.user_id;
    this.name=data.user_name;
   }

  types=["Core","Optional"];
  branches=[];
  subjects=[];

  createSubject = this.fb.group({
    subject_name:[''],
    subject_code:[''],
    subject_type:[''],
    theory_marks:[''],
    practical_marks:[''],
    subject_branch:[''],
    subject_semester:[]
  })

  ngOnInit(): void {
    this.isvalues=false;
    this.apiService.getallbranches(this.name).subscribe(
      (res)=>{
        this.branches=res;
        this.isvalues=true;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )

    this.apiService.getallsubjects(this.id).subscribe(
      (res)=>{
        this.subjects=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }

  create(f){
    this.apiService.addSubjects(this.createSubject.value,this.id).subscribe(
      (res)=>{
        window.alert('Subject Added');
        this.createSubject.reset();
        f.resetForm();
        this.ngOnInit();
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }

  deleteSubject(code){
    this.apiService.deleteSubjects(this.id,code).subscribe(
      (res)=>{
        window.alert('Subject Deleted');
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }

}

export class ManageSubjectDialogModel {

  constructor(public user_id: string,public user_name:String) {
  }
}