import { NextRequest, NextResponse } from "next/server";
import prisma from "../../client";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { username, password } = await req.json();

    try {
      const user = await prisma.users.findUnique({
        where: { name: username },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (user.password !== password) {
        return NextResponse.json(
          { error: "Incorrect password" },
          { status: 401 }
        );
      }

      return NextResponse.json({ id: user.id,name:user.name,password:user.password,role:user.role  }, { status: 200 });
    } catch (error) {
      console.error("Error validating user:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
