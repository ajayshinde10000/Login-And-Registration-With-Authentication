import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/dataTypes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectedValue !: string;
  hide=true;

  roles: any = [
    {value: 'Jr Software Developer', viewValue: 'Jr Software Developer'},
    {value: 'Sr Software Developer', viewValue: 'Sr Software Developer'},
    {value: 'SQL Developer', viewValue: 'SQL Developer'},
  ];

  constructor(private router:Router,private _snackBar: MatSnackBar) { 
    console.log(this.selectedValue);
  }

  ngOnInit(): void {
    
  }
  user:User = {
    name: '',
    email: '',
    password: '',
    company: '',
    role: '',
    isLoggedIn: false
  }

  submit(registerForm:any){
    

    

    let allUsers = localStorage.getItem('users');
    let usersArr:any = allUsers && JSON.parse(allUsers);

    if(!allUsers && this.checkValidUser(registerForm.value) && this.checkName(registerForm.value.name)){
      let arr:any = [];

      this.user.name = registerForm.value.name;
      this.user.email = registerForm.value.email;
      this.user.password = registerForm.value.password;
      this.user.company = registerForm.value.company;
      this.user.role = this.selectedValue;
      this.user.isLoggedIn = true;
      arr.push(this.user);
      localStorage.setItem('users',JSON.stringify(arr));
      localStorage.setItem('user',JSON.stringify(this.user));
      this.router.navigate(['home/profile']);
    }
      else if(registerForm.valid && this.selectedValue && allUsers){

        if(this.checkValidUser(registerForm.value) && this.checkName(registerForm.value.name)){
          this.user.name = registerForm.value.name;
          this.user.email = registerForm.value.email;
          this.user.password = registerForm.value.password;
          this.user.company = registerForm.value.company;
          this.user.role = this.selectedValue;
          this.user.isLoggedIn = true;
  
          usersArr.push(this.user);
          localStorage.setItem('users',JSON.stringify(usersArr));
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['home'])
          console.log(this.user);
          this.router.navigate(['home/profile']);
        }
        else if(!this.checkName(registerForm.value.name)){
          this._snackBar.open("Please Enter Valid Name","X", {
            duration: 3000
          });
        }
        else{
            this._snackBar.open("User Already Exist Please Enter Valid Details","X", {
              duration: 3000
            });
        }
      }
      else{
        alert('Please Enter Valid Details')
      }
  }

  goToLoginComponent(){
    this.router.navigate(['auth/login']);
  }

  checkValidUser(data:User):boolean{

    let allUsers = localStorage.getItem('users');
    let usersArr:any = allUsers && JSON.parse(allUsers);

    if(allUsers){
      for(let user of usersArr){
        if(user.email.toLowerCase() === data.email.toLowerCase() || user.password === data.password){
          return false;
        }
    }
    }
    return true;
  }

  checkName(data:string){
    let str = /^[^a-zA-Z0-9]+$/;

    var ch = str.test(data);
    if(ch){
      alert("Invalid String")
      return false;
    }
    else{
     
      return true;
    }

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
