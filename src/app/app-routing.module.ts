import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/public/home/home.component';
import { HowItWorksComponent } from './features/public/how-it-works/how-it-works.component';
import { SignInComponent } from './features/public/sign-in/sign-in.component';
import { RegisterComponent } from './features/public/register/register.component';
import { SearchResultsComponent } from './features/public/search-results/search-results.component';
import { ProductReviewComponent } from './features/public/product-review/product-review.component';

import { UserLayoutComponent } from './core/layouts/user-layout/user-layout.component';
import { DashboardComponent } from './features/user/dashboard/dashboard.component';
import { SubmitReviewComponent } from './features/user/submit-review/submit-review.component';
import { ReviewHistoryComponent } from './features/user/review-history/review-history.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { UserSettingsComponent } from './features/user/settings/settings.component';
import { ViewProfileComponent } from './features/user/view-profile/view-profile.component';

import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { ReviewQueueComponent } from './features/admin/review-queue/review-queue.component';
import { ReportsComponent } from './features/admin/reports/reports.component';
import { UserManagementComponent } from './features/admin/user-management/user-management.component';
import { BadgeRulesComponent } from './features/admin/badge-rules/badge-rules.component';
import { PlatformSettingsComponent } from './features/admin/platform-settings/platform-settings.component';

import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'reviews/:id', component: ProductReviewComponent },

  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'submit-review', component: SubmitReviewComponent },
      { path: 'history', component: ReviewHistoryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: UserSettingsComponent },
      { path: 'explore', component: SearchResultsComponent },
      { path: 'view/:id', component: ViewProfileComponent }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'reviews', pathMatch: 'full' },
      { path: 'reviews', component: ReviewQueueComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'badges', component: BadgeRulesComponent },
      { path: 'explore', component: SearchResultsComponent },
      { path: 'settings', component: PlatformSettingsComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}