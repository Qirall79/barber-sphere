import { cookies } from "next/headers";

export const apolloServer = async (action: any) => {
    const sessionCookie = cookies().get("session")?.value;
    const query: string = action.loc?.source?.body;
  
    if (!sessionCookie) return null;
    try {
      const res = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies().toString(),
        },
        body: JSON.stringify({
          query,
        }),
        credentials: "include",
        cache: 'force-cache'
      });
      return (await res.json()).data;
    } catch (error) {
      console.log("FETCH ERROR", error);
    }
    return null;
  };