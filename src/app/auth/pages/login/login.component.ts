import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    Renderer2,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Subject, takeUntil} from "rxjs";
import {ValidationService} from "../../../shared/service/validation.service";
import {MatButtonModule} from "@angular/material/button";
import {getControlErrorContent} from "../../../shared/tools/form-utils";
import {AuthService} from "../../shared/auth.service";
import {LoginVo} from "../../shared/interfaces/login-vo.interface";
import {AuthUserData} from "../../shared/interfaces/register-data.interface";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AuthService]
})
export class LoginComponent implements AfterViewInit, OnDestroy {
    loginForm!: FormGroup;
    email!: FormControl;
    password!: FormControl;
    isLoginButtonLoading: boolean;
    window: Window;
    destroy$: Subject<boolean> = new Subject<boolean>();

    @ViewChild('rightEyeBall')
    private rightEyeBall!: ElementRef;

    @ViewChild('leftEyeBall')
    private leftEyeBall!: ElementRef;

    @ViewChild('pwd')
    private pwd!: ElementRef;

    @ViewChild('form')
    private form!: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private renderer: Renderer2,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {
        this.window = document.defaultView as Window;
        this.isLoginButtonLoading = false;
        this.buildForm();
    }

    ngAfterViewInit() {
        // Panda Eye move
        this.renderer.listen(document.body, 'mousemove', (event) => {
            let dw = document.body.clientWidth / 15;
            let dh = document.body.clientHeight / 15;
            let x = event.pageX / dw;
            let y = event.pageY / dh;
            this.renderer.setStyle(this.leftEyeBall.nativeElement, 'width', x + 'px');
            this.renderer.setStyle(this.leftEyeBall.nativeElement, 'height', y + 'px');
            this.renderer.setStyle(this.rightEyeBall.nativeElement, 'width', x + 'px');
            this.renderer.setStyle(this.rightEyeBall.nativeElement, 'height', y + 'px');
        });

        this.renderer.listen(this.pwd.nativeElement, 'focusin', () => {
            this.renderer.addClass(this.form.nativeElement, 'up')
        });
        this.renderer.listen(this.pwd.nativeElement, 'focusout', () => {
            this.renderer.removeClass(this.form.nativeElement, 'up')
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoginButtonLoading = true;
            const loginVo: LoginVo = this.loginForm.getRawValue();
            this.authService
                .signup(loginVo)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (response: unknown) => {
                        this.handleLogInResponse(response);
                    },
                    error: (error: any) => {
                        this.handleLogInError(error);
                    },
                });
        }
    }

    handleLogInResponse(response: unknown) {
        this.isLoginButtonLoading = false;
        const token = (response as AuthUserData).accessToken;
        localStorage.setItem('cur_token', token);
        this.router.navigate(['/user']).then(() => {
            this.ngOnDestroy();
        });
        return this.changeDetectorRef.detectChanges();
    }

    handleLogInError(error: any) {
        console.log(error);
        this.isLoginButtonLoading = false;
        this.changeDetectorRef.detectChanges();
    }

    reset() {
        this.loginForm?.reset();
    }

    getErrorMessage(formControl: FormControl) {
        return getControlErrorContent(formControl);
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
        this.loginForm = this.formBuilder.group({
            email: this.email,
            password: this.password,
        });
    }
}
