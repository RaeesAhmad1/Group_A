import { Component, OnInit, Inject } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { FormBuilder } from '@angular/forms';
import { StudentService } from '../../service/student.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {


  selectedfile:File = null;
  constructor(private fb : FormBuilder, private cServ:CourseService, private apiService: StudentService) { }
  OpSub=[];
  createStudent = this.fb.group({
    name:[''],
    email:[''],
    mobile:[''],
    course:[''],
    branch:[''],
    std_no:[''],
    dob:[''],
    gender:[''],
    year:[''],
    semester:[''],
    core_subjects:this.fb.array([]),
    optional_subjects:this.fb.array([]),
    address:[''],
    city:[''],
    fatherName:[''],
    motherName:[''],
    fatherOccupation:[''],
    motherOccupation:[''],
    hostler:[''],
    feeStatus:[''],
    subject_name:[''],
    image:['']
  })

  subjectForm = this.fb.group({
    core_subjects:this.fb.array([]),
    optional_subjects:this.fb.array([]),
  })
  
  isEditable = true;
  genders=['Male', 'Female'];
  courses=[];
  branches=[];
    
  hostel=['Yes','No'];
  fees=['Paid','Not Paid'];
  years=[
    {"value":1,"viewValue":"First"},
    {"value":2,"viewValue":"Second"},
    {"value":3,"viewValue":"Third"},
    {"value":4,"viewValue":"Fourth"}
  ]
  semesters=[
    {"value":1,"viewValue":"First"},
    {"value":2,"viewValue":"Second"},
    {"value":3,"viewValue":"Third"},
    {"value":4,"viewValue":"Fourth"},
    {"value":5,"viewValue":"Fifth"},
    {"value":6,"viewValue":"Six"},
    {"value":7,"viewValue":"Seven"},
    {"value":8,"viewValue":"Eight"}
  ]

  onFile(event) {
    if(event.target.files.length>0)
      this.selectedfile = <File>event.target.files[0];
  }
 


  ngOnInit(): void {
    this.cServ.getcourses().subscribe(
      (res)=>{
        this.courses=res;
      },
      (err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )

    this.getStudent();
  }

  branchform(){
    this.cServ.getallbranches(this.createStudent.value.course).subscribe(
      (res)=>{
        this.branches=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }

  subjectform(){
    this.cServ.getOptionalSubjects(this.createStudent.value.course,this.createStudent.value.branch,this.createStudent.value.semester).subscribe(
      (res)=>{
        this.OpSub=res;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
    this.cServ.getCoreSubjects(this.createStudent.value.course,this.createStudent.value.branch,this.createStudent.value.semester).subscribe(
      (res)=>{
        for(let i =0; i<res.length; i++){
          this.subjectForm.value.core_subjects.push(res[i]);
        }
        
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }

  Opsubjectform(){
    this.subjectForm.value.optional_subjects.push(this.createStudent.value.subject_name);
  }

  

  submit(f){
    const fd = new FormData();
    fd.append('name',this.createStudent.value.name);
    fd.append('email',this.createStudent.value.email);
    fd.append('mobile',this.createStudent.value.mobile);
    fd.append('course',this.createStudent.value.course);
    fd.append('branch',this.createStudent.value.branch);
    fd.append('std_no',this.createStudent.value.std_no);
    fd.append('dob',this.createStudent.value.dob);
    fd.append('gender',this.createStudent.value.gender);
    fd.append('year',this.createStudent.value.year);
    fd.append('semester',this.createStudent.value.semester);
    fd.append('address',this.createStudent.value.address);
    fd.append('city',this.createStudent.value.city);
    fd.append('fatherName',this.createStudent.value.fatherName);
    fd.append('motherName',this.createStudent.value.motherName);
    fd.append('fatherOccupation',this.createStudent.value.fatherOccupation);
    fd.append('motherOccupation',this.createStudent.value.motherOccupation);
    fd.append('hostler',this.createStudent.value.hostler);
    fd.append('feeStatus',this.createStudent.value.std_no);
    fd.append('image',this.selectedfile, this.selectedfile.name);

    console.log(this.subjectForm);
    
    this.apiService.createStudent(fd).subscribe(
      (res)=>{
        let id = res._id;
        this.apiService.addSubjects(this.subjectForm.value,id).subscribe(
          (resp)=>{
            window.alert('Student Added');
            this.createStudent.reset();
            f.resetForm();        
            window.location.reload();
          },(err)=>{
            if(err.status!=200){
              window.alert('Error')
            }
          }
        )        
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
    console.log(this.createStudent.value)
    // window.location.reload()
  }

  student:any;
 is=false;

 createImageFromBlob(image: Blob) {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
     this.student = reader.result;
  }, false);

  if (image) {
     reader.readAsDataURL(image);
  }
}

  getStudent(){
    this.apiService.getImage('5f9ff8624a15194378064a22').subscribe(
      (res)=>{
        this.createImageFromBlob(res);
        this.is=true;
      },(err)=>{
        if(err.status!=200){
          window.alert('Error')
        }
      }
    )
  }

}
