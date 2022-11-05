import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlackboardAdd } from './interfaces/blackboard-add';
import { BlackboardContributorAddDto } from './interfaces/blackboard-contributor-add-dto';
import { BlackboardInfo } from './interfaces/blackboard-info';

@Injectable({
  providedIn: 'root'
})
export class BlackboardService {

  constructor(
    private http: HttpClient
  ) { }

  private allBlackboardsURL : string = 'http://localhost:8080/api/blackboards/all';
  private addBlackboardURL : string = 'http://localhost:8080/api/blackboards';
  private addBlackboardContributorURL : string = 'http://localhost:8080/api/blackboards/';

  getAllBlackboardsOfUser() : Observable<BlackboardInfo[]> {
    return this.http.get<BlackboardInfo[]>(this.allBlackboardsURL);
  }

  addBlackboard(blackboard: BlackboardAdd) : Observable<BlackboardInfo> {
    return this.http.post<BlackboardInfo>(this.addBlackboardURL, blackboard);
  }

  addBlackboardContributor(blackboardContributor: BlackboardContributorAddDto) : Observable<void> {
    const params = new HttpParams()
    .set('contributor', blackboardContributor.contributor);

    return this.http.post<void>(
        this.addBlackboardContributorURL + blackboardContributor.blackboardUUID,
        params
      );
  }
}
