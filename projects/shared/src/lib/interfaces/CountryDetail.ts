import { CountryFlag, CountryName } from '@shared/interfaces/Country';

interface CountryDetailName extends CountryName {
  nativeName: Record<string, CountryName>;
}
export interface CountryDetail {
  name: CountryDetailName;
  tld: string[];
  currencies: Record<string, Currency>;
  capital: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  borders: string[];
  population: number;
  flags: CountryFlag;
}

export interface Currency {
  name: string;
  symbol: string;
}
