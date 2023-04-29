import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  SN: number;
  name: string;
  email:string;
  role: string;
  company: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
      let a = localStorage.getItem('users');
      let arr = a && JSON.parse(a);
      for(let i=0;i<arr.length;i++){
        let obj:PeriodicElement = {
          SN: (i+1),
          name: arr[i].name,
          email: arr[i].email,
          role: arr[i].role,
          company: arr[i].company
        }
        ELEMENT_DATA.push(obj);
      }
   }

  ngOnInit(): void {
    
  }

  displayedColumns: string[] = ['SN', 'name', 'email', 'role','company'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  @ViewChild('myTable') mychild!:ElementRef;

  ngAfterViewInit(){
    console.log(this.mychild)
  }
  
  showUser:boolean = false;

  userDetails:any;

  load(data:any){
    this.userDetails = [];
    console.log(data)
    let a = localStorage.getItem('users');
    let arr = a && JSON.parse(a);

    for(let user of arr){
      if(user.email == data){
        this.userDetails = user;
      }
    }

    this.showUser = !this.showUser;
  }

}
