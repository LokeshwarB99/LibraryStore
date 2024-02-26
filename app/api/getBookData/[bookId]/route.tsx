// pages/api/getBookData.ts

import prisma from "../../../client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    if (req.method === "GET") {
      const bookId = parseInt(params.bookId);

      // Retrieve the book information
      const book = await prisma.books.findUnique({
        where: { id: bookId },
        include: { bookmarkedBy: true },
      });

      if (!book) {
        return NextResponse.json(
          { message: "Book not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Book data retrieved successfully",
          book: book,
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
      { message: "Error retrieving book data", error: error.message },
      { status: 500 }
    );
  }
}
