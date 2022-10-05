import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private formbuilder:FormBuilder, private accountService: AccountServiceService, private router:Router,
    private toast:ToastrService
    ) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
  }

  SubmitLogin(login:any){
    this.accountService.Login(login).subscribe(data =>{
      this.router.navigateByUrl('/members')
    },
    error =>{
      this.toast.error(error.error)
    }
    )
  }

  Logout(){
    this.accountService.Logout();
    this.router.navigateByUrl('')
    
  }

}
