import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FeeService } from '../../service/fee.service';
import { CourseService } from '../../service/course.service';
import { FormBuilder } from '@angular/forms';
import * as  jsPDF  from "jspdf";
import 'jspdf-autotable';
@Component({
  selector: 'app-view-fee',
  templateUrl: './view-fee.component.html',
  styleUrls: ['./view-fee.component.css']
})
export class ViewFeeComponent implements OnInit {

  constructor(private apiService: FeeService, private courseService:CourseService, private fb: FormBuilder) { }
  year = [];
  courseFee =[];
  yearfee=[];  
  iscourses=false;
  courses=[];
  totalyear = 0;
  i:any;

  courseForm2 = this.fb.group({
    course:[''],
  })

  selectedCourse :String;

  @ViewChild('content') content: ElementRef;

  public downloadPdf(){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor' : function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15,15,{
      'width' :100,
      'elementHandlers' : specialElementHandlers
    });

    
    doc.save('FeeStructure.pdf')

  }

  ngOnInit(): void {
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

  branchform(){
  this.selectedCourse=this.courseForm2.value.course;
    this.courseService.getcourseyear(this.courseForm2.value.course).subscribe(
      (res)=>{
        this.totalyear=res;
        this.getFee();
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }


  getFee(){
    this.year=[];
    for(this.i=0;this.i<this.totalyear;this.i++){
      let x=0;  
      x=this.i+1;
      this.year.push(x);
      this.apiService.getcourse(this.courseForm2.value.course,x).subscribe(
        (res)=>{
          this.yearfee=res;
          this.courseFee[x]=this.yearfee;             
        },
        (err)=>{
          window.alert(err);
        }
      )
    }
  }
}
