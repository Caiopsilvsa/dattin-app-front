import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { Output, EventEmitter } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  constructor(private formBuilder:FormBuilder, private accountService:AccountServiceService,private toast:ToastrService) { }

  RegisterForm = this.formBuilder.group({
    username: [''],
    password: [''],
  })
 
  ngOnInit(): void {
  }

  Register(formData:any){
    this.accountService.Register(formData).subscribe(data => {
       console.log(data)
       this.cancel();
    }, error =>{
      this.toast.error(error.error)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
