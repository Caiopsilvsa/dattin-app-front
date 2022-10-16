import { Injectable } from '@angular/core';
import {  NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  constructor(private spinner:NgxSpinnerService) { }

  spinnerCount = 0;

  spinnerSum(){
    this.spinnerCount++;
    this.spinner.show(undefined,{
      type: 'line-scale-pulse-out-rapid',
      bdColor: "rgba(0, 0, 0, 0.8)",
      size:"medium",
      color: "#fff"
    })
  }

  spinnerDec(){
    this.spinnerCount -1;
    if(this.spinnerCount <=0){
      this.spinnerCount = 0
    }
    this.spinner.hide();
  }
}
