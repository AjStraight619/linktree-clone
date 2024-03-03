import { getDbUserWithLinks } from "@/actions/user-actions";
import ProfileCard from "@/components/profile-page/profile-card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = user ? await getDbUserWithLinks(user.id) : null;

  // const handleAction = async (formData: FormData) => {

  //   formData.append("userId", dbUser?.id as string);
  //   const actionResponse = await editProfile(formData);
  //   console.log("actionResponse", actionResponse);
  // };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-24">
      <ProfileCard dbUser={dbUser} />
      {/* <Card className="min-w-[24rem] dark:bg-gray-950 shadow-lg relative">
        <CardHeader>
          <CardTitle className="text-center">Edit Profile</CardTitle>
        </CardHeader>

        <form action={handleAction}>
          <CardContent className="flex flex-col space-y-2">
            <FileUpload dbUser={dbUser} />

            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              required
              defaultValue={dbUser?.name}
              placeholder="Enter your name"
            />

            <Label htmlFor="username">Username</Label>
            <Input
              required
              name="username"
              defaultValue={dbUser?.username ?? ""}
              placeholder="Enter a user name"
              minLength={3}
              maxLength={20}
            />
            <Bio dbUser={dbUser} />
          </CardContent>

          <CardFooter className="justify-between">
            <Link
              className="inline-flex gap-1 items-center group transition-all hover:opacity-75"
              href="/dashboard"
            >
              <ChevronLeftIcon className="transition-transform group-hover:-translate-x-1" />
              <span className="transition-opacity group-hover:opacity-75">
                Dashboard
              </span>
            </Link>
            <SubmitButton className="dark:bg-gray-900 bg-gray-50 shadow-lg text-black dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900">
              Save Changes
            </SubmitButton>
          </CardFooter>
        </form>
      </Card> */}
    </main>
  );
}
