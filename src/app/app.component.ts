import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { HeaderComponent } from './components/header/header.component';
import { CountryService } from './core/data/country/country.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  public readonly countryService = inject(CountryService);

  title = 'countries';

  ngOnInit() {
    this.countryService.getAllCountries().subscribe(x => {
      console.log('countries', x)
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
