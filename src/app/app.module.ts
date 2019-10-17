import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MembersComponent } from './components/members/members.component';
import { IndividualMemberComponent } from './components/individual-member/individual-member.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SportsComponent } from './components/sports/sports.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ServerInteractService } from './services/server-interact.service';
import { HttpClientModule } from '@angular/common/http';
import { CardElementComponent } from './components/card-element/card-element.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MembersComponent,
    IndividualMemberComponent,
    UserProfileComponent,
    SportsComponent,
    CreateUserComponent,
    CardElementComponent,
    LoadingSpinnerComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ServerInteractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
