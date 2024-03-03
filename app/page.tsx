import { checkIfUserExistsInDb, createUserInDb } from "@/actions/user-actions";
import { AuthButtons } from "@/components/landing-page/auth-buttons";
import { Header } from "@/components/landing-page/header";
import LinkTreeSearchList from "@/components/landing-page/link-tree-search";
import Search from "@/components/landing-page/search";
import UserAvatar from "@/components/landing-page/user-avatar";
import { Button } from "@/components/ui/button";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";

type HomeProps = {
  searchParams: {
    search: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  let dbUser;
  const { getUser, isAuthenticated } = getKindeServerSession();

  const user = await getUser();
  dbUser = user ? await checkIfUserExistsInDb(user.id) : null;
  console.log("dbUser", dbUser);
  if (!dbUser && user) {
    await createUserInDb(user);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-auto">
      <div className="flex flex-col items-center justify-start pt-24 w-full space-y-8">
        <Header />
        {(await isAuthenticated()) ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-bold text-center mt-4">
              Welcome, {user?.given_name}
            </h1>
            <Button>
              <LogoutLink>Log Out</LogoutLink>
            </Button>
          </div>
        ) : (
          <AuthButtons />
        )}

        <Suspense fallback={<div>Loading...</div>}>
          <Search />
        </Suspense>
      </div>
      <UserAvatar dbUser={dbUser} />
      <Suspense fallback={<div>Loading...</div>}>
        <LinkTreeSearchList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
