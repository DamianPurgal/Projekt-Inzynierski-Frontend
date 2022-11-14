import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlackboardAdd } from './interfaces/blackboard-add';
import { BlackboardContributorAddDto } from './interfaces/blackboard-contributor-add-dto';
import { BlackboardDeleteDto } from './interfaces/blackboard-delete-dto';
import { BlackboardDetailedDto } from './interfaces/blackboard-detailed-dto';
import { BlackboardEditDto } from './interfaces/blackboard-edit-dto';
import { BlackboardEditResult } from './interfaces/blackboard-edit-result';
import { BlackboardInfo } from './interfaces/blackboard-info';

@Injectable({
  providedIn: 'root'
})
export class BlackboardService {

  constructor(
    private http: HttpClient
  ) { }

  private allBlackboardsURL : string = 'http://localhost:8080/api/blackboards/all';
  private detailedBlackboardURL : string = 'http://localhost:8080/api/blackboards/';
  private addBlackboardURL : string = 'http://localhost:8080/api/blackboards';
  private addBlackboardContributorURL : string = 'http://localhost:8080/api/contributors/blackboards/';
  private deleteBlackboardURL : string = 'http://localhost:8080/api/blackboards/';
  private editBlackboardURL : string = 'http://localhost:8080/api/blackboards/';

  getBlackboardDetailed(blackboardUuid : string) : Observable<BlackboardDetailedDto> {
    return this.http.get<BlackboardDetailedDto>(
        this.detailedBlackboardURL + blackboardUuid + "/detailed"
      );
  }

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

  deleteBlackboard(blackboardDeleteDto: BlackboardDeleteDto) : Observable<void> {
    return this.http.delete<void>(
        this.deleteBlackboardURL + blackboardDeleteDto.blackboardUUID
      );
  }

  editBlackboard(blackboardEditDto: BlackboardEditDto, blackboardUUID: String) : Observable<BlackboardEditResult> {
    return this.http.put<BlackboardEditResult>(
        this.editBlackboardURL + blackboardUUID,
        blackboardEditDto
      );
  }
}
