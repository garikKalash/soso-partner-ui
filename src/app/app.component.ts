import {Component, OnInit, SecurityContext, Sanitizer} from '@angular/core';
import {TranslateService} from "./translate/translate.service";
import {MenuItem} from "primeng/components/common/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public supportedLanguages:any[];
  public selectedLang:string;

  constructor(private _translate: TranslateService,private sanitizer: Sanitizer) { }

  ngOnInit() {
    // standing datad
    this.supportedLanguages = [
      { display: 'Հայերեն', value: 'am', flagpath:"http://flagpedia.net/data/flags/mini/am.png",label:"Հայ" },
      { display: 'English', value: 'en', flagpath:"http://flagpedia.net/data/flags/mini/gb.png", label: "Eng" },
    ];


    this.selectedLang = this.supportedLanguages[0].value;
    this.selectLang(this.selectedLang);

  }

  isCurrentLang(lang: string) {
    return lang === this._translate.currentLang;
  }

  selectLanguage(){
    this.selectLang(this.selectedLang);
  }

  selectLang(lang: string) {
    // set default;
    this._translate.use(lang);

  }


}
