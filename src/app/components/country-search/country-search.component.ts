import {
  ChangeDetectionStrategy,
  Component,
  effect,
  output,
  Signal,
} from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-country-search',
  template: `
    <div class="input-container">
      <fa-icon [icon]="faMagnifyingGlass"></fa-icon>
      <input
        type="text"
        [formControl]="searchControl"
        placeholder="Search for country..."
      />
    </div>
    <select [formControl]="regionControl">
      <option value="">All regions</option>
      <option *ngFor="let region of regions" [value]="region">
        {{ region }}
      </option>
    </select>
  `,
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule, FaIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: 'country-search.component.scss',
})
export class CountrySearchComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  readonly regions: string[] = [
    'Antarctic',
    'Americas',
    'Asia',
    'Europe',
    'Africa',
    'Oceania',
  ];

  searchControl = new FormControl<string>('', { nonNullable: true });
  regionControl = new FormControl<string>('', { nonNullable: true });

  search = output<[string, string]>();
  searchControlSignal: Signal<string> = toSignal(
    this.searchControl.valueChanges,
    { initialValue: '' },
  );
  regionControlSignal: Signal<string> = toSignal(
    this.regionControl.valueChanges,
    { initialValue: '' },
  );

  constructor() {
    effect(() =>
      this.search.emit([
        this.searchControlSignal(),
        this.regionControlSignal(),
      ]),
    );
  }
}
