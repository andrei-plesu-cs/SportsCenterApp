import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MembersModule } from './modules/members/members.module';
import { SportsModule } from './modules/sports/sports.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServerInteractService } from './services/server-interact.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MembersModule,
    SportsModule
  ],
  providers: [ServerInteractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
