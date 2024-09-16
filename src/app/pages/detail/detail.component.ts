import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CountryDetail } from '@shared/interfaces/CountryDetail';
import {
  AsyncPipe,
  DecimalPipe,
  JsonPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { RecordParserPipe } from '@shared/pipes/record-parser.pipe';

@Component({
  selector: 'app-detail-component',
  standalone: true,
  styleUrl: 'detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'detail.component.html',
  imports: [
    FaIconComponent,
    AsyncPipe,
    NgIf,
    JsonPipe,
    KeyValuePipe,
    RecordParserPipe,
    DecimalPipe,
    NgForOf,
  ],
})
export class DetailComponent {
  detail: CountryDetail | null = null;

  @Input() set countryDetail(countryDetails: CountryDetail[]) {
    this.detail = countryDetails[0];
  }
  faArrowLeft = faArrowLeft;
  private readonly router = inject(Router);

  back() {
    this.router.navigateByUrl('/');
  }

  protected readonly Object = Object;
}
