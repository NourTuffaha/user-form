import ProfilePage from "@/components/profile-page";
import { getUserProfile } from "@/lib/api";

export default async function Page() {
  const userData = await getUserProfile("user-123");

  return <ProfilePage userData={userData} />;
}
