import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../../../shared/interfaces/Country';

@Injectable({providedIn: 'root'})
export class CountryService {
  private readonly URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region';
  private readonly http = inject(HttpClient);

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.URL);
  }
}
