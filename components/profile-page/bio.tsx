import { User } from "@prisma/client";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type BioProps = {
  dbUser: User | null;
};

const Bio = ({ dbUser }: BioProps) => {
  return (
    <>
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        name="bio"
        defaultValue={dbUser?.bio ?? ""}
        className="resize-none"
        maxLength={50}
      />
    </>
  );
};

export default Bio;
