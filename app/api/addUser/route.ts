// route.tsx content:

import { NextRequest, NextResponse } from "next/server";
import prisma from "../client";

export async function PUT(request: NextRequest) {
  const { name, password } = await request.json();
  try {
    // Check if the username already exists
    const existingUser = await prisma.users.findUnique({
      where: {
        name: name
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists. Please choose a different username." },
        { status: 400 } // Bad request status code
      );
    }

    // If username doesn't exist, create the user
    const newUser = await prisma.users.create({
      data: {
        name: name,
        password: password,
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
