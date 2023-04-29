import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginTrue:boolean=false;
  constructor(private router:Router,private _snackBar: MatSnackBar,private commonService:CommonService) { 
  }

  ngOnInit(): void {
  }
  errMsg:boolean = false;

  submit(data:any){
    console.log(data);
    let a = localStorage.getItem('users');
    let arr = a && JSON.parse(a);

    if(a){
      for(let user of arr){
        if(data.email===user.email && data.password === user.password){

          user.isLoggedIn = true;
          localStorage.setItem('users', JSON.stringify(arr));
          localStorage.setItem('user',JSON.stringify(user));

          this.router.navigate(['home/profile']);
          this.openSnackBar();
          return;
        }
      }
      this._snackBar.open("Please Enter Valid Credentials", "Ok",{
        duration: 3 * 1000,
      });
    }

    else{
      this._snackBar.open("Please Enter Valid Credentials", "Ok",{
        duration: 3 * 1000,
      });
      this.errMsg = true;
    }
    //this.router.navigate(['auth/register']);
  }

  openSnackBar() {
    this.commonService.loginTrue.next(true);
    this._snackBar.open("Login SuccessFull", "Ok",{
      duration: 3 * 1000,
    });
  }

  goToRegisterComponent(){
    this.router.navigate(['auth/register']);
  }

  passProperty:string='password';
  showPassword(){
    if(this.passProperty==='password'){
      this.passProperty = 'text'
    }
    else{
      this.passProperty = 'password'
    }
  }
}
