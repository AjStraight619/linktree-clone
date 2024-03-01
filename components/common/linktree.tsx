"use client";
import { addOrUpdateLinks } from "@/actions/user-actions";
import Header from "@/components/dashboard-page/header";
import { icons } from "@/lib/data";
import { DbUserWithLinks, UserLink, UserLinkAction } from "@/lib/types";
import { getTitleFromUrl } from "@/lib/utils";
import { CircleFadingPlus, UserIcon, X } from "lucide-react";
import React, { useOptimistic, useState } from "react";
import RemoveLink from "../dashboard-page/remove-link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import SubmitButton from "../ui/submit-button";

type LinkTreeProps = {
  dbUser: DbUserWithLinks;
};

function reducer(state: UserLink[], action: UserLinkAction): UserLink[] {
  switch (action.type) {
    case "add":
      return Array.isArray(action.payload)
        ? [...state, ...action.payload]
        : [...state, action.payload];

    case "remove":
      return state.filter((link) => link.id !== action.payload.id);

    case "update":
      const updatePayloads = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return state.map((link) => {
        const payloadItem = updatePayloads.find((item) => item.id === link.id);
        return payloadItem ? { ...link, ...payloadItem } : link;
      });

    case "pending":
      const pendingPayloads = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return state.map((link) => {
        const payloadItem = pendingPayloads.find((item) => item.id === link.id);
        return payloadItem ? { ...link, pending: payloadItem.pending } : link;
      });

    default:
      return state;
  }
}

const LinkTree = ({ dbUser }: LinkTreeProps) => {
  const [newUserLinks, setNewUserLinks] = useState<UserLink[]>([]);
  const [currentLink, setCurrentLink] = useState("");
  const [error, setError] = useState("");

  const matchIcon = (url: string): React.ReactElement => {
    const domain = getTitleFromUrl(url).toLowerCase();
    return icons[domain as keyof typeof icons]?.icon || <UserIcon />;
  };

  const initialUserLinks = dbUser?.links?.map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    icon: matchIcon(link.url),
  }));

  const [optimisticUserLinks, dispatch] = useOptimistic(
    initialUserLinks ?? [],
    reducer
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLink(e.target.value);
  };

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
    await addOrUpdateLinks(formData);
  };

  const handleRemoveNewLink = (title: string) => {
    const newLinks = newUserLinks.filter((link) => link.title !== title);
    setNewUserLinks(newLinks);
  };

  const addNewLink = () => {
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

  const checkIsLinkValid = (link: string) => {
    return link.startsWith("http://") || link.startsWith("https://");
  };

  return (
    <Card className="w-[24rem] dark:bg-gray-900">
      <CardHeader className="w-full">
        <Header dbUser={dbUser} />
      </CardHeader>
      <form action={handleAddLinks}>
        <CardContent>
          <ul className="flex flex-col items-center gap-4">
            {optimisticUserLinks.map((link) => (
              <li
                className="flex items-center justify-between p-2 rounded-xl shadow-md w-full"
                key={link.id}
              >
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <>
                    <div className="inline-flex gap-2">
                      <span>{link.icon}</span>
                      <span>{link.title}</span>
                    </div>
                  </>
                </a>

                <span>
                  <RemoveLink link={link} dispatch={dispatch} />
                </span>
              </li>
            ))}
            {newUserLinks.length > 0 && (
              <div className="w-full flex flex-col">
                <span>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">
                    New Links
                  </h3>
                </span>
                <Separator />
              </div>
            )}
            {newUserLinks.map((link) => (
              <li
                className="flex items-center justify-between p-2 rounded-xl shadow-md w-full"
                key={link.id}
              >
                <div className="inline-flex gap-2">
                  <span>{link.icon}</span>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={() => handleRemoveNewLink(link.title)}
                >
                  <X size={20} />
                </Button>
              </li>
            ))}
            <div className="flex items-end justify-end gap-2">
              <Input
                type="url"
                placeholder="Add a link"
                value={currentLink}
                onChange={handleChange}
              />
              <Button
                size="icon"
                type="button"
                variant="ghost"
                className="rounded-full"
                onClick={addNewLink}
              >
                <CircleFadingPlus />
              </Button>
            </div>
          </ul>
        </CardContent>
        <CardFooter className="justify-end">
          {newUserLinks.length > 0 && (
            <SubmitButton
              props={{
                type: "submit",
                children: newUserLinks.length === 1 ? "Add Link" : "Add Links",
              }}
            />
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default LinkTree;
