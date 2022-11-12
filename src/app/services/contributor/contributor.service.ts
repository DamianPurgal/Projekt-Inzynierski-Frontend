import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContributorAddDto } from './interfaces/contributor-add-dto';
import { ContributorDeleteDto } from './interfaces/contributor-delete-dto';
import { ContributorDto } from './interfaces/contributor-dto';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {

  private addContributorURL : string = 'http://localhost:8080/api/contributors/blackboards/';

  private getContributorsURL : string = 'http://localhost:8080/api/contributors/blackboards/';

  private deleteContributorURL : string = 'http://localhost:8080/api/contributors/blackboards/';

  constructor(
    private http: HttpClient
  ) { }

  addContributor(contributor: ContributorAddDto) : Observable<ContributorDto> {
    const params = new HttpParams()
    .set('contributor', contributor.contributor);

    return this.http.post<ContributorDto>(
        this.addContributorURL + contributor.blackboardUUID,
        params
      );
  }

  getAllContributors(blackboardUUID : String) : Observable<ContributorDto[]> {
    return this.http.get<ContributorDto[]>(
        this.getContributorsURL + blackboardUUID
      );
  }

  deleteContributor(contributor : ContributorDeleteDto) : Observable<void> {
    const params = new HttpParams()
    .set('contributor', contributor.contributor);

    return this.http.delete<void>(
      this.deleteContributorURL + contributor.blackboardUUID,
      {
        params: params
      }
    );
  }

}
