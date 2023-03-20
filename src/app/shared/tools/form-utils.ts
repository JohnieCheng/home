import {AbstractControl} from "@angular/forms";

export enum ControlError {
    REQUIRE = 'require',
    EMAIL = 'email',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword',
}

const errorContentMap = new Map([
        [ControlError.REQUIRE, () => 'You must enter a value'],
        [ControlError.EMAIL, () => 'Not a valid email'],
        [ControlError.PASSWORD, () => 'Not a valid password'],
        [ControlError.CONFIRM_PASSWORD, () => 'Not a same password'],
    ]
);


export function getControlErrorContent(formControl: AbstractControl): string {
    debugger
    if (formControl.hasError(ControlError.REQUIRE)) {
        return errorContentMap.get(ControlError.REQUIRE)!();
    }
    if (formControl.hasError(ControlError.EMAIL)) {
        return errorContentMap.get(ControlError.EMAIL)!();
    }
    if (formControl.hasError(ControlError.PASSWORD)) {
        return errorContentMap.get(ControlError.PASSWORD)!();
    }
    if (formControl.hasError(ControlError.CONFIRM_PASSWORD)) {
        return errorContentMap.get(ControlError.CONFIRM_PASSWORD)!();
    }
    return '';
}
