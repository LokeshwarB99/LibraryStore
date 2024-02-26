// viewBookmarks/userId/paage.tsx

import prisma from "../../client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    if (req.method === "GET") {
      const user = await prisma.users.findUnique({
        where: { id: parseInt(params.userId) },
        include: { bookmarks: true },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          message: "Bookmarks retrieved successfully",
          bookmarks: user.bookmarks,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error retrieving bookmarks", error: error.message },
      { status: 500 }
    );
  }
}
