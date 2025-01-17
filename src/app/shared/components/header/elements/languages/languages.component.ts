import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageComponent } from "src/app/core/interfaces/ui/language.interface";
import { NavService } from "src/app/core/services/ui/nav.service";

@Component({
  selector: "shared-header-languages",
  templateUrl: "./languages.component.html",
  styleUrls: ["./languages.component.scss"],
})
export class LanguagesComponent implements OnInit {
  public language: boolean = false;

  public languages: LanguageComponent[] = [
    {
      language: "English",
      code: "en",
      type: "US",
      icon: "us",
    },
    {
      language: "Español",
      code: "es",
      type: "ES",
      icon: "es",
    },
  ];

  public selectedLanguage: LanguageComponent = {
    language: "English",
    code: "en",
    type: "US",
    icon: "us",
  };



  constructor(
    public navServices: NavService,
    private translate: TranslateService,
  ) {
   
  }
  //
  ngOnInit() {}

  public changeLanguage(lang: LanguageComponent) {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }
}
