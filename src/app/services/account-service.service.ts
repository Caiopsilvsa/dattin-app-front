import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.apiUrl
  private currentUserSource = new ReplaySubject<User>(1)
  currentUser$ = this.currentUserSource.asObservable()
    
    Login(user:any){
      return this.http.post(this.baseUrl + 'Login', user).pipe(
        map((response:User)=>{
          const user = response;
          if(user){
            localStorage.setItem('user',JSON.stringify(user))
            this.currentUserSource.next(user)
          }
        })
      )
    }

    Register(user:any){
      return this.http.post(this.baseUrl + 'Register', user).pipe(
        map((response:User)=>{
          const user = response
          if(user){
            localStorage.setItem('user',JSON.stringify(user))
            this.currentUserSource.next(user)
          }
        })
      )
    }

    setCurrentUser(user:User){
      this.currentUserSource.next(user)
    }

    Logout(){
      localStorage.removeItem('user')
      this.currentUserSource.next(null)
    }
}
