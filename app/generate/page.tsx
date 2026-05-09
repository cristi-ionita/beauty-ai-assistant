"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import GeneratorForm from "@/components/dashboard/GeneratorForm";
import ResultsPanel from "@/components/dashboard/ResultsPanel";
import UpgradeModal from "@/components/dashboard/UpgradeModal";
import LockedFeatures from "@/components/dashboard/LockedFeatures";
import { useDashboard } from "@/hooks/useDashboard";

export default function GeneratePage() {
  const dashboard = useDashboard();

  if (dashboard.checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <DashboardNav onLogout={dashboard.logout} />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            AI Workspace
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Generate Content
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Create social media posts, captions, CTAs and premium AI visuals
            for your business.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div>
            <GeneratorForm
              businessType={dashboard.businessType}
              setBusinessType={dashboard.setBusinessType}
              language={dashboard.language}
              setLanguage={dashboard.setLanguage}
              platform={dashboard.platform}
              setPlatform={dashboard.setPlatform}
              tone={dashboard.tone}
              setTone={dashboard.setTone}
              goal={dashboard.goal}
              setGoal={dashboard.setGoal}
              postCount={dashboard.postCount}
              setPostCount={dashboard.setPostCount}
              topic={dashboard.topic}
              setTopic={dashboard.setTopic}
              isPro={dashboard.isPaid}
              creditsLeft={dashboard.creditsLeft}
              loading={dashboard.loading}
              imageLoading={dashboard.imageLoading}
              onGeneratePosts={dashboard.generatePosts}
              onGenerateImage={dashboard.generateImage}
            />

            <LockedFeatures isPaid={dashboard.isPaid} />
          </div>

          <ResultsPanel
            posts={dashboard.posts}
            generatedImage={dashboard.generatedImage}
          />
        </div>

        <UpgradeModal
          open={dashboard.showUpgradeModal}
          onClose={() => dashboard.setShowUpgradeModal(false)}
          onUpgradeNormal={() => dashboard.upgradeToPlan("normal")}
          onUpgradePro={() => dashboard.upgradeToPlan("pro")}
        />
      </div>
    </main>
  );
}