import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountServiceService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm = this.formbuilder.group({
    username: [''],
    password: [''] 
  })
  currentUser$:Observable<User>
  constructor(private formbuilder:FormBuilder, private accountService: AccountServiceService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
  }

  SubmitLogin(login:any){
    this.accountService.Login(login).subscribe(data =>{
      console.log(data);
    },
    error =>{
      console.log(error)
    }
    )
  }

  Logout(){
    this.accountService.Logout();
  }

}
