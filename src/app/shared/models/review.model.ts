export type ReviewStatus = 'PENDING' | 'PUBLISHED' | 'HIDDEN' | 'REMOVED';
export type AuthenticityStatus = 'PENDING' | 'VERIFIED' | 'NEEDS_REVIEW' | 'FLAGGED';

export interface Review {
  id: string;
  userId: string;
  author: string;
  productName: string;
  category: string;
  headline: string;
  ratingValue: number;
  reviewText: string;
  authenticityStatus: AuthenticityStatus;
  authenticityScore: number;
  credibilityScore: number;
  sentiment: string;
  helpfulVoteCount: number;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  productName: string;
  category?: string;
  headline: string;
  ratingValue: number;
  reviewText: string;
}

export interface Comment {
  id: string;
  reviewId: string;
  userId: string;
  commentText: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reviewId: string;
  reporterUserId: string;
  reason: string;
  status: 'OPEN' | 'REVIEWED' | 'DISMISSED';
  createdAt: string;
  updatedAt: string;
}