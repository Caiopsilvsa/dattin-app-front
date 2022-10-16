import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { User } from 'src/app/models/user';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member:Member
  user:User
  
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  editForm:FormGroup

  constructor(private accountService:AccountServiceService, private memberservice:MemberService, 
    private toast:ToastrService
    ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember(){
    this.memberservice.GetMemberByName(this.user.userName).subscribe(member=>{
      this.member = member
      this.loadForm()
    }) 
  }

  loadForm(){
    this.editForm = new FormGroup({
      introduction: new FormControl(this.member.introduction),
      lookingFor: new FormControl(this.member.lookingFor),
      interests:new FormControl(this.member.interests),
      city: new FormControl(this.member.city),
      country: new FormControl(this.member.country)
    })

  }

  updateMember(form:any){
    this.memberservice.UpdateMember(form).subscribe(data =>{
      this.editForm.reset(form)
      this.toast.success('Edição salva com sucesso')
    })
    
   
  }
}
