import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from 'src/app/components/members/members.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';


const routes: Routes = [
  { 
    path: '', 
    component: MembersComponent 
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
