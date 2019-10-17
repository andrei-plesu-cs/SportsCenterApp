import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { ServerInteractService } from 'src/app/services/server-interact.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInformation } from 'src/app/interfaces/user.information.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  
  //outputs
  @Output('emitDiscard') emitDiscard: EventEmitter<string> = new EventEmitter<string>();

  //inputs
  @Input('isCreate') isCreate: boolean;
  @Input('message') message: string;
  @Input('userInfo') userInfo: UserInformation;
  
  //subscriptions
  sportsSubscription: Subscription;
  postMemberSubscription: Subscription;
  updateMemberSubscription: Subscription;

  fethedSports: Array<string> = []; //the sports fetched from the server
  sportsArray: Array<string> = []; //describes what sports have been apllied as filters
  selectedSport: Array<boolean> = []; //describes if the sport element at a given index show be colored in green
  showCheck: boolean = false; //show check mark if all goes well
  
  //for the loading spinner
  isLoading: boolean = true;

  //used for the reactive form
  userInfoForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    imageUrl: new FormControl('')
  });

  constructor(
    private httpService: ServerInteractService
  ) { }

  ngOnInit() {

    //fetch the sports
    this.sportsSubscription = this.httpService.getSports()
      .subscribe(sportsObject => {
        this.isLoading = false;
        this.fethedSports = sportsObject.map(sportObject => {
          return sportObject.name;
        });

        //loads the elements required if the component is meant to update user data
        if (! this.isCreate) {
          this.userInfo.sports.forEach((sport: string, index: number) => {
            this.sportsArray.push(sport);

            if (this.fethedSports.indexOf(sport) >= 0) {
              this.selectedSport[this.fethedSports.indexOf(sport)] = true;
            }
          });
        };

      });

    //loads the user data as input for form fields
    if (! this.isCreate) {
      this.userInfoForm.setValue({
        first_name: this.userInfo.first_name,
        last_name: this.userInfo.last_name,
        imageUrl: this.userInfo.imageUrl
      });
    }
  }

  ngOnDestroy() {
    if (this.sportsSubscription) {
      this.sportsSubscription.unsubscribe();
    }

    if (this.postMemberSubscription) {
      this.postMemberSubscription.unsubscribe();
    }

    if (this.updateMemberSubscription) {
      this.updateMemberSubscription.unsubscribe();
    }

  }

  //notify the parent compoent when to hide current component
  onDiscard() {
    this.emitDiscard.emit('discard');
  }

  selectSport(index: number, sportName: string): void {

    if (this.selectedSport[index]) {
      this.sportsArray = this.sportsArray.filter(sport => {
        return sport !== sportName;
      });
      this.selectedSport[index] = false;
      return;
    } 

    this.selectedSport[index] = true;
    this.sportsArray.push(sportName);
  }

  //function that handles the form submit
  onSubmit() {

    //construct the data
    let userInformation: UserInformation = {
      first_name: this.userInfoForm.value.first_name,
      last_name: this.userInfoForm.value.last_name,
      imageUrl: this.userInfoForm.value.imageUrl !== '' ? this.userInfoForm.value.imageUrl : 'https://picsum.photos/200',
      sports: this.sportsArray
    }

    //send it according to the purpose of the component: update data or create new entry
    if (this.isCreate) {
      this.handleCreate(userInformation);
    } else {
      this.handleUpdate(userInformation, this.userInfo.id);
    }

  }

  //sends the data to the server and handles the response
  handleCreate(userInformation: UserInformation): void {
    this.isLoading = true;
    this.postMemberSubscription = this.httpService.postMember(userInformation)
      .subscribe(() => {
        this.isLoading = false;
        this.checkButtonHandler();
    });
  };

  //sends the data to the server and handles the response
  handleUpdate(userInformation: UserInformation, id: string): void {
    this.isLoading = true;
    this.updateMemberSubscription = this.httpService.updateMember(id, userInformation)
      .subscribe(() => {
        this.isLoading = false;
        this.checkButtonHandler();

      });
  };

  checkButtonHandler(): void {
    this.showCheck = true;
    
    setTimeout(() => {
      console.log('da');
      this.showCheck = false;
      this.emitDiscard.emit('done');
    }, 1000);
  } 

}
