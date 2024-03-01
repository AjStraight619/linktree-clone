import { getDbUserWithLinks } from "@/actions/user-actions";
import ProfileCard from "@/components/link-tree/profile-card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = user ? await getDbUserWithLinks(user.id) : null;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-24">
      <ProfileCard dbUser={dbUser} />
    </main>
  );
}
