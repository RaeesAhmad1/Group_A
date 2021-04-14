import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private apiService: UserService) { }

  loginForm = this.fb.group({
    username:[''],
    pswd:['']
  })

  loginForm2 = this.fb.group({
    username:[''],
    pswd:['']
  })

  priv:any;
  isLoading=false;

  ngOnInit(): void {
    this.isLoading=false;
  }

  adminLogin(){
    this.isLoading=true;
    this.apiService.login(this.loginForm.value).subscribe(
      (res)=>{
        if(res.privilege==1){
          localStorage.setItem('token',res.token);
          localStorage.setItem('user_id',res._id);
          localStorage.setItem('priv',res.privilege);
          this.router.navigate(['/admin/dashboard']);
        }
        else{
          window.alert('Only admins are allowed!')
        }
        this.isLoading=false;
      },(err)=>{
        console.log(err);
        this.isLoading=false;
      }
    )
  }

  facultyLogin(){
    this.isLoading=true;
    this.apiService.login(this.loginForm2.value).subscribe(
      (res)=>{
        if(res.privilege==2){
          localStorage.setItem('token',res.token);
          localStorage.setItem('user_id',res._id);
          localStorage.setItem('priv',res.privilege);
          this.priv=res.privilege;
          this.router.navigate(['/faculty/dashboard']);
        }
        else{
          window.alert('Manager Not Found')
        }
        this.isLoading=false;
      },(err)=>{
        console.log(err);
        this.isLoading=false;
      }
    )
  }




}
