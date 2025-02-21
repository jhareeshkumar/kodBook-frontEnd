import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  private formBuilder = inject(FormBuilder);
  updateProfileForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    bio: ['', Validators.required],
    city: ['', Validators.required],
    college: ['', Validators.required],
    linkedIn: ['', Validators.required],
    gitHub: ['', Validators.required]
  })

  onUpdateProfile() {
    console.log(this.updateProfileForm.value);
  }

  hasError(controlName: string, errorName: string) {
    if (this.updateProfileForm.invalid && this.updateProfileForm.touched) {
      return this.updateProfileForm.getError(errorName, controlName);
    }
  }
}
