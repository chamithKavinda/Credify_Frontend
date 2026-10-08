export type ReviewStatus = 'PENDING' | 'ANALYZING' | 'PUBLISHED' | 'CHANGES_REQUESTED' | 'REMOVED';

export interface Review {
  id: string;
  productId: string;
  productName: string;
  reviewerId: string;
  reviewerName: string;
  title: string;
  body: string;
  rating: number;
  credibilityScore: number;
  status: ReviewStatus;
  createdAt: string;
  helpfulCount: number;
  purchaseVerified: boolean;
}

export interface CreateReviewRequest {
  productId: string;
  title: string;
  body: string;
  rating: number;
  usageDuration: string;
  purchaseProofUrl?: string;
}

export interface ModerationDecision {
  decision: 'APPROVE' | 'REMOVE' | 'REQUEST_CHANGES';
  reason: string;
  notes?: string;
}