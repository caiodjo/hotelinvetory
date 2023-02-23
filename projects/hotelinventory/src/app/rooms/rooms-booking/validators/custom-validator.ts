import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static ValidateName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) {
      return {
        invalidName: true,
      };
    }
    return null;
  }

  static ValidateSpecialChar(sChar: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(sChar)) {
        return {
          specialCharInvalid: true,
        };
      }
      return null;
    };
  }

  static ValidadeDate(control: FormGroup) {
    const checkInDate: any = new Date(control.get('checkInDate')?.value);
    const checkOutDate: any = new Date(control.get('checkOutDate')?.value);
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
      control.get('checkOutDate')?.setErrors({
        invalidDate: true,
      });
      return {
        invalidDate: true,
      };
    }
    return null;
  }
}
