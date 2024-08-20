import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session?.user.complete) redirect("/config");

  return (
    <main className="w-full flex flex-col flex-grow p-12 bg-slate-100  rounded-md">
      <h1 className="text-3xl font-semibold">Home</h1>
    </main>
  );
}
