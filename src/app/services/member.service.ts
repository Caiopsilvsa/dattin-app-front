import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }
   baseUrl = environment.apiUrl 
   members:Member[] = []
   GetMembers(){
      if(this.members.length >0) return of(this.members)
      return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
        map(data=>{
          this.members = data
          return data
        })
      )
    }

   GetMemberByName(username:string){
    const MemberExist = this.members.find(x => x.userName == username)
    if(MemberExist) return of(MemberExist) 
    return this.http.get<Member>(this.baseUrl + 'user/' + username)
   }

   UpdateMember(member:Member){
    return this.http.put<Member>(this.baseUrl + 'user', member)
   }
}
