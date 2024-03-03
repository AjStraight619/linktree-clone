import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import LinkTreeList from "./link-tree-list";

type LinkTreeSearchListProps = {
  searchParams: {
    search: string;
  };
};

const getDbUsersByUsername = async (username: string) => {
  const dbUsers = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
    include: {
      links: true,
    },
  });

  return dbUsers;
};

const LinkTreeSearchList = async ({
  searchParams,
}: LinkTreeSearchListProps) => {
  const search = searchParams.search || "";

  let dbUsers: Prisma.PromiseReturnType<typeof getDbUsersByUsername> = [];

  if (search.trim()) {
    dbUsers = await getDbUsersByUsername(search);
  }

  return (
    <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-2">
      {dbUsers.map((dbUser) => (
        <LinkTreeList key={dbUser.id} dbUser={dbUser} />
      ))}
    </div>
  );
};

export default LinkTreeSearchList;
