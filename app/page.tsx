import { checkIfUserExistsInDb, createUserInDb } from "@/actions/user-actions";
import CallToAction from "@/components/landing-page/call-to-action";
import { Header } from "@/components/landing-page/header";
import Hero from "@/components/landing-page/hero";
import Search from "@/components/landing-page/search";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";

// type HomeProps = {
//   searchParams: {
//     search: string;
//   };
// };

async function getUserFromAuth() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("user in main page", user);
  return user;
}

async function ensureUserInDb(user: KindeUser | null) {
  let dbUser = await checkIfUserExistsInDb(user?.id as string);
  if (!dbUser && user) {
    dbUser = await createUserInDb(user);
  }
  console.log("dbUser on main page: ", dbUser);
  return dbUser;
}

export default async function Home() {
  // let dbUser;
  const user = await getUserFromAuth();
  const dbUser = user ? await ensureUserInDb(user) : null;

  console.log("user in main page", user);
  console.log("db user in main page", dbUser);
  // dbUser = user ? await checkIfUserExistsInDb(user.id) : null;

  // if (!dbUser && user) {
  //   await createUserInDb(user);
  // }
  // console.log("dbUser on main page: ", dbUser);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-auto">
      <div className="flex flex-col items-center justify-start pt-24 w-full space-y-8">
        <Header dbUser={dbUser} />
        <Hero />
        {/* {(await isAuthenticated()) ? (
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
        )} */}

        <Suspense>
          <CallToAction />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Search />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {/* <LinkTreeSearchList searchParams={searchParams} /> */}
      </Suspense>
    </main>
  );
}
