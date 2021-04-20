import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FeeService } from '../../service/fee.service';
import { CourseService } from '../../service/course.service'

@Component({
  selector: 'app-manage-fee',
  templateUrl: './manage-fee.component.html',
  styleUrls: ['./manage-fee.component.css']
})
export class ManageFeeComponent implements OnInit {

  constructor(private fb:FormBuilder, private apiService: FeeService, private courseService:CourseService) { }

  queryForm = this.fb.group({
    course:[''],
    branch:[''],
    year:['']
  })

  feeForm = this.fb.group({
    course:[''],
    branch:[''],
    year:[''],
    tutionfee:[''],
    bookfees:[''],
    hostelfee:[''],
    otherfee:['']
  })

  years=[
    {"value":1,"viewValue":"First"},
    {"value":2,"viewValue":"Second"},
    {"value":3,"viewValue":"Third"},
    {"value":4,"viewValue":"Fourth"}
  ]

  courses=[];
  iscourses=false;

  branches = [];

  ngOnInit(): void {
    this.iscourses=false
    this.courseService.getcourses().subscribe(
      (res)=>{
        this.courses=res;
        this.iscourses=true;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    );
  }

  delete(){
    this.apiService.deletecourse(this.queryForm.value.course,this.queryForm.value.branch,this.queryForm.value.year).subscribe(
      (res)=>{
        window.alert(res);
      },(err)=>{
        if(err.status==200){
          window.alert('Deletion Successfull');
        }
        else{
        window.alert(err);
        }
      }
    )
  }

  delete_all(){
    this.queryForm.value.course='';
    this.queryForm.value.branch='';
    this.queryForm.value.year='';
    this.apiService.deletecourse(this.queryForm.value.course,this.queryForm.value.branch,this.queryForm.value.year).subscribe(
      (res)=>{
        window.alert('Deletion Successfull');
      },(err)=>{
        if(err.status==200){
          window.alert('Deletion Successfull');
        }
        else{
        window.alert(err);
        }
      }
    )
  }

  submit(f){
    console.log(this.feeForm.value)
    this.apiService.create(this.feeForm.value).subscribe(
      (res)=>{
        this.feeForm.reset();
        f.resetForm();
        window.alert('Fee Structure Updated!')
      },(err)=>{
        if(err.status=200){
          window.alert('Fee Structure Updated!');
        }
        else{
          window.alert('Error Updating');
        }
      }
    )

  }

  branchform(){
    this.branches=[];
    this.courseService.getallbranches(this.feeForm.value.course).subscribe(
      (res)=>{
        this.branches=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('error')
        }
      }
    )
  }

  branchform2(){
    this.branches=[];
    this.courseService.getallbranches(this.queryForm.value.course).subscribe(
      (res)=>{
        this.branches=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('error')
        }
      }
    )
  }

}
