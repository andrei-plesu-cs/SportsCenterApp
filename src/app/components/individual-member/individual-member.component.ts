import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserInformation } from '../../interfaces/user.information.interface';
import { Router } from '@angular/router';
import { ServerInteractService } from 'src/app/services/server-interact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-individual-member',
  templateUrl: './individual-member.component.html',
  styleUrls: ['./individual-member.component.css']
})
export class IndividualMemberComponent implements OnInit, OnDestroy {

  //the variable of the class
  @Input('userInformation') userInformation: UserInformation;

  //subscriptions
  deleteSubscription: Subscription;

  showModal: boolean = false;

  constructor(
    private router: Router,
    private httpService: ServerInteractService
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

  onSeeProfile(): void {
    this.router.navigate(['user-profile', this.userInformation.id]);
  }

  handleEvent(event: string) {
    if (event === 'discard') {
      this.showModal = false;
    } else if (event === 'yes') {

      this.deleteSubscription = this.httpService.deleteMember(this.userInformation.id)
        .subscribe(result => {
          this.showModal = false;
          window.location.reload();
        });
    };

  }

}
