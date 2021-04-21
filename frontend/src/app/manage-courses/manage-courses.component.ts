import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '../../service/course.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Branch {
  branch_name: string;
}


@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {

  constructor(private fb:FormBuilder, private apiService: CourseService) { }

  courseForm = this.fb.group({
    course:[''],
  })

  courseForm2 = this.fb.group({
    course:[''],
  })

  createCourse = this.fb.group({
    name:[''],
    code:[''],
    duration:[''],
    semesters:['']
  })

  updateCourse = this.fb.group({
    name:[''],
    code:[''],
    duration:[''],
    semesters:['']
  })

  courses=[];
  branches=[];
  iscourses=false;
  isupdate=false;
  isbranch=false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  new_branches: Branch[]=[]


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our branch
    if ((value || '').trim()) {
      this.new_branches.push({branch_name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

    remove(fruit: Branch): void {
    const index = this.new_branches.indexOf(fruit);

    if (index >= 0) {
      this.new_branches.splice(index, 1);
    }
  }


  addBranches(){
    this.apiService.addBranch(this.new_branches,this.courseForm2.value.course).subscribe(
      (res)=>{
        window.alert('Branches Added');
        this.new_branches=[];
        this.branchform();
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
    
  }

  ngOnInit(): void {
    this.iscourses=false;
    this.isupdate=false;
    this.isbranch=false;
    this.apiService.getcourses().subscribe(
      (res)=>{
        this.courses=res;
        this.iscourses=true;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }

  create(f){
    this.apiService.createCourse(this.createCourse.value).subscribe(
      (res)=>{
        window.alert('Course Added');
        this.createCourse.reset();
        f.resetForm();
        this.ngOnInit();
      },(err)=>{
        if(err.status!=200){
          window.alert('Error!');
        }
      }
    )
  }

  update(f){
    this.apiService.updatecourse(this.courseForm.value.course,this.updateCourse.value).subscribe(
      (res)=>{
        window.alert('Course Updated');
        this.updateform();
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
        else{
          window.alert('Course Updated');
        }
      
      }
    )
  }

  
  delete(f){
    this.apiService.deleteCourse(this.courseForm.value.course).subscribe(
      (res)=>{
        window.alert('Course Deleted');
        this.ngOnInit();
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
        else{
          window.alert('Course Deleted');
          this.ngOnInit()}
      }
    )
  }

  updateform(){    
    this.apiService.findCourse(this.courseForm.value.course).subscribe(
      (res)=>{
        this.updateCourse.patchValue(res);
        this.isupdate=true;
      },(err)=>{
        if(err.status!=200){
          window.alert('error')
        }
      }
    )
  }

  branchform(){
    this.isbranch=true;
    this.apiService.getallbranches(this.courseForm2.value.course).subscribe(
      (res)=>{
        this.branches=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('error')
        }
      }
    )
  }

  deletebranch(name){
    this.apiService.deletebranches(this.courseForm2.value.course,name).subscribe(
      (res)=>{
        window.alert('Delete Success');
        this.branchform();
      },(err)=>{
        if(err.status!=200){
          window.alert('error')
        }
      }
    )
  }

}
