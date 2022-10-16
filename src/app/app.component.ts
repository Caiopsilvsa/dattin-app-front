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
  
   constructor (private accountService:AccountServiceService){}

  ngOnInit(): void {
     this.setCurrentUser()
  }
  title = 'DattingApp';
  users:any

  setCurrentUser(){
   const user:User = JSON.parse(localStorage.getItem('user'))
   this.accountService.setCurrentUser(user)
  }
}
