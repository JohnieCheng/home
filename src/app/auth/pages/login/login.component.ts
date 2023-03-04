import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    Renderer2,
    ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Subject} from "rxjs";
import {ValidationService} from "../../../shared/service/validation.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements AfterViewInit, OnDestroy {
    loginForm!: FormGroup;
    email!: FormControl;
    password!: FormControl;
    isLoginButtonLoading: boolean;
    window: Window;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private renderer: Renderer2
    ) {
        this.window = document.defaultView as Window;
        this.isLoginButtonLoading = false;
        this.buildForm();
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

    getErrorMessage(formControl: FormControl) {
        if (formControl.hasError('required')) {
            return 'You must enter a value';
        }
        if (formControl.hasError('email')) {
            return 'Not a valid email';
        }
        if (formControl.hasError('password')) {
            return 'Not a valid password';
        }
        return '';
    }

    onSubmit() {
        console.log(this.window);
    }

    reset() {
        this.loginForm?.reset();
    }


    @ViewChild('addButton')
    private animateThis!: ElementRef;

    addBtn() {
        const button = this.renderer.createElement('button');
        const buttonText = this.renderer.createText('This is a button');
        this.renderer.appendChild(button, buttonText);
        this.renderer.appendChild(this.animateThis.nativeElement, button);
    }

    ngAfterViewInit() {
        this.renderer.addClass(document.body, 'bg-linear');
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'bg-linear');
    }
}
