import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CountriesStore } from '../../core/state/signal-store/countries.store';
import { CountriesContainerComponent } from '../../components/countries-container/countries-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
  imports: [
    CountriesContainerComponent,
    ReactiveFormsModule,
    NgForOf,
    CountrySearchComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private countryStore = inject(CountriesStore);
  countriesToView = this.countryStore.countriesToView;

  handleSearch([name, region]: Parameters<
    typeof this.countryStore.updateCountriesToView
  >) {
    this.countryStore.updateCountriesToView(name, region);
  }
}
