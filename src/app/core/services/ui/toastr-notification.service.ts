import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { DEFAULT_INDIVIDUAL_TOASTR_CONFIG } from "../../helpers/ui/ui.constant";
import { ApiMessage } from "../../interfaces/api/api-response.interface";
import { ToastrNotification } from "../../interfaces/ui/notification.interface";


@Injectable({
  providedIn: "root",
})
export class ToastrNotificationService {
  constructor(
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
   
  ) {}

  public showNotification(notification: ToastrNotification): void {
    const { type, message, title, config } = notification;
    const titleText = title ? this._translateService.instant(title) : "";
    const messageText = this.getMessageTest(message);
    const configFormatted = { ...DEFAULT_INDIVIDUAL_TOASTR_CONFIG, ...config };
    this._toastrService[type](messageText, titleText, configFormatted);
  }

  public getMessageTest(message: ApiMessage): string {
    let messageFormatted = "";

    if (typeof message === "string") {
      messageFormatted = message;
    }

    if (typeof message === "object") {
      //const language = this._lang.code.value;
      //const messageText = message[language] || "";
    //  messageFormatted = messageText;
    }

    return messageFormatted;
  }
}
