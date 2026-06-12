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
  { path: 'e642a58d60a1cd6390d382feebef6855', component: AdminPanel }
];
