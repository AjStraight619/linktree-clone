// "use client";

// import { updateUsername } from "@/actions/user-actions";
// import { User } from "@prisma/client";
// import { Pencil } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import SubmitButton from "../ui/submit-button";

// type HeaderProps = {
//   dbUser: User | null;
// };

// const Header = ({ dbUser }: HeaderProps) => {
//   const [username, setUsername] = useState(dbUser?.username || "");
//   const [isEditing, setIsEditing] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isEditing) {
//       inputRef.current?.focus();
//     }
//   }, [isEditing]);

//   const handleEditUsername = () => {
//     setIsEditing((prev) => !prev);
//     setError("");
//   };

//   const handleUpdateUsername = async (formData: FormData) => {
//     if (username === dbUser?.username) {
//       setError("Username is the same");
//       return;
//     }
//     formData.append("username", username);
//     formData.append("userId", dbUser?.id as string);
//     setError("");
//     await updateUsername(formData);
//   };

//   const handleChange = (username: string) => {
//     validateUsername(username);
//     setUsername(username);
//   };

//   const validateUsername = (username: string) => {
//     if (username === dbUser?.username) {
//       setError("Username is the same");
//       setUsername((dbUser?.username as string) || "");
//       return;
//     }

//     if (username.length < 3 && username.length > 0) {
//       setError("Must be at least 3 characters long");
//       setUsername((dbUser?.username as string) || "");
//       return;
//     } else {
//       setError("");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center gap-2">
//       <Image
//         src="/headshot.jpg"
//         alt="user avatar"
//         className="rounded-full"
//         width={80}
//         height={80}
//       />

//       <form action={handleUpdateUsername}>
//         <div className="flex flex-col gap-1">
//           <h1 className="text-2xl font-semibold"> {dbUser?.name || "User"}</h1>
//           <div className="flex gap-2 items-center">
//             {!isEditing && username && (
//               <Link
//                 className="hover:text-primary text-primary/70"
//                 href={`/${username}`}
//               >
//                 {"@" + username}
//               </Link>
//             )}
//             <Input
//               ref={inputRef}
//               onChange={(e) => handleChange(e.target.value)}
//               defaultValue={username}
//               className={`${isEditing ? "block" : "hidden"} h-8`}
//               placeholder="Set a username"
//               minLength={3}
//             />

//             <Button
//               type="button"
//               size="icon"
//               variant="ghost"
//               onClick={handleEditUsername}
//             >
//               <Pencil size={20} />
//             </Button>
//           </div>
//           <div className="flex items-center gap-2 w-full">
//             <SubmitButton
//               props={{
//                 children: "Save",
//                 size: "sm",
//                 className: `${
//                   isEditing ? "block" : "hidden"
//                 } justify-self-end   `,
//               }}
//             />
//             {error && (
//               <p className="text-red-500 text-xs break-words">{error}</p>
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Header;
