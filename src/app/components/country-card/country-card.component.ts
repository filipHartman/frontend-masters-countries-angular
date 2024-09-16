import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Country } from '@shared/interfaces';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-country-card-component',
  templateUrl: 'country-card.component.html',
  standalone: true,
  styleUrl: 'country-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class CountryCardComponent {
  @Input({ required: true })
  country!: Country;

  @Output()
  cardClick: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('attr.tabindex')
  tabindex = 1;

  @HostListener('click')
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  handleCardClick() {
    this.cardClick.emit(this.country.name.common);
  }
}
