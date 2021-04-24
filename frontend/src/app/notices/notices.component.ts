import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CourseService} from '../../service/course.service';
import { NoticeService } from '../../service/notice.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  constructor(private fb: FormBuilder, private cServ: CourseService, private apiService: NoticeService, private _bottomSheet: MatBottomSheet) { }

  results=[];
  isLoading=false;
  total;
  page:number=1;
  selectedfile:File = null;
  years=[
    {"value":1,"viewValue":"First"},
    {"value":2,"viewValue":"Second"},
    {"value":3,"viewValue":"Third"},
    {"value":4,"viewValue":"Fourth"}
  ]
  departments = [
    { value: "Applied Science", viewValue: "Applied Science" },
    { value: "CSE", viewValue: "Computer Science" },
    { value: "IT", viewValue: "Information Technology" },
    { value: "ECE", viewValue: "Electronics And Communication" },
    { value: "EN", viewValue: "Electrical And Electronics" },
    { value: "ME", viewValue: "Mechanical" },
    { value: "CE", viewValue: "Civil" },
    { value: "MCA", viewValue: "MCA" },
  ];

  uploadForm = this.fb.group({
    heading:[''],
    description:[''],
    department: [''],
    year:[''],
    docLink:['']
  })

  onFile(event) {
    if(event.target.files.length>0)
      this.selectedfile = <File>event.target.files[0];
  }

  ngOnInit(): void {
    this.isLoading=true;
    this.apiService.getNotices().subscribe(
      (res)=>{
        for(let i=0;i<res.length;i++){
          res[i].createdAt= res[i].createdAt.slice(0,10);
        }
        this.results=res;
        console.log(this.results)
        this.isLoading=false;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
          this.isLoading=false;
        }
      }
    )
  }

  submit(f){
    this.isLoading=true;
    const fd = new FormData();
    fd.append('heading',this.uploadForm.value.heading);
    fd.append('description',this.uploadForm.value.description);
    fd.append('year',this.uploadForm.value.year);
    fd.append('department',this.uploadForm.value.department);
    fd.append('docLink',this.selectedfile, this.selectedfile.name);
    this.apiService.addNotices(fd).subscribe(
      (res)=>{
        window.alert('Time Table Added!');
        this.isLoading=false;
        this.uploadForm.reset();
        f.resetForm();
      },(err)=>{
        if(err.status!=200){
          window.alert('Error');
          this.isLoading=false;
        }
      }
    )
  }

  pdf:any;
  
  createImageFromBlob(docLink: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.pdf = reader.result;
    }, false);
  
    if (docLink) {
       reader.readAsDataURL(docLink);
    }
  }

  viewNotice(id): void {
    this.apiService.getImage(id).subscribe(
      (res)=>{
        this.createImageFromBlob(res);
      }
    )
  }

}

