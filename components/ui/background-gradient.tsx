import { cn } from "@/lib/utils";
import React from "react";

type BorderGradientProps = {
  children: React.ReactNode;
  className?: string;
};

const BorderGradient = ({ children, className }: BorderGradientProps) => {
  return (
    <div
      className={cn(
        "p-[1px] bg-gradient-to-tr from-amber-500 to-fuchsia-600 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BorderGradient;
