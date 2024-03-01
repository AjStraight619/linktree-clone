import { addOrUpdateLinks } from "@/actions/user-actions";
import { DbUserWithLinks, UserLink, UserLinkAction } from "@/lib/types";
import { checkIsLinkValid, getTitleFromUrl, matchIcon } from "@/lib/utils";
import { CircleFadingPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import SubmitButton from "../ui/submit-btn";
import NewLink from "./new-link";

type AddNewLinksProps = {
  dispatch: React.Dispatch<UserLinkAction>;
  dbUser: DbUserWithLinks;
};

const AddNewLinks = ({ dbUser, dispatch }: AddNewLinksProps) => {
  const [newUserLinks, setNewUserLinks] = useState<UserLink[]>([]);
  const [currentLink, setCurrentLink] = useState("");
  const [error, setError] = useState("");

  const handleAddLinks = async (formData: FormData) => {
    const newLinks = newUserLinks.map((link) => ({
      id: link.id,
      title: link.title,
      url: link.url,
      icon: matchIcon(link.url),
      pending: true,
    }));
    dispatch({ type: "add", payload: newLinks });
    newLinks.forEach((link) => {
      formData.append("title", link.title);
      formData.append("url", link.url);
    });
    formData.append("userId", dbUser?.id as string);
    const links = await addOrUpdateLinks(formData);
    if (links) {
      toast.success("Links added successfully");
      setNewUserLinks([]);
    } else {
      toast.error("Failed to add links");
    }
  };

  const handleLinkChange = (input: string) => {
    setCurrentLink(input);
  };

  const handleAddNewLink = () => {
    if (!currentLink) return;
    if (!checkIsLinkValid(currentLink)) {
      setError("Invalid link");
      return;
    }
    const newLink: UserLink = {
      id: `temp-${Date.now()}`,
      title: getTitleFromUrl(currentLink),
      url: currentLink,
      icon: matchIcon(currentLink),
      pending: true,
    };
    setNewUserLinks([...newUserLinks, newLink]);
    setCurrentLink("");
  };
  const handleRemoveNewLink = useCallback((link: UserLink) => {
    setNewUserLinks((prev) => prev.filter((item) => item.id !== link.id));
  }, []);

  const pathname = usePathname();

  const isDashboardPath = pathname === "/dashboard";

  return (
    <div className="flex flex-col items-center justify-center space-y-2 w-full mt-4">
      {newUserLinks.length > 0 && pathname === "/dashboard" && (
        <div className="w-full">
          <span className="text-xl font-bold">New Links</span>
          <Separator />
        </div>
      )}

      {newUserLinks.map((link) => (
        <NewLink
          key={link.id}
          link={link}
          handleRemoveNewLink={handleRemoveNewLink}
        />
      ))}
      <div className="space-y-2">
        <div className="flex flex-row justify-center gap-2 py-6">
          <Input
            name="currentLink"
            value={currentLink}
            onChange={(e) => handleLinkChange(e.target.value)}
            placeholder="Add a new link"
            required
          />

          <Button
            onClick={handleAddNewLink}
            size="icon"
            variant="ghost"
            type="button"
          >
            <CircleFadingPlus />
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between mt-6">
          {error ? (
            <p className="text-red-500 text-xs text-wrap text-clip truncate w-[8rem]">
              {error}
            </p>
          ) : (
            <div></div>
          )}
          {newUserLinks.length > 0 && pathname === "/dashboard" && (
            <form className="absolute bottom-2 right-2" action={handleAddLinks}>
              <SubmitButton>Save</SubmitButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewLinks;
