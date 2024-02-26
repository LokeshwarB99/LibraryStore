// pages/api/addBookmark.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string; bookId: string } }
) {
  if (req.method === "PUT") {
    try {
      const { userId, bookId } = params;

      const user = await prisma.users.findUnique({
        where: { id: parseInt(userId) },
      });
      const book = await prisma.books.findUnique({
        where: { id: parseInt(bookId) },
      });

      if (!user || !book) {
        return NextResponse.json(
          { message: "User or book not found" },
          { status: 404 }
        );
      }

      await prisma.users.update({
        where: { id: parseInt(userId) },
        data: { bookmarks: { connect: { id: parseInt(bookId) } } },
      });

      return NextResponse.json(
        { message: "Bookmark updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error updating bookmark", error: error },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
