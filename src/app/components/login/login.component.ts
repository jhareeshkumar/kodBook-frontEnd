import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //dependency injecting service
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  //injecting router 
  private router = inject(Router);

  //signals
  passwordVisibleSignal = signal(false);


  //signal methods
  togglePasswordVisibility() {
    this.passwordVisibleSignal.update((flipPasswordVisible) => !flipPasswordVisible);
  }

  //form related
  private formBuiler = inject(FormBuilder);
  loginFormGroup = this.formBuiler.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginFormGroup.get(fieldName);
    return !!(field?.hasError(errorType) && field.touched);
  }

  onLogin(): void {
    if (this.loginFormGroup.valid) {
      const credentials = this.loginFormGroup.value
      //handling post request
      this.authService.login(credentials).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, "Success");
          console.log("success Response", res);

          const user: User = res.data;

          //storing user data to signal
          this.authService.setUser(user);

          localStorage.setItem('userName', res.data.userName);

          //redirection after successfull login
          this.router.navigate(['/feed']);

        },
        error: (error: any) => {
          if (error.status == 0) {
            this.toastr.error("Please Try Aftersome Time?.", 'SERVER DOWN!');
            console.log("server Unavailable", error);
          } else {
            this.toastr.error("Please Try Again with valid credentials.", error.error.message);
            console.log("Error : ", error);

          }
        },
        complete() {
          console.log('Login Request has been processed.');
        }
      });
    }
    else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
