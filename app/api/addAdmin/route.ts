import { NextRequest, NextResponse } from "next/server";
import prisma from "../client";

export async function POST(request: NextRequest) {
  const { name, password } = await request.json();
  try {
    const newUser = await prisma.users.create({
      data: {
        name: name,
        password: password,
        role: 'Admin',
      },
    });
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating User", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
