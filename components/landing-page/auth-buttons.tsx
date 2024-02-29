import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AuthButtons = () => (
  <div>
    <Button className="mr-4">
      <Link href="/api/auth/login">Sign In</Link>
    </Button>
    <Button>
      <Link href="api/auth/signin">Sign Up</Link>
    </Button>
  </div>
);
