// updateBook/[bookId]/page.tsx
import prisma from "../../client";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  if (req.method === "PUT") {
    try {
      const { name, author, subject, published } = await req.json();

      const updatedBook = await prisma.books.update({
        where: {
          id: parseInt(params.bookId),
        },
        data: {
          name,
          author,
          subject,
          published,
        },
      });

      return NextResponse.json(
        { message: "Book updated successfully", book: updatedBook },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error updating book", error: error.message },
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
