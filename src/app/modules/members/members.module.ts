import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MembersRoutingModule } from './members-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';

import { CreateUserComponent } from 'src/app/components/create-user/create-user.component';
import { MembersComponent } from '../../components/members/members.component';
import { IndividualMemberComponent } from '../../components/individual-member/individual-member.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    MembersComponent,
    IndividualMemberComponent,
    UserProfileComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModuleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
