import { cookies } from "next/headers";

export const getServerSession = async (): Promise<ISession | null> => {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) return null;
  try {
    const response = await fetch("http://localhost:3001/auth", {
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
