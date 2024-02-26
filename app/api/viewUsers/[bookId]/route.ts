import prisma from "../../../client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    if (req.method === "GET") {
      const user = await prisma.books.findUnique({
        where: { id: parseInt(params.bookId) },
        include: { bookmarkedBy: true },
      });

      if (!user) {
        return NextResponse.json(
          { message: "Book not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          message: "Users retrieved successfully",
          bookmarks: user.bookmarkedBy,
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
