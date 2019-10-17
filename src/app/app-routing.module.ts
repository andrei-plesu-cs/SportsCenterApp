import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './components/members/members.component'
import { IndividualMemberComponent } from './components/individual-member/individual-member.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SportsComponent } from './components/sports/sports.component';


const routes: Routes = [
  {
    path: 'members',
    component: MembersComponent
  },
  {
    path: 'user',
    component: IndividualMemberComponent
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent
  },
  {
    path: 'sports',
    component: SportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
