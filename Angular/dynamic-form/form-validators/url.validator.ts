import { AbstractControl, ValidatorFn } from '@angular/forms'

export function validateUrl(): ValidatorFn {
   const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/; //https://www.regextester.com/94502
   return (control: AbstractControl) => {
      const isMatch = urlPattern.test(control.value);
      return isMatch ? null : { invalidUrl: true };
   }
}