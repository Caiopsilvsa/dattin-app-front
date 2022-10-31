import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/Member';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';
import { userParams } from '../models/userParams';
import { AccountServiceService } from './account-service.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient, private accountService:AccountServiceService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user
      this.userParams = new userParams(user)
    })
  }
  
  baseUrl = environment.apiUrl 
   members:Member[] = []
   memberCache = new Map();
   user:User
   userParams:userParams
   
   GetMembers(userParams:userParams){
      var response = this.memberCache.get(Object.values(userParams).join('-'))
       
        if(response){
          return of(response)
          } 

      let params = this.GetpaginationHeaders(userParams.pageNumber, userParams.pageSize)
          params = params.append('minAge',userParams.minAge)
          params = params.append('maxAge',userParams.maxAge)
          params = params.append('gender',userParams.gender)
          params = params.append('orderBy',userParams.orderBy)

      return this.getPaginatedResult<Member[]>(this.baseUrl + 'users',params)
          .pipe(map(response=>{
            this.memberCache.set(Object.values(userParams).join('-'),response);
            return response
          }))
    }

    getUserParams(){
      return this.userParams
    }

    setUserParams(params:userParams){
      this.userParams = params
    }

    resetUserParams() {
      this.userParams = new userParams(this.user);
      return this.userParams;
    }

   GetMemberByName(username:string){
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'user/' + username)
   }

   UpdateMember(member:Member){
    return this.http.put<Member>(this.baseUrl + 'user', member)
   }

   
   GetpaginationHeaders(pageNumber: number, pageSize: number) {
     let paginationParams = new HttpParams() 
        paginationParams  = paginationParams .append('pageNumber', pageNumber.toString()),
        paginationParams  = paginationParams .append('pageSize',pageSize.toString())
     return paginationParams  
  }

  private getPaginatedResult<T>(url, params) {
   const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>()
        return this.http.get<T>(url, {observe:'response',params}).pipe(
          map(response =>{
            paginatedResult.result = response.body
            if(response.headers.get('Pagination')!= null){
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
            }
            return paginatedResult;
          })
        )
  }
}
