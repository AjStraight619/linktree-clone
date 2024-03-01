import { User } from "@prisma/client";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SubmitButton from "../ui/submit-btn";

type UsernameProps = {
  dbUser: User | null;
};

const Username = ({ dbUser }: UsernameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(dbUser?.username || "");
  const [error, setError] = useState("This is an error");
  const handleChange = (input: string) => {
    setUsername(input);
    setError("");
  };

  const updateUsername = async (formData: FormData) => {
    formData.append("username", username);
    formData.append("userId", dbUser?.id as string);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className={`${!isEditing && "items-center"} inline-flex gap-1`}>
      {isEditing ? (
        <div className="space-y-2">
          <Input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => handleChange(e.target.value)}
          />
          <div className="flex items-start justify-between">
            {error ? (
              <p className="text-red-500 text-xs text-wrap text-clip truncate w-[8rem]">
                {error}
              </p>
            ) : (
              <div></div>
            )}
            <form className="" action={updateUsername}>
              <SubmitButton>Save</SubmitButton>
            </form>
          </div>
        </div>
      ) : (
        <Link
          className="hover:text-primary text-primary/70 hover:underline"
          href={`/${dbUser?.username}`}
        >
          {"@" + dbUser?.username}
        </Link>
      )}

      <Button
        className="hover:text-primary text-primary/70"
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil size={20} />
      </Button>
    </div>
  );
};

export default Username;
