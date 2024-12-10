import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { FeedComponent } from './components/feed/feed.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'feed', component: FeedComponent, canActivate: [authGuard] },
    {
        path: 'profile', children: [
            { path: '', component: ProfileComponent, canActivate: [authGuard] },// Logged-in user's profile
            { path: ':username', component: PublicProfileComponent },// Public profile
        ]
    },
    { path: '**', component: ErrorComponent },
];
