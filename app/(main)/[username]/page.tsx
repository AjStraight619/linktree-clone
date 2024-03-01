import { Card, CardHeader } from "@/components/ui/card";

type LinkTreePageProps = {
  params: {
    username: string;
  };
};

// dynamic route to display a user's link tree

export default function LinkTreePage({ params }: LinkTreePageProps) {
  const { username } = params;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <Card className="w-[24rem] dark:bg-gray-900">
        <CardHeader></CardHeader>
      </Card>
    </main>
  );
}
