import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserInformation } from '../interfaces/user.information.interface';

//service used to interact with the server and with the app
@Injectable({
  providedIn: 'root'
})
export class ServerInteractService {

  constructor(
    private httpClient: HttpClient
  ) { }

  //function that return sports
  getSports(): Observable<any> {
    return this.httpClient.get(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/sports'
    );
  };

  //function that returns current members
  getMembers(): Observable<any> {
    return this.httpClient.get(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members'
    );
  };

  //function that creates a new member
  postMember(member: UserInformation): Observable<any> {
    return this.httpClient.post(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members',
      member
    );
  }

  //function that gets a particular member by her id
  getMember(id: string): Observable<any> {
    return this.httpClient.get(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members/' + id
    );
  }

  //function that deletes a member from the db
  deleteMember(id: string): Observable<any> {
    return this.httpClient.delete(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members/' + id
    );
  }

  //function that updates a member
  updateMember(id: string, userInormation: UserInformation): Observable<any> {
    return this.httpClient.put(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members/' + id,
      userInormation
    )
  }

  //creates a new sport
  postSport(sport: string) {
    return this.httpClient.post(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/sports/',
      {
        name: sport
      }
    )
  }


}