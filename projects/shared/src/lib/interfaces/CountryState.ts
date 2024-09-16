import { Country } from './Country';

export interface CountryState {
  countries: Country[];
  countriesToView: Country[];
  isLoading: boolean;
}
