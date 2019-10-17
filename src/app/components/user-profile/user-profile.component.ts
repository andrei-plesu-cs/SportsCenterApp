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

    //get the id of the user that needs to be displayed from the query params
    this.paramsSubscriptions = this.currentRoute.params
      .subscribe(result => {
        this.user_id = result.id;
        
        //fetches the entire member from the server based on the id
        this.userInfoSubscription = this.httpService.getMember(this.user_id)
          .subscribe((result: UserInformation) => {
            this.userInformation = result;
            this.isLoading = false;
          });

      });

  }

  ngOnDestroy() {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }

    if (this.paramsSubscriptions) {
      this.paramsSubscriptions.unsubscribe();
    }

  }

  //function that handles the information update on the current member
  editInfo() {
    this.isEdit = true;
  }

  //fires events to the 'members' parent component
  emitDiscard(event: string): void {
    this.isEdit = false;
    if (event === 'done') {
      window.location.reload();
    }
  }

}
