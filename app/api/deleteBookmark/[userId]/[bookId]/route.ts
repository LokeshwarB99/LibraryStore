import prisma from "../../../client";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string; bookId: string } }
) {
  if (req.method === "DELETE") {
    try {
      const userId = parseInt(params.userId);
      const bookId = parseInt(params.bookId);

      const deletedBookmark = await prisma.users.update({
        where: { id: userId },
        data: {
          bookmarks: { disconnect: { id: bookId } },
        },
      });

      return NextResponse.json(
        { message: "Bookmark deleted successfully", user: deletedBookmark },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error deleting bookmark", error: error.message },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
