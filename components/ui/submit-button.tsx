import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";

type SubmitButtonProps = {
  props?: ButtonProps;
};

const SubmitButton = ({ props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props}>
      {pending ? <Loader2 className="animate-spin" /> : props?.children}
    </Button>
  );
};

export default SubmitButton;
