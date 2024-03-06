import {
  checkUsernameAvailability,
  getDbUserWithLinks,
} from "@/actions/user-actions";
import EditProfile from "@/components/profile-page/edit-profile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";

type ProfilePageProps = {
  searchParams: {
    username: string;
  };
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = user ? await getDbUserWithLinks(user.id) : null;
  let usernameAvailability;

  const username = searchParams.username;

  if (searchParams.username && searchParams.username.length >= 3) {
    usernameAvailability = await checkUsernameAvailability(
      searchParams.username,
      dbUser?.id
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-24">
      <Suspense>
        <EditProfile
          dbUser={dbUser}
          usernameAvailability={usernameAvailability}
          username={username}
        />
      </Suspense>
    </main>
  );
}
