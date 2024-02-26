import prisma from "../../client";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  if (req.method === "DELETE") {
    try {
      const userId = parseInt(params.userId);

      const deletedUser = await prisma.users.delete({
        where: {
          id: userId,
        },
      });

      return NextResponse.json(
        { message: "User deleted successfully", user: deletedUser },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error deleting user", error: error.message },
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
