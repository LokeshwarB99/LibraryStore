// deleteBook/[bookId]/page.tsx

import prisma from "../../client";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  if (req.method === "DELETE") {
    try {
      const deletedBook = await prisma.books.delete({
        where: {
          id: parseInt(params.bookId),
        },
      });

      return NextResponse.json(
        { message: "Book deleted successfully", book: deletedBook },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error deleting book", error: error.message },
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
