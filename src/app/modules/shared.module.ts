import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot()
  ],
  exports: [
    ButtonsModule,
    TimeagoModule
  ],

  providers:[
   
  ]
})
export class SharedModule { }
