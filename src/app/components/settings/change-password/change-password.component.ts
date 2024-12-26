import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private toast = inject(ToastrService);
  private userService = inject(UserService);
  private router = inject(Router);
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;

  changePasswordForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required]
  });

  private changePassword: {
    currentPassword: '',
    newPassword: ''
  } = this.changePasswordForm.value;


  toggleCurrentPasswordVisiblity() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  toggleNewPasswordVisiblity() {
    this.showNewPassword = !this.showNewPassword;
  }



  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.changePassword = this.changePasswordForm.value;
      this.userService.changePassword(this.changePassword.currentPassword, this.changePassword.newPassword).subscribe({
        next: (res: any) => {
          this.toast.success(res.message, "Success!");
          this.onPasswordChange();
        },
        error: (error) => {
          if (error.status === 0) {
            this.toast.error("Please Try Again Later", "Server Down!");
          }
          else {
            this.toast.warning(error.error.message, "Warning!");
          }

        },
        complete() {
          console.log("change password request processed.")
        },
      }
      );
    }
  }

  onPasswordChange() {
    localStorage.removeItem('Authorization')
    this.toast.warning("Please Login Again with Updated Credentials!.", "Login Required!");
    this.router.navigateByUrl('/login');
  }


}
