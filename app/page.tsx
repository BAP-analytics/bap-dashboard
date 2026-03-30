import { getDashboardData } from "@/lib/data";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { MemberBreakdown } from "@/components/dashboard/member-breakdown";
import { SurvivalCurve } from "@/components/dashboard/survival-curve";
import { ChurnByMonth } from "@/components/dashboard/churn-by-month";
import { EngagementDist } from "@/components/dashboard/engagement-dist";
import { ChurnBySource } from "@/components/dashboard/churn-by-source";
import { PriceTierAnalysis } from "@/components/dashboard/price-tier-analysis";
import { MLPredictions } from "@/components/dashboard/ml-predictions";
import { CohortTable } from "@/components/dashboard/cohort-table";
import { RiskTable } from "@/components/dashboard/risk-table";
import { ZombiesTable } from "@/components/dashboard/zombies-table";
import { TopEngagedTable } from "@/components/dashboard/top-engaged-table";
import { FreeUpsellTable } from "@/components/dashboard/free-upsell-table";
import { Section } from "@/components/dashboard/section";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const data = getDashboardData();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-white">
              <span className="text-sm font-bold text-black">B</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                BAP Analytics
              </h1>
              <p className="text-[10px] text-gray-500">
                Community Intelligence Dashboard
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Last updated</p>
            <p className="text-xs font-medium text-gray-300">
              {data.updated_at}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6">
        {/* KPI Cards */}
        <KPICards cards={data.cards} />

        <Separator className="border-zinc-800/50" />

        {/* Charts Row 1: Member Breakdown + Survival Curve */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Section title="Member Breakdown" subtitle="Active vs churned distribution">
            <MemberBreakdown breakdown={data.breakdown} />
          </Section>
          <Section
            title="Survival Curve"
            subtitle={
              data.survival.median
                ? `Median survival: ${data.survival.median} days`
                : "Median survival: >120 days"
            }
          >
            <SurvivalCurve survival={data.survival} />
          </Section>
        </div>

        {/* Charts Row 2: Churn by Month + Engagement */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Section title="Churn by Month" subtitle="Monthly churn volume">
            <ChurnByMonth churnMonths={data.churn_months} />
          </Section>
          <Section
            title="Engagement Distribution"
            subtitle="Paying members by 30-day activity level"
          >
            <EngagementDist engagementDist={data.engagement_dist} />
          </Section>
        </div>

        {/* Churn by Source */}
        <Section
          title="Churn by Acquisition Source"
          subtitle="Acquisition channels ranked by volume, colored by churn rate"
        >
          <ChurnBySource churnBySource={data.churn_by_source} />
        </Section>

        {/* Price Tier Analysis */}
        <Section
          title="Price Tier Analysis"
          subtitle="Member count (bars) and churn rate (line) by price tier"
        >
          <PriceTierAnalysis priceAnalysis={data.price_analysis} />
        </Section>

        <Separator className="border-zinc-800/50" />

        {/* ML Predictions Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            ML Churn Predictions
          </h2>
          <MLPredictions mlData={data.ml_data} />
        </div>

        <Separator className="border-zinc-800/50" />

        {/* Cohort Retention Table */}
        <Section
          title="Cohort Retention"
          subtitle="Retention rates by join month (paying members only)"
        >
          <CohortTable cohorts={data.cohorts} />
        </Section>

        {/* Paying Member Risk Table */}
        <Section
          title="Paying Member Risk Table"
          subtitle="All paying members ranked by ML churn probability. Click headers to sort."
        >
          <RiskTable riskTable={data.risk_table} />
        </Section>

        {/* Paying Zombies */}
        <Section
          title="Paying Zombies"
          subtitle="Paying members inactive 14+ days — high churn risk"
        >
          <ZombiesTable zombies={data.zombies} />
        </Section>

        {/* Top Engaged */}
        <Section
          title="Top Engaged Members"
          subtitle="Most active members across all time"
        >
          <TopEngagedTable topEngaged={data.top_engaged} />
        </Section>

        {/* Free Upsell Candidates */}
        <Section
          title="Free Upsell Candidates"
          subtitle="Highly engaged free members — best conversion targets"
        >
          <FreeUpsellTable freeUpsell={data.free_upsell} />
        </Section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/50 py-6 text-center text-xs text-zinc-600">
          BAP Analytics Dashboard — Powered by ML churn predictions
        </footer>
      </main>
    </div>
  );
}
