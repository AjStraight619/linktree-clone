import { AuthButtons } from "@/components/landing-page/auth-buttons";
import { Header } from "@/components/landing-page/header";
import Search from "@/components/landing-page/search";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";

type HomeProps = {
  searchParams: {
    search: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  // checking if we are getting the search params from the url

  console.log(searchParams?.search);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-0 flex flex-col items-center justify-start pt-24">
        <Header />
        <AuthButtons />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
    </main>
  );
}
