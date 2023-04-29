import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/dataTypes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedValue !: string;
  localEmail:string="";
  roles: any = [
    {value: 'Jr Software Developer', viewValue: 'Jr Software Developer'},
    {value: 'Sr Software Developer', viewValue: 'Sr Software Developer'},
    {value: 'SQL Developer', viewValue: 'SQL Developer'},
  ];

  name:string="";
  email:string="";
  password:string="";
  company:string="";
  role:string="";

  constructor(private _snackBar: MatSnackBar) { }

  user:User={
    name: 'Data Not Loaded Properly',
    email: '',
    password: '',
    company: '',
    role: '',
    isLoggedIn: false
  };

  isDisabled: boolean = true;
  
  ngOnInit(): void {
    let data = localStorage.getItem('user');
    let us = data && JSON.parse(data);
    this.user = us;

    this.localEmail = us.email;

    this.name = us.name;
    this.email = us.email;
    this.password = us.password;
    this.company = us.company;
    this.selectedValue = us.role;
  }


  editMyProfile(){
    if(!this.isDisabled){
     let a = localStorage.getItem('users');
     let arr = a && JSON.parse(a);

     let getUser = localStorage.getItem('user');
     let storeUser = getUser && JSON.parse(getUser);

     this.user.name = this.name;
     this.user.email = this.email;
     this.user.company = this.company;
     this.user.role = this.selectedValue;
     this.user.password = this.password;

     for(let i=0;i<arr.length;i++){
        if(arr[i].email === storeUser.email){
          arr[i] = this.user;
          console.log(arr[i])
        }
     }

     this._snackBar.open('Information Updated Sucessfully','X',{duration:2000})
      localStorage.setItem('users', JSON.stringify(arr));
      localStorage.setItem('user',JSON.stringify(this.user));
      this.isDisabled = !this.isDisabled;
    }
    else{
      this.isDisabled = !this.isDisabled;
    }
    
  }
  
   

}
