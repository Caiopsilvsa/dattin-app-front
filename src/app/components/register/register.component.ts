import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { Output, EventEmitter } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  maxDate: Date;
  constructor(private formBuilder:FormBuilder, private accountService:AccountServiceService,private toast:ToastrService,
    private route:Router
    ) { }

  RegisterForm: FormGroup 
  validationErrors:string[] = []
  ngOnInit(): void {
    this.loadForm()
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  register(){
    this.accountService.Register(this.RegisterForm.value).subscribe(data => {
       this.route.navigateByUrl('/members')
    }, error =>{
      this.validationErrors = error
    })
  }

  loadForm(){
    this.RegisterForm = this.formBuilder.group({
      gender:['male'],
      username: ['', Validators.required],
      knowAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required, this.confirmPasswords('password')]]  
      })
  }

  confirmPasswords(matchTo:string){
    return (control:AbstractControl) =>{
      return control?.value === control.parent?.controls[matchTo].value
        ? null :{isMatching:true}
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
