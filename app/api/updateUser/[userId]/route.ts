import prisma from "../../client";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  if (req.method === "PUT") {
    const { name, password } = await req.json();
    try {
      const updatedUser = await prisma.users.update({
        where: {
          id: parseInt(params.userId),
        },
        data: {
          name: name,
          password: password,
        },
      });

      return NextResponse.json(
        { message: "User updated successfully", user: updatedUser },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error updating user", error: error.message },
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
