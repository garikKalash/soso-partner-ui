import {Component, OnInit} from "@angular/core";
import {TranslateService} from "./translate/translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _translate: TranslateService) {
  }

  public supportedLanguages: any[];

  ngOnInit(): void {
    // standing datad
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Հայերեն', value: 'am' },
    ];

    this.selectLang('en');

  }

  isCurrentLang(lang: string) {
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    // set default;
    this._translate.use(lang);

  }
}
