import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { WatchCustomizer } from './components/watch-customizer/watch-customizer';
import { PersonalInfo } from './components/personal-info/personal-info';
import { WatchDetails } from './components/watch-details/watch-details';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'choose-color', component: WatchCustomizer },
  { path: 'watch-details', component: WatchDetails },
  { path: 'personal-info', component: PersonalInfo }
];
