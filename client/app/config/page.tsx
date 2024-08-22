import { ConfigForm } from "@/components/ConfigForm";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();

  if (session?.user.complete) redirect("/");

  return (
    <main className="w-full flex flex-col flex-grow p-12 bg-slate-100 rounded-md">
      <ConfigForm type={session?.user.type as string} />
    </main>
  );
};

export default page;
