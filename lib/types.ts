export interface Cards {
  real_mrr: number;
  at_risk_mrr: number;
  lost_mrr: number;
  arr: number;
  paying_active: number;
  free_active: number;
  cancelling: number;
  churned: number;
  total_active: number;
}

export interface SurvivalData {
  checkpoints: number[];
  survival: number[];
  median: number | null;
}

export interface SourceStat {
  total: number;
  churned: number;
  rate: number;
}

export interface Cohort {
  month: string;
  total: number;
  active: number;
  churned: number;
  retention: number;
}

export interface RiskTableRow {
  name: string;
  price: number;
  risk_tier: string;
  churn_pct: number | null;
  tenure: number;
  inactive_days: number;
  week_actions: number;
  cum_actions: number;
  actions_30d: number;
}

export interface Zombie {
  name: string;
  price: number;
  inactive_days: number;
  total_actions: number;
}

export interface TopEngaged {
  name: string;
  total_actions: number;
  last30d: number;
  paying: boolean;
  price: number;
}

export interface FreeUpsell {
  name: string;
  total_actions: number;
  last30d: number;
  posts: number;
  streak: number;
}

export interface PriceTier {
  count: number;
  churned: number;
  rate: number;
}

export interface MLTier {
  count: number;
  revenue: number;
}

export interface FeatureImportance {
  feature: string;
  value: number;
}

export interface MLData {
  tiers: Record<string, MLTier>;
  expected_loss: number;
  model_auc: number;
  feature_importance: FeatureImportance[];
}

export interface DashboardData {
  cards: Cards;
  breakdown: Record<string, number>;
  survival: SurvivalData;
  churn_months: Record<string, number>;
  churn_by_source: Record<string, SourceStat>;
  cohorts: Cohort[];
  engagement_dist: Record<string, number>;
  risk_table: RiskTableRow[];
  zombies: Zombie[];
  top_engaged: TopEngaged[];
  free_upsell: FreeUpsell[];
  price_analysis: Record<string, PriceTier>;
  ml_data: MLData;
  updated_at: string;
}
