import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  BaseUrl = 'https://localhost:5001/Api/controller/'
  validationErrors: string[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.BaseUrl + 'not-found').subscribe(data =>{
      console.log(data)
    },error =>{
      console.log(error)
    })
  }

  get400Error(){
    this.http.get(this.BaseUrl = 'bad-request').subscribe(data=>{
      console.log(data)
    }, error =>{
      console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.BaseUrl + 'server-error').subscribe(data =>{
      console.log(data)
    },error=>{
      console.log(error)
    })
  }

  get401Error(){
    this.http.get(this.BaseUrl + 'auth').subscribe(data=>{
      console.log(data)
    },error =>{
      console.log(error)
    })
  }

  get400ValidationError(){
    this.http.post(this.BaseUrl + 'Register', {}).subscribe(data =>{
      console.log(data)
    }, error=>{
      console.log(error)
      this.validationErrors =  error
    })
  }

  

}
