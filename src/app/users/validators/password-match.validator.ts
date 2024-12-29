import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPasswordValidator(passwordControlName: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get(passwordControlName)?.value;
    const confirmPassword = control.value;

    if (control.parent && password !== confirmPassword) {
      return { passwordsDoNotMatch: true };
    }
    return null;
  };
}
