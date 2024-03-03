import ProfileCard from "@/components/link-tree/profile-card";
import { prisma } from "@/prisma/prisma";

type LinkTreePageProps = {
  params: {
    username: string;
  };
};

// dynamic route to display a user's link tree

const getUserByUsername = async (username: string) => {
  const dbUser = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      links: true,
    },
  });

  return dbUser;
};

export default async function LinkTreePage({ params }: LinkTreePageProps) {
  const { username } = params;
  const dbUser = await getUserByUsername(username);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <ProfileCard dbUser={dbUser} />
    </main>
  );
}
