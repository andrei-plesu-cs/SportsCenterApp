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

  @Output('emitDiscard') emitDiscard: EventEmitter<string> = new EventEmitter<string>();
  @Input('isCreate') isCreate: boolean;
  @Input('message') message: string;
  @Input('userInfo') userInfo: UserInformation;
  
  //subscriptions
  sportsSubscription: Subscription;
  postMemberSubscription: Subscription;
  updateMemberSubscription: Subscription;

  sports: Array<string> = [];
  sportsArray: Array<string> = [];
  selectedSport: Array<boolean> = [];
  isLoading: boolean = true;

  userInfoForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    imageUrl: new FormControl('')
  });

  constructor(
    private httpService: ServerInteractService
  ) { }

  ngOnInit() {
    this.sportsSubscription = this.httpService.getSports()
      .subscribe(result => {
        this.isLoading = false;
        this.sports = result.map(sport => {
          return sport.name;
        });

        if (! this.isCreate) {
          this.userInfo.sports.forEach((sport: string, index: number) => {
            this.sportsArray.push(sport);

            if (this.sports.indexOf(sport) >= 0) {
              this.selectedSport[this.sports.indexOf(sport)] = true;
            }
          });
          console.log(this.sportsArray);
          console.log(this.selectedSport);
        }

      });

    if (! this.isCreate) {
      this.userInfoForm.setValue({
        first_name: this.userInfo.first_name,
        last_name: this.userInfo.last_name,
        imageUrl: this.userInfo.imageUrl
      });
    }
  }

  ngOnDestroy() {
    this.sportsSubscription.unsubscribe();

    if (this.postMemberSubscription) {
      this.postMemberSubscription.unsubscribe();
    }

    if (this.updateMemberSubscription) {
      this.updateMemberSubscription.unsubscribe();
    }

  }

  onDiscard() {
    console.log('This is so good');
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
    let userInformation: UserInformation = {
      first_name: this.userInfoForm.value.first_name,
      last_name: this.userInfoForm.value.last_name,
      imageUrl: this.userInfoForm.value.imageUrl !== '' ? this.userInfoForm.value.imageUrl : 'https://picsum.photos/200',
      sports: this.sportsArray
    }

    if (this.isCreate) {
      this.handleCreate(userInformation);
    } else {
      this.handleUpdate(userInformation, this.userInfo.id);
    }

  }

  handleCreate(userInformation: UserInformation): void {
    this.isLoading = true;
    this.postMemberSubscription = this.httpService.postMember(userInformation)
      .subscribe(result => {
        this.isLoading = false;
        this.emitDiscard.emit('done');
    });
  }

  handleUpdate(userInformation: UserInformation, id: string): void {
    this.isLoading = true;
    this.updateMemberSubscription = this.httpService.updateMember(id, userInformation)
      .subscribe(result => {
        this.isLoading = false;
        this.emitDiscard.emit('done');
      })
  }

}
