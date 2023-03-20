import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {validateConfirmPassword, validateEmail, validatePassword} from "../tools/regexr-utils";

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

    static confirmPasswordValidator(password: FormControl) {
        return (control: AbstractControl): ValidationErrors | null => {
            return !validateConfirmPassword(password.value, control.value) ? {confirmPassword: true} : null;
        };
    }
}
