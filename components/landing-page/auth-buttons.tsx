"use client";

import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export const AuthButtons = () => (
  <div>
    <Button className="mr-4">
      <LoginLink>Sign In</LoginLink>
    </Button>
    <Button>
      <RegisterLink>Sign Up</RegisterLink>
    </Button>
  </div>
);
