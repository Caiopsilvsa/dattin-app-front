import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { userParams } from 'src/app/models/userParams';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members:Member[]
  pagination:Pagination
  userParams:userParams
  user:User
  genderList = [
    {value:'male', display:'Males'}, {value:'female',display:'Females'}]
   
  constructor(private http:MemberService, private account:AccountServiceService) {
      this.userParams = this.http.getUserParams()
   }

  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers(){
    this.http.setUserParams(this.userParams);
    this.http.GetMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event:any){
    this.userParams.pageNumber = event.page;
    this.http.setUserParams(this.userParams);
    this.loadMembers();
  }

  resetFilters(){
    this.userParams = this.http.resetUserParams()
    this.loadMembers()
  }
}
