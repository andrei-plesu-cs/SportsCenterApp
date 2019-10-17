import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

interface CardInterface {
  sportName: string,
  noOfMembers: number
}

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrls: ['./card-element.component.css']
})
export class CardElementComponent implements OnInit {

  @Input('cardInfo') cardInfo: CardInterface;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  //function that navigates to the members page and applies filter based on the sport
  //provided as input
  navigateSports() {
    this.router.navigate(['members'], {
      queryParams: {
        filter: this.cardInfo.sportName
      }
    });
  }

}
