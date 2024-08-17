import { effect, Injectable, signal } from '@angular/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({ providedIn: 'root'})
export class ThemeService {
  public currentTheme = signal<Theme>(Theme.LIGHT);

  constructor() {
    effect(() => {
      document.body.setAttribute('data-theme', this.currentTheme());
    })
  }

  toggleTheme() {
    this.currentTheme.set(this.currentTheme() === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }
}
