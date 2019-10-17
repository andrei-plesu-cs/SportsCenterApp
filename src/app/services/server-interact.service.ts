import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserInformation } from '../interfaces/user.information.interface';

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

  postMember(member: UserInformation): Observable<any> {
    return this.httpClient.post(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members',
      member
    );
  }

  getMember(id: string): Observable<any> {
    return this.httpClient.get(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members/' + id
    );
  }

  deleteMember(id: string): Observable<any> {
    return this.httpClient.delete(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members/' + id
    );
  }

  updateMember(id: string, userInormation: UserInformation): Observable<any> {
    return this.httpClient.put(
      'http://5da584ea57f48b0014fba987.mockapi.io/api/interviu/members/' + id,
      userInormation
    )
  }

}
