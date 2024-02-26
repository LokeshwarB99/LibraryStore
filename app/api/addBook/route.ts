import prisma from "../client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { name, author, subject, published } = await req.json();
      const newBook = await prisma.books.create({
        data: {
          name: name,
          author: author,
          subject: subject,
          published: published,
        },
      });

      return NextResponse.json(
        { message: "Book created successfully", book: newBook },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error creating book", error: error.message },
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
