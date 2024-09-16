import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { CountryService } from '../data/country/country.service';
import { EMPTY, Observable } from 'rxjs';
import { CountryDetail } from '@shared/interfaces/CountryDetail';

export const countryDetailResolver: ResolveFn<CountryDetail> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<CountryDetail> => {
  const countryService = inject(CountryService);
  const countryName = route.paramMap.get('name');
  return countryName
    ? countryService.getCountryDetailsByName(countryName)
    : EMPTY;
};
