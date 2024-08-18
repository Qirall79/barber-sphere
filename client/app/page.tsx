import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import { TriggerLiveEvent } from "@/components/TriggerLiveEvent";
import { getServerSession } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session?.user.complete) redirect("/config");

  return (
    <main className="flex flex-col items-center justify-between p-24">
      this is homepage
    </main>
  );
}
