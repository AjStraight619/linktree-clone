import Link from "next/link";

import {
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import BorderGradient from "../ui/background-gradient";
import { Button } from "../ui/button";

const CallToAction = async () => {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <>
      {(await isAuthenticated()) ? (
        <BorderGradient>
          <Button
            size="lg"
            className="bg-white text-black rounded-md font-semibold group hover:bg-white/90 transition-all hover:shadow-lg  duration-300"
          >
            <Link href="/dashboard">Dashboard</Link>
            <span className="group-hover:translate-x-2 group-hover:scale-105 ml-2 duration-300">
              <ArrowRight />
            </span>
          </Button>
        </BorderGradient>
      ) : (
        <BorderGradient>
          <Button
            size="lg"
            className="bg-white text-black rounded-md font-semibold group hover:bg-white/90 transition-all hover:shadow-lg  duration-300"
          >
            <RegisterLink href="/api/auth/login">Get Started</RegisterLink>
            <span className="group-hover:translate-x-2 group-hover:scale-105 ml-2 duration-300">
              <ArrowRight />
            </span>
          </Button>
        </BorderGradient>
      )}
    </>
  );
};

export default CallToAction;
