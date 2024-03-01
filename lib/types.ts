import { getDbUserWithLinks } from "@/actions/user-actions";
import { Prisma } from "@prisma/client";

export type Icon = {
  icon: JSX.Element;
  name: string;
};

export type DbUserWithLinks = Prisma.PromiseReturnType<
  typeof getDbUserWithLinks
>;

export type UserLink = {
  id: string;
  title: string;
  url: string;
  icon?: React.ReactElement;
  pending?: boolean;
};

// Individual action types for the reducer function

type AddUserLinkAction = {
  type: "add";
  payload: UserLink | UserLink[];
};

type RemoveUserLinkAction = {
  type: "remove";
  payload: UserLink;
};

type UpdateUserLinkAction = {
  type: "update";
  payload: UserLink | UserLink[];
};

type PendingUserLinkAction = {
  type: "pending";
  payload: UserLink | UserLink[];
};

// Union type to encompass all action possibilities
export type UserLinkAction =
  | AddUserLinkAction
  | RemoveUserLinkAction
  | UpdateUserLinkAction
  | PendingUserLinkAction;
