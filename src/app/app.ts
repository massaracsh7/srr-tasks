import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import {
    TranslateService
} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'srr-tasks';
    private translate = inject(TranslateService);

    constructor() {
        this.translate.addLangs(['ru', 'en']);
        this.translate.setFallbackLang('en');
        this.translate.use('en');
    }
}
