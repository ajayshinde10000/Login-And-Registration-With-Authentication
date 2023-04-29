import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AuthTask';
  user:any;
  loginTrue:boolean = true;

  constructor(private router:Router,private _snackBar: MatSnackBar,private commonService:CommonService){
      let a = localStorage.getItem('user');
      if(a){
          commonService.loginTrue.next(true);
      }
      else{
        commonService.loginTrue.next(false);
      }
      commonService.loginTrue.subscribe((data)=>{
        this.loginTrue = data;
      });
  }
 

  ngOnInit(): void {

    if(localStorage.getItem('user')){
      console.log('User Logged In');
      this.router.navigate(['home/profile']);
    }
    else{
      console.log('User Has Not Logged In');
      this.router.navigate(['auth/login']);
    }
  }

  goToHome(){
    let a = localStorage.getItem('user');
    if(!a){
      this._snackBar.open('Please Login First','X',{duration:3000});
    }
    this.router.navigate(['home']);
  }

  goToProfile(){
    let a = localStorage.getItem('user');
    if(!a){
      this._snackBar.open('Please Login First',"X",{duration:3000});
    }
    this.router.navigate(['home/profile']);
  }

  login(){
    this.router.navigate(['auth/login']);
  }

  logout(){

    this.commonService.loginTrue.next(false);
    let getUser = localStorage.getItem('user');
    let userDetails = getUser && JSON.parse(getUser);

    let a = localStorage.getItem('users');
    let userArr = a && JSON.parse(a);

    if(a && getUser){
      for(let i=0;i<userArr.length;i++){
        if(userArr[i].email === userDetails.email && userArr[i].password === userDetails.password){
            userArr[i].isLoggedIn = false;
        }
      }
      localStorage.setItem('users', JSON.stringify(userArr));
    }
    localStorage.removeItem('user');
    this.router.navigate(['auth/login']);
  }
}
