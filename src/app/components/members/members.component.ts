import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UserInformation } from 'src/app/interfaces/user.information.interface';
import { ServerInteractService } from 'src/app/services/server-interact.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

//function that describes the members page of the app
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {

  createUser: boolean = false; //whether we display the create user component or not
  orderBy: boolean = false; //checks if the order by filter is opened
  filterBy: boolean = false; //checks if the filter by sports panel is opened
  filterTerms: Array<string> = []; //contains the sports by which the input should be filtered
  filterPhrase: string = 'Filter by sport';
  orderPhrase: string = 'Order by';
  isLoading: boolean = false; //check if data has been fetched or not
  
  //those are used to calculate the position of the filter elements so
  //we can place the according panels right beneath them
  positionOrderBy: {
    posX: number,
    posY: number
  } = {
    posX: 0,
    posY: 0
  }
  positionFilterBy: {
    posX: number,
    posY: number
  } = {
    posX: 0,
    posY: 0
  }

  //the array contining the members fetched from the server
  //used to reset the filters
  originalUsers: Array<UserInformation> = [];
  sports: Array<string> = []; //contains the sports fetched from the server
  users: Array<UserInformation> = []; //the array containing the members to be displayed to the screen

  //subscriptions
  userSubscription: Subscription;
  sportsSubscription: Subscription;
  queryParamsSubscription: Subscription

  constructor(
    private httpService: ServerInteractService,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    //get the current members
    this.isLoading = true;
    this.userSubscription = this.httpService.getMembers()
      .subscribe((members: Array<UserInformation>) => {
        
        //the data has been fetched
        this.isLoading = false;
        this.users = members;
        this.originalUsers = members;

        //try to get the query params
        this.queryParamsSubscription = this.currentRoute.queryParams
          .subscribe(params => {
            if (params.filter) {
              this.handleFilterByText(params.filter);
            }
          });

      });

    //get current sports
    this.sportsSubscription = this.httpService.getSports()
      .subscribe((sports: any) => {
        sports.forEach((element: any) => {
          this.sports.push(element.name.charAt(0).toUpperCase() + element.name.slice(1));
        });
      });
    
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.sportsSubscription) {
      this.sportsSubscription.unsubscribe();
    }
    
    if(this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }

  }

  handleQueryParams(sport: string): void {
    this.handleFilterByText(sport);
  }

  //calculates the position of the filter panels as described earlier
  calculateOffsets(): void {
    this.positionOrderBy.posY = 
      document.getElementById('order-by').offsetTop + 25;
    this.positionOrderBy.posX =
      document.getElementById('order-by').offsetLeft;

    this.positionFilterBy.posY =
      document.getElementById('filter-by').offsetTop + 25;
    this.positionFilterBy.posX = 
      document.getElementById('filter-by').offsetLeft;

    //set the position of the filter boxes
    document.getElementById('order-by-box')
      .style.top = '' + this.positionOrderBy.posY + 'px';
    document.getElementById('order-by-box')
      .style.left = '' + this.positionOrderBy.posX + 'px';
    
      document.getElementById('filter-by-box')
      .style.top = '' + this.positionFilterBy.posY + 'px';
    document.getElementById('filter-by-box')
      .style.left = '' + this.positionFilterBy.posX + 'px';
  }

  //fires events to the parent component
  emitDiscard(event: string): void {
    if (event === 'discard') {
      this.createUser = false;
    } else if (event === 'done') {
      this.createUser = false;
      window.location.reload();
    }
  }

  
  filterButton(event: string): void {

    this.calculateOffsets();

    if (event === 'filterBy') {
      if (this.filterBy) {
        document.getElementById('filter-by-box').style.display = 'none';

      } else {
        document.getElementById('filter-by-box').style.display = 'block';
      }

      if (this.orderBy) {
        document.getElementById('order-by-box').style.display = 'none';
        this.orderBy = false;
      }
      this.filterBy = ! this.filterBy;
    
    } else if (event === 'orderBy') {
      if (this.orderBy) {
        document.getElementById('order-by-box').style.display = 'none';
      } else {
        document.getElementById('order-by-box').style.display = 'block';
      }

      if (this.filterBy) {
        document.getElementById('filter-by-box').style.display = 'none';
        this.filterBy = ! this.filterBy;
      }
      this.orderBy = ! this.orderBy;
    }
  }

  //apply filters and styles according to the selected elements on the screen
  handleFilter(event: string) {

    //filter data in ascending order
    if (event === 'Ascending') {
      if (this.orderPhrase === 'Order by' || this.orderPhrase === 'Order by (descending)') {
        this.orderPhrase = 'Order by (ascending)';
        document.querySelector('.filter-asc').style.color = '#7dce94';
        
        //apply the order by filters in ascending order
        this.applyOrderBy(true);

      } else {
        this.orderPhrase = 'Order by';
        document.querySelector('.filter-asc').style.color = '#3d3d3f';
      }

    //in descending order
    } else if (event === 'Descending') {
      if (this.orderPhrase === 'Order by' || this.orderPhrase === 'Order by (ascending)') {
        this.orderPhrase = 'Order by (descending)';
        document.querySelector('.filter-desc').style.color = '#7dce94';

        //apply indescending order
        this.applyOrderBy(false);

      } else {
        this.orderPhrase = 'Order by';
        document.querySelector('.filter-desc').style.color = '#3d3d3f';
      }
    } else {
      this.handleFilterByText(event);
    }
  }

  handleFilterByText(event: string): void {
    if (this.filterTerms.indexOf(event.toLowerCase()) >= 0) {
      this.filterTerms.splice(this.filterTerms.indexOf(event), 1);
    } else {
      this.filterTerms.push(event.toLowerCase());
    };

    //construct the filters phrase
    this.filterPhrase = 'Filter by sports';
    this.filterTerms.forEach((term: string, index: number) => {
      if (index === 0) {
        this.filterPhrase += ' (' + term;
      } else {
        this.filterPhrase += ', ' + term;
      };
    });
    this.filterPhrase += ')';

    //apply the filters to the members array
    this.applyFilterBy();

    //update the filters phrase
    if(this.filterTerms.length === 0) {
      this.filterPhrase = 'Filter by sports';
    };
  }

  //if the current filter is present in the filters array (has been selected), color it green
  checkFilterByColor(event: string) {
    if (this.filterTerms.indexOf(event.toLowerCase()) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  //functions that apply filters
  applyOrderBy(ascending: boolean): void {

    //sort the members in ascending order
    if (ascending) {
      this.users = this.users.sort((a: UserInformation, b: UserInformation) => {
        if (a.first_name === b.first_name) {
          if (a.last_name > b.last_name)
            return 1;
          else
            return -1;
        } else if (a.first_name > b.first_name) {
          return 1;
        }

        return -1;
      });
    
    //sort the members in descending order
    } else {
      this.users = this.users.sort((a: UserInformation, b: UserInformation) => {
        if (a.first_name === b.first_name) {
          if (a.last_name < b.last_name)
            return 1;
          else
            return -1;
        } else if (a.first_name < b.first_name) {
          return 1;
        }

        return -1;
      });
    }
  }

  //applies sport based filters
  applyFilterBy(): void {

    //if there are no filters reset the data
    if (this.filterTerms.length === 0) {
      this.users = this.originalUsers;
      return;
    };

    //returs the members which are subscribed at least to the sports given as filters
    this.users = this.originalUsers.filter((user: UserInformation) => {
      return this.filterTerms.filter(term => {
        return user.sports.indexOf(term) >= 0;
      }).length >= this.filterTerms.length;
    });
  };

}
