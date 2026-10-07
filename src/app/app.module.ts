import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './core/layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './features/public/home/home.component';
import { HowItWorksComponent } from './features/public/how-it-works/how-it-works.component';
import { SearchResultsComponent } from './features/public/search-results/search-results.component';
import { ProductReviewComponent } from './features/public/product-review/product-review.component';
import { SignInComponent } from './features/public/sign-in/sign-in.component';
import { RegisterComponent } from './features/public/register/register.component';
import { DashboardComponent } from './features/user/dashboard/dashboard.component';
import { SubmitReviewComponent } from './features/user/submit-review/submit-review.component';
import { ReviewHistoryComponent } from './features/user/review-history/review-history.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { ViewProfileComponent } from './features/user/view-profile/view-profile.component';
import { ReviewQueueComponent } from './features/admin/review-queue/review-queue.component';
import { BadgeRulesComponent } from './features/admin/badge-rules/badge-rules.component';
import { SiteHeaderComponent } from './shared/components/site-header/site-header.component';
import { SiteFooterComponent } from './shared/components/site-footer/site-footer.component';
import { UserSidebarComponent } from './shared/components/user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from './shared/components/admin-sidebar/admin-sidebar.component';
import { ReviewCardComponent } from './shared/components/review-card/review-card.component';
import { RatingStarsComponent } from './shared/components/rating-stars/rating-stars.component';
import { CredibilityBadgeComponent } from './shared/components/credibility-badge/credibility-badge.component';
import { StatCardComponent } from './shared/components/stat-card/stat-card.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    HomeComponent,
    HowItWorksComponent,
    SearchResultsComponent,
    ProductReviewComponent,
    SignInComponent,
    RegisterComponent,
    DashboardComponent,
    SubmitReviewComponent,
    ReviewHistoryComponent,
    ProfileComponent,
    ViewProfileComponent,
    ReviewQueueComponent,
    BadgeRulesComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    UserSidebarComponent,
    AdminSidebarComponent,
    ReviewCardComponent,
    RatingStarsComponent,
    CredibilityBadgeComponent,
    StatCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
