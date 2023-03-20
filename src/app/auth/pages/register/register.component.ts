import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {getControlErrorContent} from "../../../shared/tools/form-utils";
import {ValidationService} from "../../../shared/service/validation.service";
import {AuthService} from "../../shared/auth.service";
import {Subject, takeUntil} from "rxjs";
import {RegisterVo} from "../../shared/interfaces/register-vo.interface";
import {AuthUserData} from "../../shared/interfaces/register-data.interface";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    registerForm!: FormGroup;
    email!: FormControl;
    password!: FormControl;
    confirmPassword!: FormControl;
    isRegisterButtonLoading: boolean;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private formBuilder: FormBuilder,
                private changeDetectorRef: ChangeDetectorRef,
                private router: Router,
                private authService: AuthService,
    ) {
        this.isRegisterButtonLoading = false;
        this.buildForm();
    }

    getErrorMessage(formControl: FormControl) {
        return getControlErrorContent(formControl);
    }

    onRegister() {
        if (this.registerForm.valid) {
            this.isRegisterButtonLoading = true;
            const registerVo: RegisterVo = this.registerForm.getRawValue();
            this.authService
                .signup(registerVo)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (response: unknown) => {
                        this.handleRegisterResponse(response);
                    },
                    error: (error: any) => {
                        this.handleRegisterError(error);
                    },
                });
        }
    }

    handleRegisterResponse(response: unknown) {
        this.isRegisterButtonLoading = false;
        const token = (response as AuthUserData).accessToken;
        debugger
        localStorage.setItem('cur_token', token);
        this.router.navigate(['/login']).then(() => {
            this.ngOnDestroy();
        });
        return this.changeDetectorRef.detectChanges();
    }

    handleRegisterError(error: any) {
        this.isRegisterButtonLoading = false;

    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    private buildForm() {
        this.email = new FormControl<string | null>('', [
            Validators.required,
            ValidationService.emailValidator(),
        ]);
        this.password = new FormControl<string | null>('', [
            Validators.required,
            ValidationService.passwordValidator(),
        ]);
        this.confirmPassword = new FormControl<string | null>('', [
            Validators.required,
            ValidationService.confirmPasswordValidator(this.password),
        ]);
        this.registerForm = this.formBuilder.group({
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
        });
    }
}
