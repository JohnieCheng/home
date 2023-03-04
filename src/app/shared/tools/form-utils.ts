import {AbstractControl} from "@angular/forms";

export enum ControlError {
    REQUIRE = 'require',
    EMAIL = 'email',
    PASSWORD = 'password',
}

const errorContentMap = new Map([
        [ControlError.REQUIRE, () => 'You must enter a value'],
        [ControlError.EMAIL, () => 'Not a valid email'],
        [ControlError.PASSWORD, () => 'Not a valid password']
    ]
);

export function getControlErrorContent(formControl: AbstractControl): string {
    if (formControl.hasError(ControlError.REQUIRE)) {
        return errorContentMap.get(ControlError.REQUIRE)!();
    }
    if (formControl.hasError(ControlError.EMAIL)) {
        return errorContentMap.get(ControlError.EMAIL)!();
    }
    if (formControl.hasError(ControlError.PASSWORD)) {
        return errorContentMap.get(ControlError.PASSWORD)!();
    }
    return '';
}
