import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlackboardAdd } from './interfaces/blackboard-add';
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

  getAllBlackboardsOfUser() : Observable<BlackboardInfo[]> {
    return this.http.get<BlackboardInfo[]>(this.allBlackboardsURL);
  }

  addBlackboard(blackboard: BlackboardAdd) : Observable<BlackboardInfo> {
    return this.http.post<any>(this.addBlackboardURL, blackboard);
  }
}
