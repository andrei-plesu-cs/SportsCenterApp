import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerInteractService } from 'src/app/services/server-interact.service';
import { UserInformation } from 'src/app/interfaces/user.information.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  //used to handle the reactive form data
  sportGroup:FormGroup  = new FormGroup({
    sportName: new FormControl('')
  });

  //subscriptions
  sportsObersverSubsription: Subscription;
  membersSubscription: Subscription;
  newSportSubscription: Subscription;

  cards: Array<Object> = []; //holds the card information that gets sent to separate components through input fields
  isLoading: boolean = true; //check if the data has been fetched from the server or not
  addSport: boolean = false; //display the add sport form or not

  constructor(
    private httpService: ServerInteractService
  ) { }

  ngOnInit() {

    //get the members to filter data and get know how many members are in each sport
    //fetch the members from the server
    this.httpService.getMembers()
      .subscribe((members: Array<UserInformation>) => {
        
        //fetch the sports
        this.sportsObersverSubsription = this.httpService.getSports()
        .subscribe((result: any) => {
          
          //calculate how many members are registered for each sport
          this.membersSubscription = result.forEach((element: any, index: number) => {
            let noOfMembers = members.filter((member: UserInformation) => {
              return member.sports.indexOf(element.name) >= 0
            }).length;

            //constructs the card element
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

    if (this.newSportSubscription) {
      this.newSportSubscription.unsubscribe();
    }

  }

  //handles the form submission
  onSubmit(): void {
    this.isLoading = true;

    //handles the response from the server
    this.newSportSubscription = this.httpService.postSport(
      this.sportGroup.value.sportName
    ).subscribe(result => {
      this.isLoading = false;
      this.addSport = false;
      window.location.reload();
    });
  }

}
