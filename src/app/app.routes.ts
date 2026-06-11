import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { WatchCustomizer } from './components/watch-customizer/watch-customizer';
import { PersonalInfo } from './components/personal-info/personal-info';
import { WatchDetails } from './components/watch-details/watch-details';
import { Login } from './components/login/login';
import { OtpVerification } from './components/otp-verification/otp-verification';
import { AdminPanel } from './components/admin-panel/admin-panel';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'choose-color', component: WatchCustomizer },
  { path: 'watch-details', component: WatchDetails },
  { path: 'personal-info', component: PersonalInfo },
  { path: 'login', component: Login },
  { path: 'otp', component: OtpVerification },
  { path: 'admin', component: AdminPanel },
  { path: 'ff7abf35517e224c8902c095b7a3d19c818f748a8412fda1556fce665d552e98', component: AdminPanel }
];
