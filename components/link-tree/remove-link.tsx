import { removeLink } from "@/actions/user-actions";
import { UserLink, UserLinkAction } from "@/lib/types";
import { X } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import SubmitButton from "../ui/submit-button";

type RemoveLinkProps = {
  link: UserLink;
  dispatch: React.Dispatch<UserLinkAction>;
};

const RemoveLink = ({ link, dispatch }: RemoveLinkProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" size="icon" variant="ghost">
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          action={async (formData) => {
            formData.append("linkId", link.id);
            dispatch({ type: "remove", payload: link });
            const { success, error } = await removeLink(formData);
            if (success) {
              toast.success("Link removed");
            } else {
              toast.error(error);
            }
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Link</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the link from your profile
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p>Are you absolute sure?</p>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button className="text-primary" type="button">
                Cancel
              </Button>
            </AlertDialogCancel>
            <SubmitButton
              props={{
                children: "Delete",
                type: "submit",
                variant: "destructive",
              }}
            />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveLink;
