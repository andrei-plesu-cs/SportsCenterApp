import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ServerInteractService } from 'src/app/services/server-interact.service';
import { UserInformation } from 'src/app/interfaces/user.information.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  cards: Array<Object> = [];
  isLoading: boolean = true;

  //subscriptions
  sportsObersverSubsription: Subscription;
  membersSubscription: Subscription;

  constructor(
    private httpService: ServerInteractService,
    private router: Router
  ) { }

  ngOnInit() {

    //get the members to filter data so you know how many members are in 
    //each sport
    this.httpService.getMembers()
      .subscribe((members: Array<UserInformation>) => {
        //get the sports
        this.sportsObersverSubsription = this.httpService.getSports()
        .subscribe((result: any) => {
          this.membersSubscription = result.forEach((element: any, index: number) => {

            let noOfMembers = members.filter((member: UserInformation) => {
              return member.sports.indexOf(element.name) >= 0
            }).length;

            this.cards.push({
              sportName: element.name,
              noOfMembers: noOfMembers
            });
          });

          this.isLoading = false;

        })
      })

  }

  ngOnDestroy() {
    if(this.membersSubscription) {
      this.membersSubscription.unsubscribe();
    }

    if (this.sportsObersverSubsription) {
      this.sportsObersverSubsription.unsubscribe();
    }
  }

}
