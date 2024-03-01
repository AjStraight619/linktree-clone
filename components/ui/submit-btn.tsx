import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";

type SubmitButtonProps = {
  variant?: ButtonProps["variant"];
  children: React.ReactNode;
  type?: ButtonProps["type"];
  size?: ButtonProps["size"];
  classes?: string;
};
const SubmitButton = ({
  variant,
  children,
  type,
  size,
  classes,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={cn(classes)}>
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export default SubmitButton;
