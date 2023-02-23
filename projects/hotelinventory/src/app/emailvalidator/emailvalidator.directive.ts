import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[hinvEmailvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailvalidatorDirective,
      multi: true,
    },
  ],
})
export class EmailvalidatorDirective implements Validator {

  constructor() {

  }

  validate(control: AbstractControl): ValidationErrors | null{ 
    const value = control.value as string
    if (value.includes('test')){ //escrever minha propria validacao atraves do custom directive
      return { //pode utilizar onde quiser na aplicacao 
        invalidEmail: true
      }
    }
    return null
  }

}
