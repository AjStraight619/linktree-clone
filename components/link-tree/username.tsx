import { updateUsername } from "@/actions/user-actions";
import { User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import SubmitButton from "../ui/submit-btn";

type UsernameProps = {
  dbUser: User | null;
};

const Username = ({ dbUser }: UsernameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(dbUser?.username || "");

  const [error, setError] = useState("");

  const handleChange = (input: string) => {
    setUsername(input);
    setError("");
  };

  const handleUpdateUsername = async (formData: FormData) => {
    if (!username) {
      setError("Username cannot be empty");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (username.length > 20) {
      setError("Username must be at most 20 characters");
      return;
    }
    if (username === dbUser?.username) {
      return;
    }
    formData.append("username", username);
    formData.append("userId", dbUser?.id as string);
    const { success, error } = await updateUsername(formData);
    if (success) {
      setIsEditing(false);
      toast.success("Username updated successfully");
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className={`${!isEditing && "items-center"} inline-flex`}>
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
            <form action={handleUpdateUsername}>
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
    </div>
  );
};

export default Username;
