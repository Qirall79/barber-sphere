"use client";

import { removeSession } from "@/lib/actions";
import { signOutFirebase } from "@/lib/firebase";
import { revalidate } from "@/lib/revalidate";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const SignOut = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    await signOutFirebase();
    await removeSession();
    revalidate("/auth");
    router.push("/auth");
  };

  return (
    <>
      <p color="danger" className="text-pink-600" onClick={handleLogOut}>
        Log Out
      </p>
    </>
  );
};
