import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CourseService} from '../../service/course.service';
import { TimeTableService } from '../../service/timeTable.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  constructor(private fb: FormBuilder, private cServ: CourseService, private apiService: TimeTableService, private _bottomSheet: MatBottomSheet) { }

  viewForm = this.fb.group({
    course:[''],
    branch:[''],
    year: [''],
  })

  uploadForm = this.fb.group({
    course:[''],
    branch:[''],
    year: [''],
    section:[''],
    image:['']
  })

  years=[
    {"value":1,"viewValue":"First"},
    {"value":2,"viewValue":"Second"},
    {"value":3,"viewValue":"Third"},
    {"value":4,"viewValue":"Fourth"}
  ]

  courses=[];
  branches=[];
  selectedfile:File = null;
  results=[];
  isLoading=false;
  total;
  page:number=1;

  onFile(event) {
    if(event.target.files.length>0)
      this.selectedfile = <File>event.target.files[0];
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.apiService.getTables(this.viewForm.value.course,this.viewForm.value.branch,this.viewForm.value.year).subscribe(
      (res)=>{
        this.results=res;
        this.isLoading=false;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
          this.isLoading=false;
        }
      }
    )

    this.cServ.getcourses().subscribe(
      (res)=>{
        this.courses=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        }
      }
    )
  }

  getBranches(){
    this.cServ.getallbranches(this.viewForm.value.course).subscribe(
      (res)=>{
        this.branches=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        }
      }
    )
  }

  getBranches2(){
    this.cServ.getallbranches(this.uploadForm.value.course).subscribe(
      (res)=>{
        this.branches=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        }
      }
    )
  }


  submit(f){
    this.isLoading=true;
    const fd = new FormData();
    fd.append('course',this.uploadForm.value.course);
    fd.append('branch',this.uploadForm.value.branch);
    fd.append('year',this.uploadForm.value.year);
    fd.append('section',this.uploadForm.value.section);
    fd.append('image',this.selectedfile, this.selectedfile.name);
    this.apiService.addTables(fd).subscribe(
      (res)=>{
        window.alert('Time Table Added!')
        this.isLoading=false;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
          this.isLoading=false;
        }
      }
    )
  }


  search(f){
    this.isLoading=true;
    this.apiService.getTables(this.viewForm.value.course,this.viewForm.value.branch,this.viewForm.value.year).subscribe(
      (res)=>{
        if(res.length>0){
          this.results=res;
          this.isLoading=false;
        }
        else{
          window.alert('No Data Found!');
          this.ngOnInit();
        }
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
          this.isLoading=false;
        }
      }
    )
  }

  openBottomSheet(id): void {
    this._bottomSheet.open(BottomSheet,{
      data: {_id: id}
    });
  }

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: './bottomsheet.html',
})
export class BottomSheet implements OnInit{
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheet>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private apiService : TimeTableService) {}

  img:any;
  
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.img = reader.result;
    }, false);
  
    if (image) {
       reader.readAsDataURL(image);
    }
  }


  ngOnInit(){
    this.apiService.getImage(this.data._id).subscribe(
      (res)=>{
        this.createImageFromBlob(res);
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
        }
      }
    )
  }


}