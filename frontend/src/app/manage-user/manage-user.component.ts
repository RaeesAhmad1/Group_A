import { UserService } from '../../service/user.service'
import { FormBuilder, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
interface PRIVELAGE {
  value: string;
  viewValue: string;
}

interface DEPARTMENT {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  id:any;

  constructor(private fb: FormBuilder, private apiService: UserService,public dialogRef2: MatDialogRef<ManageUserComponent>,@Inject(MAT_DIALOG_DATA) public data: UserDialogModel) 
  {this.id=data.user_id; }

  privelages: PRIVELAGE[] = [
    { value: "1", viewValue: "Administrator" },
    { value: "2", viewValue: "Manager" },
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
    dept: ["",[Validators.required]],
  });

  pageload = false;
  isLoading = false;
  result: any;

  ngOnInit(): void {
    this.pageload=true;
    this.apiService.getUser(this.id).subscribe(
      (res)=>{
        console.log(res);
        this.result=res;
        res.privilege=res.privilege.toString();
        this.createuser.patchValue(res);
        this.pageload=false;
      },(err)=>{
        window.alert(err);
        this.pageload=false;
      }
    )
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

export class UserDialogModel {

  constructor(public user_id: string) {
  }
}