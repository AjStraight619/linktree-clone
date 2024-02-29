import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";

export const getUser = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
};
