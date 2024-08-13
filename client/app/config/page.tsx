import { ConfigForm } from "@/components/ConfigForm";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  
  if (session?.user.complete) redirect("/");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConfigForm type={session?.user.type as string} />
    </main>
  );
};

export default page;
