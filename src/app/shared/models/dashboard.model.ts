import { User } from './auth.model';
import { Review } from './review.model';

export interface EarnedBadge {
  id: string;
  name: string;
  description: string;
  awardedAt: string;
}

export interface UserDashboardSummary {
  user: User;
  reviewCount: number;
  helpfulReactions: number;
  reputationScore: number;
  badgeCount: number;
  badges: EarnedBadge[];
  reviews: Review[];
}

export interface AdminDashboardSummary {
  totalUsers: number;
  totalReviews: number;
  publishedReviews: number;
  pendingReviews: number;
  openReports: number;
}

export interface SystemBadge {
  id: string;
  badgeName: string;
  description: string;
  earningCriteria: string;
}