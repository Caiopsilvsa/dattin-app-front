import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/Member';
import { Pagination } from 'src/app/models/pagination';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  members:Partial<Member[]>
  predicate = 'liked'
  pageNumber = 1
  pageSize = 2
  pagination:Pagination
  constructor(private memberService:MemberService) { }

  ngOnInit(): void {
    this.loadLikes()
  }

  loadLikes(){
    this.memberService.GetLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(data => {
      this.members = data.result
      this.pagination = data.pagination
    })
  }

  pageChanged(event:any){
    this.pageNumber = event.page
    this.loadLikes();
  }

}
