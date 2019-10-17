import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserInformation } from '../../interfaces/user.information.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerInteractService } from 'src/app/services/server-interact.service';
import { Subscription } from 'rxjs';

//component used to represent and display an individual member of the club
@Component({
  selector: 'app-individual-member',
  templateUrl: './individual-member.component.html',
  styleUrls: ['./individual-member.component.css']
})
export class IndividualMemberComponent implements OnInit, OnDestroy {

  //input
  @Input('userInformation') userInformation: UserInformation;

  //subscriptions
  deleteSubscription: Subscription;

  //boolean to know when we need to display the confirm moda l
  showModal: boolean = false;

  constructor(
    private router: Router,
    private httpService: ServerInteractService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  //function that gets first and last name and returns full name
  returnFullName(): string {
    return this.userInformation.first_name + ' ' + this.userInformation.last_name;
  }

  //navigates to the profile page of the current user
  onSeeProfile(): void {
    this.router.navigate(['./profile', this.userInformation.id], {
      relativeTo: this.activatedRoute
    });
  }

  //handles the events sent by the modal child component
  handleEvent(event: string) {
    if (event === 'discard') {
      this.showModal = false;
    } else if (event === 'yes') {

      this.deleteSubscription = this.httpService.deleteMember(this.userInformation.id)
        .subscribe(() => {
          this.showModal = false;
          window.location.reload();
        });
    };

  }

}
