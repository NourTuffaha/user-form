// import { Suspense } from "react";
// import LoadingSkeleton from "./loading-skeleton";
import ProfileForm from "./profile-form";
import type { UserProfile } from "@/lib/interfaces/user";

interface ProfilePageProps {
  userData: UserProfile;
}

export default function ProfilePage({ userData }: ProfilePageProps) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ProfileForm initialData={userData} />
      </div>
    </main>
  );
}
