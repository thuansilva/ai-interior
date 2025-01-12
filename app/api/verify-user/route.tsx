import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { user } = await req.json();
  // console.log("POST", user);

  try {
    // if (!user?.primaryEmailAddress?.emailAddress) {
    //   throw new Error("Endereço de e-mail não encontrado para o usuário.");
    // }

    const userInfo = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));

    if (userInfo.length === 0) {
      const SaveResult = await db
        .insert(usersTable)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl,
        })
        .returning({ id: usersTable.id });
      return NextResponse.json({ result: SaveResult });
    }
    return NextResponse.json({ result: userInfo });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
