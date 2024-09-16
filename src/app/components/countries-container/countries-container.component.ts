import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Country } from '@shared/interfaces';
import { NgForOf } from '@angular/common';
import { CountryCardComponent } from '../country-card/country-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries-container',
  template: `<app-country-card-component
    *ngFor="let country of countries; trackBy: countryTrackBy"
    [country]="country"
    (cardClick)="handleCardClick($event)"
  /> `,
  styleUrl: './countries-container.component.scss',
  imports: [CountryCardComponent, NgForOf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesContainerComponent {
  @Input({ required: true })
  countries!: Country[];

  private readonly router = inject(Router);

  countryTrackBy(index: number, country: Country): string {
    return country.name.common;
  }

  handleCardClick(countryName: string) {
    this.router.navigate(['detail', countryName]);
  }
}
