import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list/list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit/member-edit.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages/messages.component';
import { NotFoundComponent } from './errors/not-found/not-found/not-found.component';
import { ServeErrorComponent } from './errors/serve-error/serve-error/serve-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors/test-errors.component';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'members',component:MemberListComponent, canActivate:[AuthGuard]},
      {path:'members/:username',component:MemberDetailComponent,canActivate:[AuthGuard]},
      {path:'edit', component: MemberEditComponent, canDeactivate:[CanDeactivateGuard]},
      {path:'list',component:ListComponent, canActivate:[AuthGuard]},
      {path:'messages',component:MessagesComponent, canActivate:[AuthGuard]},
    ]
  },
  {path:'errors',component:TestErrorsComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-serror',component:ServeErrorComponent},
  {path:'**',component:HomeComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
