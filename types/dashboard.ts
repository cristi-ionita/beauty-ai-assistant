export type GeneratedPost = {
  caption: string;
  hashtags: string;
  cta: string;
};

export type UserPlan = "free" | "normal" | "pro";

export type Platform =
  | "Instagram"
  | "Facebook"
  | "TikTok"
  | "LinkedIn"
  | "Google Business Profile";

export type Tone =
  | "Friendly"
  | "Professional"
  | "Luxury"
  | "Bold"
  | "Funny"
  | "Elegant"
  | "Warm"
  | "Trustworthy"
  | "Premium"
  | "Casual"
  | "Local";

export type DashboardLoadingState =
  | "idle"
  | "loading"
  | "success"
  | "error";