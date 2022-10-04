import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  constructor(private formBuilder:FormBuilder, private accountService:AccountServiceService) { }

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
      console.log(error)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
