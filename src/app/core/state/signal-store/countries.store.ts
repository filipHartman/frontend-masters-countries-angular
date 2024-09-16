import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { InitialState } from '../initial-state';
import { inject } from '@angular/core';
import { CountryService } from '../../data/country/country.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, shareReplay, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { CountryState } from '@shared/interfaces';

export const CountriesStore = signalStore(
  { providedIn: 'root' },
  withState(InitialState),
  withMethods((store, countryService = inject(CountryService)) => ({
    loadAllCountries: rxMethod<void>(
      pipe(
        tap(() => patchState<CountryState>(store, { isLoading: true })),
        switchMap(() =>
          countryService.getAllCountries().pipe(
            shareReplay(),
            tapResponse({
              next: (countries) =>
                patchState<CountryState>(store, {
                  countries,
                  countriesToView: countries,
                  isLoading: false,
                }),
              error: (err) => {
                patchState<CountryState>(store, { isLoading: false });
                console.error(err);
              },
            }),
          ),
        ),
      ),
    ),
    updateCountriesToView(name: string, region: string): void {
      patchState<CountryState>(store, (state) => ({
        countriesToView: state.countries.filter(
          (country) =>
            country.name.common.toLowerCase().includes(name.toLowerCase()) &&
            (!region || country.region === region),
        ),
      }));
    },
  })),
);
