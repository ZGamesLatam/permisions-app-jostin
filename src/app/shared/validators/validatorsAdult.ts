import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function adultValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    const minAdultAge = 18;
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      age < minAdultAge ||
      (age === minAdultAge && monthDifference < 0) ||
      (age === minAdultAge &&
        monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      return { underage: true };
    }
    return null;
  };
}
