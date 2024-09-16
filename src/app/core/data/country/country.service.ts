import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Country } from '@shared/interfaces';
import { CountryDetail } from '@shared/interfaces/CountryDetail';

const sortCountriesByOfficialName = (countries: Country[]): Country[] => {
  countries.sort((c1: Country, c2: Country) =>
    c1.name.common < c2.name.common
      ? -1
      : c1.name.common > c2.name.common
        ? 1
        : 0,
  );
  return countries;
};

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly URL = 'https://restcountries.com/v3.1';
  private readonly ALL_COUNTRIES_URL = `${this.URL}/all?fields=name,flags,capital,region,population`;
  private readonly http = inject(HttpClient);

  private COUNTRIES_DETAIL_URL(name: string) {
    return `${this.URL}/name/${name}`;
  }

  getAllCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.ALL_COUNTRIES_URL)
      .pipe(map(sortCountriesByOfficialName));
  }

  getCountryDetailsByName(name: string): Observable<CountryDetail> {
    return this.http.get<CountryDetail>(this.COUNTRIES_DETAIL_URL(name));
  }
}
