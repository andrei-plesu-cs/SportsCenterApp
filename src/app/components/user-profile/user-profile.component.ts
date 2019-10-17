import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInformation } from '../../interfaces/user.information.interface';
import { ActivatedRoute } from '@angular/router';
import { ServerInteractService } from 'src/app/services/server-interact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  //the informations about the user
  userInformation: UserInformation;
  user_id: string;
  isLoading: boolean = true;

  //other variables
  isEdit: boolean = false;

  //subsriptions
  paramsSubscriptions: Subscription;
  userInfoSubscription: Subscription;

  constructor(
    private currentRoute: ActivatedRoute,
    private httpService: ServerInteractService
  ) { }

  ngOnInit() {

    this.paramsSubscriptions = this.currentRoute.params
      .subscribe(result => {
        this.user_id = result.id;
        
        this.userInfoSubscription = this.httpService.getMember(this.user_id)
          .subscribe((result: UserInformation) => {
            this.userInformation = result;
            this.isLoading = false;
          });

      });

  }

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();
    this.paramsSubscriptions.unsubscribe();
  }

  //function that handles the info update
  editInfo() {
    this.isEdit = true;
  }

  emitDiscard(event: string): void {
    this.isEdit = false;
    if (event === 'done') {
      window.location.reload();
    }
  }

}
