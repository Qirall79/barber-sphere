import { cookies } from "next/headers";

export const getServerSession = async (): Promise<ISession | null> => {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) return null;
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error getting Server Session", error);
    return null;
  }
};
