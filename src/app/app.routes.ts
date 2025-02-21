import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { ErrorComponent } from './features/error/error.component';
import { FeedComponent } from './features/feed/feed.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './features/user/components/profile/profile.component';
import { PublicProfileComponent } from './features/user/components/public-profile/public-profile.component';
import { SettingsComponent } from './features/user/components/settings/settings.component';
import { ChangePasswordComponent } from './features/user/components/settings/change-password/change-password.component';
import { EditProfileComponent } from './features/user/components/edit-profile/edit-profile.component';
import { OtpInputComponent } from './shared/ui/otp-input/otp-input.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'feed', component: FeedComponent, canActivate: [authGuard] },
    {
        path: 'profile',
        children: [
            { path: '', component: ProfileComponent, canActivate: [authGuard] },// Logged-in user's profile
            { path: ':username', component: PublicProfileComponent },// Public profile
        ]
    },
    {
        path: 'settings', component: SettingsComponent, canActivate: [authGuard],
        children: [
            { path: 'edit-profile', component: EditProfileComponent },
            { path: 'change-password', component: ChangePasswordComponent },

        ]
    },
    { path: 'otp-input', component: OtpInputComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: ErrorComponent },
];
