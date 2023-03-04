import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {validateEmail, validatePassword} from "../tools/regexr-util";

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() {
    }

    static emailValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !validateEmail(control.value) ? {email: true} : null;
        };
    }

    static passwordValidator() {
        return (control: AbstractControl): ValidationErrors | null => {
            return !validatePassword(control.value) ? {password: true} : null;
        };
    }
}
