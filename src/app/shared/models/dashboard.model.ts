export interface UserDashboardSummary {
    totalReviews: number;
    helpfulReactions: number;
    reputationScore: number;
    earnedBadges: number;
  }
  
  export interface AdminDashboardSummary {
    totalReviewsAnalyzed: number;
    flaggedReviews: number;
    moderatorDecisionsToday: number;
    activeUsers: number;
  }
  
  export interface BadgeRule {
    id: string;
    name: string;
    description: string;
    threshold: number;
    unit: string;
    enabled: boolean;
  }