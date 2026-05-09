import type { Dispatch, SetStateAction } from "react";
import type { GeneratedPost } from "@/types/dashboard";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GeneratorForm from "@/components/dashboard/GeneratorForm";
import ResultsPanel from "@/components/dashboard/ResultsPanel";
import UpgradeModal from "@/components/dashboard/UpgradeModal";
import LockedFeatures from "@/components/dashboard/LockedFeatures";
import ImageHistory from "@/components/dashboard/ImageHistory";

type DashboardContentProps = {
  businessType: string;
  setBusinessType: Dispatch<SetStateAction<string>>;

  topic: string;
  setTopic: Dispatch<SetStateAction<string>>;

  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;

  platform: string;
  setPlatform: Dispatch<SetStateAction<string>>;

  tone: string;
  setTone: Dispatch<SetStateAction<string>>;

  goal: string;
  setGoal: Dispatch<SetStateAction<string>>;

  postCount: number;
  setPostCount: Dispatch<SetStateAction<number>>;

  posts: GeneratedPost[];
  generatedImage: string | null;

  loading: boolean;
  imageLoading: boolean;
  checkingAuth: boolean;

  creditsLeft: number | null;
  imageCreditsLeft: number | null;
  plan: string | null;

  showUpgradeModal: boolean;
  setShowUpgradeModal: Dispatch<SetStateAction<boolean>>;

  imageHistoryVersion: number;

  isPaid: boolean;

  generatePosts: () => void;
  generateImage: () => void;

  upgradeToPlan: (planType: "normal" | "pro") => void;
  manageSubscription: () => void;
  logout: () => void;
};

export default function DashboardContent({
  businessType,
  setBusinessType,

  topic,
  setTopic,

  language,
  setLanguage,

  platform,
  setPlatform,

  tone,
  setTone,

  goal,
  setGoal,

  postCount,
  setPostCount,

  posts,
  generatedImage,

  loading,
  imageLoading,
  checkingAuth,

  creditsLeft,
  imageCreditsLeft,
  plan,

  showUpgradeModal,
  setShowUpgradeModal,

  imageHistoryVersion,

  isPaid,

  generatePosts,
  generateImage,

  upgradeToPlan,
  manageSubscription,
  logout,
}: DashboardContentProps) {
  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <DashboardHeader
          plan={plan}
          creditsLeft={creditsLeft}
          imageCreditsLeft={imageCreditsLeft}
          onUpgradeNormal={() => upgradeToPlan("normal")}
          onUpgradePro={() => upgradeToPlan("pro")}
          onManageSubscription={manageSubscription}
          onLogout={logout}
        />

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div>
            <GeneratorForm
              businessType={businessType}
              setBusinessType={setBusinessType}
              language={language}
              setLanguage={setLanguage}
              platform={platform}
              setPlatform={setPlatform}
              tone={tone}
              setTone={setTone}
              goal={goal}
              setGoal={setGoal}
              postCount={postCount}
              setPostCount={setPostCount}
              topic={topic}
              setTopic={setTopic}
              isPro={isPaid}
              creditsLeft={creditsLeft}
              loading={loading}
              imageLoading={imageLoading}
              onGeneratePosts={generatePosts}
              onGenerateImage={generateImage}
            />

            <LockedFeatures isPaid={isPaid} />
          </div>

          <div className="space-y-8">
            <ResultsPanel
              posts={posts}
              generatedImage={generatedImage}
            />

            <ImageHistory refreshKey={imageHistoryVersion} />
          </div>
        </div>

        <UpgradeModal
          open={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onUpgradeNormal={() => upgradeToPlan("normal")}
          onUpgradePro={() => upgradeToPlan("pro")}
        />
      </div>
    </main>
  );
}