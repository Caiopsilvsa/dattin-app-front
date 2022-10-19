import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListComponent } from './components/list/list/list.component';
import { MessagesComponent } from './components/messages/messages/messages.component';

import { SharedModule } from './modules/shared.module';
import { NotFoundComponent } from './errors/not-found/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors/test-errors.component';
import { ServeErrorComponent } from './errors/serve-error/serve-error/serve-error.component';
import { ErrorInterceptor } from './Interceptors/error-interceptor.interceptor';
import { MemberCardComponent } from './components/members/member-card/member-card/member-card.component';
import { TokenInterceptorInterceptor } from './Interceptors/token-interceptor.interceptor';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './components/members/member-edit/member-edit/member-edit.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerInterceptorInterceptor } from './Interceptors/spinner-interceptor.interceptor';
import { TextInputComponent } from './components/forms/text-input/text-input/text-input.component';
import { DateInputComponent } from './components/forms/date-input/date-input/date-input.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListComponent,
    MessagesComponent,
    NotFoundComponent,
    TestErrorsComponent,
    ServeErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    TextInputComponent,
    TextInputComponent,
    DateInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }) 
  ],
  providers: [ 
              TabsetConfig, 
              CanDeactivateGuard,
              BsDatepickerConfig,
               {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
               {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true},
               {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
