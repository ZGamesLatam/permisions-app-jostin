import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const phoneNumberPattern = /^\+?[0-9]*$/;

    if (!value) {
      return null;
    }

    return phoneNumberPattern.test(value) ? null : { invalidPhoneNumber: true };
  };
}
