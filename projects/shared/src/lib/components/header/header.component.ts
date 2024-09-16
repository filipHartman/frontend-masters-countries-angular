import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Theme, ThemeService } from '../../services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon as fullMoon } from '@fortawesome/free-regular-svg-icons';
import { faMoon as moon } from '@fortawesome/free-solid-svg-icons';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'shared-header',
  template: `
      <header>
          <h1>Where in the world?</h1>
          <button (click)="toggleTheme()">
              <fa-icon [icon]="currentTheme() === theme.LIGHT ? fullMoonIcon: moonIcon"></fa-icon>
              {{ currentTheme() | titlecase }} Mode
          </button>
      </header>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule, TitleCasePipe],
  styleUrl: 'header.component.scss'
})

export class HeaderComponent {
  readonly theme = Theme;
  readonly fullMoonIcon = fullMoon;
  readonly moonIcon = moon;

  private readonly themeService = inject(ThemeService);

  currentTheme = this.themeService.currentTheme;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
