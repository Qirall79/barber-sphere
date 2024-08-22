import { cookies } from "next/headers";

export const apolloServer = async (action: any) => {
  const sessionCookie = cookies().get("session")?.value;
  const query: string = action.loc?.source?.body;

  if (!sessionCookie) return null;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        query,
      }),
      credentials: "include",
      cache: "force-cache",
    });
    return (await res.json()).data;
  } catch (error) {
    console.log("FETCH ERROR", error);
  }
  return null;
};
