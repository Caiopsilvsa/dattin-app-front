import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/Member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() member:Member

  constructor(private toast:ToastrService, private memberservice:MemberService) { }

  ngOnInit(): void {
  }

  addLike(){
    this.memberservice.AddLike(this.member.userName).subscribe(data => {
      this.toast.success("Você curtiu " + this.member.knownAs)
    })
  }

}
