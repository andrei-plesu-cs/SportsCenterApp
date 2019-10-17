import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'members', 
    loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule) 
  },
  { 
    path: 'sports', 
    loadChildren: () => import('./modules/sports/sports.module').then(m => m.SportsModule) 
  },
  {
    path: '**',
    redirectTo: '/members'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
