import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountServiceService } from './services/account-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
   constructor (private http: HttpClient, private accountService:AccountServiceService){}

  ngOnInit(): void {
    this.getUsers(), this.setCurrentUser()
  }
  title = 'DattingApp';
  users:any

  setCurrentUser(){
   const user:User = JSON.parse(localStorage.getItem('user'))
   this.accountService.setCurrentUser(user)
  }

  getUsers(){
    this.http.get("https://localhost:5001/Api/controller").subscribe(data=>{
      this.users = data
    })
  }  

}
