import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'B-TECH';
  textDir: string = 'ltr';

  constructor(private translate: TranslateService) {

//this is to determine the text direction depending on the selected language

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      if(event.lang == 'ar')
      {
        this.textDir = 'ltr';
      } 
      else
      {
        this.textDir ='rtl' ;
      }
    });
  }
}
