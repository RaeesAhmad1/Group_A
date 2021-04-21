import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service'
import { FormBuilder, Validators, FormGroupDirective, NgForm } from "@angular/forms";

interface PRIVELAGE {
  value: string;
  viewValue: string;
}

interface DEPARTMENT {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: UserService) { }

  privelages: PRIVELAGE[] = [
    { value: "1", viewValue: "Administrator" },
    { value: "2", viewValue: "Faculty" },
  ];

  departments: DEPARTMENT[] = [
    { value: "Applied Science", viewValue: "Applied Science" },
    { value: "CSE", viewValue: "Computer Science" },
    { value: "IT", viewValue: "Information Technology" },
    { value: "ECE", viewValue: "Electronics And Communication" },
    { value: "EN", viewValue: "Electrical And Electronics" },
    { value: "ME", viewValue: "Mechanical" },
    { value: "CE", viewValue: "Civil" },
    { value: "MCA", viewValue: "MCA" },
  ];

  createuser = this.fb.group({
    name: ["",[Validators.required]],
    mobile: ["", [Validators.required ,Validators.minLength(10), Validators.maxLength(10)]],
    email: ["",[Validators.required, Validators.email]],
    privilege: ["", [Validators.required]],
    pswd: ["",[Validators.required]],
    dept: ["",[Validators.required]],
  });

  
  isLoading = false;

  ngOnInit(): void {
  }

  get fval() {
    return this.createuser.controls;
    }

    onSubmit(form){    if(this.createuser.valid){
      this.isLoading=true;
      this.apiService.register(this.createuser.value).subscribe(
        (s) => {
          console.log("form Submitted");
          window.alert("User Registered Succesfully")          
          this.createuser.reset();
          form.resetForm();
          this.isLoading=false;
        },
        (error) => {
          this.isLoading=false;
          if(error.status==403){
            window.alert('Unauthorised Access')
            this.apiService.logoutUser();           
            }
          else{
          window.alert("USER ALREADY EXIST")
        }
        }
      );
      }
      else{
window.alert('One or more fields are invalid')
      }
    }



}
