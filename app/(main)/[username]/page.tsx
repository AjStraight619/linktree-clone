type LinkTreePageProps = {
  params: {
    username: string;
  };
};

// dynamic route to display a user's link tree

export default function LinkTreePage({ params }: LinkTreePageProps) {
  return (
    <main>
      <h1>Link Tree</h1>
    </main>
  );
}
