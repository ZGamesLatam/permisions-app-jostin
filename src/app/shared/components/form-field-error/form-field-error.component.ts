import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "shared-form-field-error",
  templateUrl: "./form-field-error.component.html",
  styleUrl: "./form-field-error.component.scss",
})
export class FormFieldErrorComponent {
  @Input()
  public control?: AbstractControl | null;
  @Input()
  public errorMessages: { [key: string]: string } = {};

  constructor(private _translateService: TranslateService) {}

  shouldShowErrors(): boolean {
    return !!(
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  listOfErrors(): string[] {
    if (!this.control || !this.control.errors) {
      return [];
    }

    return Object.keys(this.control.errors).map((err) => {
      const translationKey = this.errorMessages[err];

      return translationKey
        ? this._translateService.instant(translationKey)
        : `Error: ${err}`;
    });
  }
}
