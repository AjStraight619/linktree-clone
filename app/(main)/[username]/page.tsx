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
      <h1>Individual link tree in dynamic route {username}</h1>
    </main>
  );
}
