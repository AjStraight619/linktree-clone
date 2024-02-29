import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1>Welcome back, {user?.given_name || "User"}</h1>
    </main>
  );
}
