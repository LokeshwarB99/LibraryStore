// pages/api/getBooks.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../client";

export async function GET(req: NextRequest) {
  try {
    if (req.method === "GET") {
      const users = await prisma.users.findMany();
      return NextResponse.json(users, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error retrieving users" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
