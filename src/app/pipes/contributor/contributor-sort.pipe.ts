import { Pipe, PipeTransform } from '@angular/core';
import { ContributorDto } from 'src/app/services/contributor/interfaces/contributor-dto';

@Pipe({
  name: 'contributorSort'
})
export class ContributorSortPipe implements PipeTransform {

  transform(contributors: ContributorDto[]): ContributorDto[] {
    return contributors.sort((a, b) => b.email.localeCompare(a.email))
          .sort((a, b) => b.role.localeCompare(a.role));
  }

}
